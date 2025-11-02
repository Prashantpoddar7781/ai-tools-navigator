const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const MvpRequest = require('../models/MvpRequest');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', mvpRequestId } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({
        message: 'Invalid amount',
      });
    }

    console.log('💳 Creating Razorpay order:', { amount, currency, mvpRequestId });

    // Create order in Razorpay
    const options = {
      amount: amount, // amount in paise
      currency: currency,
      receipt: `order_${Date.now()}_${mvpRequestId || 'new'}`,
      notes: {
        mvpRequestId: mvpRequestId || null,
      },
    };

    const order = await razorpay.orders.create(options);

    console.log('✅ Razorpay order created:', order.id);

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID, // Send key_id to frontend
      receipt: order.receipt,
    });
  } catch (error) {
    console.error('❌ Failed to create Razorpay order:', error);
    res.status(500).json({
      message: 'Failed to create payment order',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// Verify payment
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, mvpRequestId } = req.body;

    console.log('🔍 Verifying payment:', {
      razorpay_order_id,
      razorpay_payment_id,
      mvpRequestId,
    });

    // Create signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    // Verify signature
    if (generatedSignature !== razorpay_signature) {
      console.error('❌ Payment signature verification failed');
      return res.status(400).json({
        message: 'Payment verification failed - invalid signature',
      });
    }

    console.log('✅ Payment signature verified');

    // Fetch payment details to get amount
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    
    // Update MVP request with payment status if mvpRequestId is provided
    if (mvpRequestId) {
      const mvpRequest = await MvpRequest.findById(mvpRequestId);
      if (mvpRequest) {
        mvpRequest.paymentStatus = 'paid';
        mvpRequest.paymentId = razorpay_payment_id;
        mvpRequest.paymentDate = new Date();
        mvpRequest.amountPaid = payment.amount / 100; // Convert from paise to rupees
        await mvpRequest.save();
        console.log('✅ MVP request updated with payment status');
      }
    }

    res.json({
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
      status: 'success',
    });
  } catch (error) {
    console.error('❌ Payment verification failed:', error);
    res.status(500).json({
      message: 'Payment verification failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// Get payment status
router.get('/status/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await razorpay.payments.fetch(paymentId);

    res.json({
      paymentId: payment.id,
      status: payment.status,
      amount: payment.amount / 100, // Convert from paise to rupees
      currency: payment.currency,
      method: payment.method,
      createdAt: new Date(payment.created_at * 1000),
    });
  } catch (error) {
    console.error('❌ Failed to fetch payment status:', error);
    res.status(500).json({
      message: 'Failed to fetch payment status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

module.exports = router;

