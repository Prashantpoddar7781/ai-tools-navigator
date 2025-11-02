import { apiService } from './apiService';

// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  key: string;
}

export interface PaymentSuccessData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  mvpRequestId?: string;
}

class PaymentService {
  // Create Razorpay order
  async createOrder(amount: number, mvpRequestId?: string): Promise<RazorpayOrderResponse> {
    try {
      const response = await apiService.createRazorpayOrder({
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        mvpRequestId,
      });

      return {
        orderId: response.id,
        amount: response.amount,
        currency: response.currency,
        key: response.key,
      };
    } catch (error) {
      console.error('Failed to create Razorpay order:', error);
      throw error;
    }
  }

  // Initialize Razorpay checkout
  async initializePayment(orderData: RazorpayOrderResponse, options: {
    name: string;
    email: string;
    phone?: string;
    description: string;
    onSuccess: (paymentData: PaymentSuccessData) => void;
    onFailure: (error: any) => void;
  }) {
    if (!window.Razorpay) {
      throw new Error('Razorpay SDK not loaded');
    }

    const razorpayOptions = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'IdeaBazzar',
      description: options.description,
      order_id: orderData.orderId,
      handler: async (response: any) => {
        try {
          const paymentData: PaymentSuccessData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          // Verify payment on backend
          await this.verifyPayment(paymentData);
          options.onSuccess(paymentData);
        } catch (error) {
          options.onFailure(error);
        }
      },
      prefill: {
        name: options.name,
        email: options.email,
        contact: options.phone || '',
      },
      theme: {
        color: '#06b6d4', // cyan-500
      },
      modal: {
        ondismiss: () => {
          console.log('Payment cancelled');
        },
      },
    };

    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  }

  // Verify payment on backend
  async verifyPayment(paymentData: PaymentSuccessData): Promise<void> {
    try {
      await apiService.verifyRazorpayPayment(paymentData);
    } catch (error) {
      console.error('Payment verification failed:', error);
      throw error;
    }
  }

  // Calculate price from budget range
  calculatePrice(budget: string): number {
    // Budget format: "₹9-₹99" or "₹100-₹199"
    const match = budget.match(/₹(\d+)-₹(\d+)/);
    if (match) {
      const min = parseInt(match[1]);
      const max = parseInt(match[2]);
      // Return average price
      return Math.floor((min + max) / 2);
    }
    
    // Fallback to minimum price
    return 9;
  }
}

export const paymentService = new PaymentService();

