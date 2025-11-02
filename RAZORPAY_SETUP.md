# 💳 Razorpay Payment Gateway Setup Guide

## Overview
This guide will help you set up Razorpay payment gateway to accept payments for your MVP service.

## Step 1: Create a Razorpay Account

1. Go to [https://razorpay.com](https://razorpay.com)
2. Click **"Sign Up"** or **"Get Started"**
3. Fill in your business details:
   - Business name: "IdeaBazzar" (or your business name)
   - Email: Your business email
   - Phone: Your business phone number
   - Business type: Select appropriate type
4. Verify your email and phone number

## Step 2: Complete KYC (Know Your Customer)

1. Go to **Settings** → **Account & Settings**
2. Complete your KYC documentation:
   - Business details
   - Bank account details
   - Business documents (GST, PAN, etc.)
3. Wait for verification (usually 1-2 business days)

## Step 3: Get Your API Keys

1. Go to **Settings** → **API Keys**
2. You'll see two keys:
   - **Key ID** (also called `razorpay_key_id`)
   - **Key Secret** (also called `razorpay_key_secret`)
3. **Important**: 
   - **Test Mode**: Use test keys for development
   - **Live Mode**: Use live keys for production
4. Click **"Reveal"** to see your Key Secret
5. **Copy both keys** - you'll need them in the next step

## Step 4: Add API Keys to Railway

1. Go to Railway Dashboard → Your Service → Settings → Variables
2. Add these environment variables:

### Test Mode (for development):
```
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
RAZORPAY_KEY_SECRET=your_test_key_secret
```

### Live Mode (for production):
```
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXX
RAZORPAY_KEY_SECRET=your_live_key_secret
```

**⚠️ Important:**
- Never commit API keys to git
- Use live keys only in production
- Test keys work with test cards/UPI

## Step 5: Test Payment Flow

### Test Cards (for test mode):
- **Success**: `4111 1111 1111 1111`
- **Failure**: `4000 0000 0000 0002`
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### Test UPI IDs:
- `success@razorpay`
- `failure@razorpay`

## Step 6: Configure Webhooks (Optional but Recommended)

1. Go to **Settings** → **Webhooks**
2. Add webhook URL: `https://your-backend.railway.app/api/payments/webhook`
3. Select events:
   - `payment.captured`
   - `payment.failed`
   - `order.paid`
4. Save webhook

## Step 7: Deploy and Test

1. After adding environment variables, Railway will redeploy automatically
2. Test the payment flow:
   - Submit MVP form
   - Click "Pay" button
   - Use test card: `4111 1111 1111 1111`
   - Complete payment
   - Verify payment status in Razorpay dashboard

## Payment Flow

1. **User submits form** → MVP request saved to database
2. **User clicks "Pay"** → Razorpay order created
3. **Payment popup opens** → User enters payment details
4. **Payment processed** → Razorpay handles payment
5. **Payment verified** → Backend verifies signature
6. **MVP request updated** → Payment status marked as "paid"

## Security Best Practices

✅ **DO:**
- Always verify payment signature on backend
- Store key_secret only on backend (never expose to frontend)
- Use HTTPS in production
- Validate amounts before processing

❌ **DON'T:**
- Never expose key_secret to frontend
- Don't trust frontend data - always verify on backend
- Don't skip signature verification

## Payment Methods Supported

Razorpay supports:
- ✅ Credit/Debit Cards
- ✅ UPI (Google Pay, PhonePe, Paytm, etc.)
- ✅ Net Banking
- ✅ Wallets (Paytm, Freecharge, etc.)
- ✅ EMI (for cards)

## Troubleshooting

### Payment Not Processing
- Check if API keys are set correctly
- Verify you're using correct mode (test vs live)
- Check browser console for errors
- Verify Razorpay script is loading

### Signature Verification Failed
- Ensure key_secret is correct
- Check that order_id and payment_id match
- Verify signature generation on backend

### Payment Not Updating in Database
- Check backend logs for errors
- Verify MongoDB connection
- Check payment verification endpoint

## Support

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Support](https://razorpay.com/support/)
- [Razorpay API Reference](https://razorpay.com/docs/api/)

## Pricing

- **Setup Fee**: ₹0
- **Transaction Fee**: 2% per transaction
- **No monthly charges**

## Next Steps

1. Complete KYC
2. Add API keys to Railway
3. Test payment flow
4. Switch to live mode when ready
5. Monitor payments in Razorpay dashboard

