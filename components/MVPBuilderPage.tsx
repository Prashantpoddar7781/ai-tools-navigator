import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Zap, Rocket, Check, MessageSquare, Clock, Shield, Star, CreditCard, Loader2 } from 'lucide-react';
import { CALENDLY_LINK } from '../constants';
import { apiService, type MvpRequestData } from '../services/apiService';
import { analytics } from '../services/analytics';
import { paymentService } from '../services/paymentService';
import { calculatePrice } from '../services/geminiService';

const MVPBuilderPage: React.FC = () => {
  const isCalendlyLinkSet = CALENDLY_LINK !== "https://calendly.com/your-link";
  const [selectedOption, setSelectedOption] = useState<'meeting' | 'description'>('meeting');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [savedRequestId, setSavedRequestId] = useState<string | null>(null);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);
  const priceCalculationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const priceCalculationAbortControllerRef = useRef<AbortController | null>(null);
  const priceCacheRef = useRef<Map<string, number>>(new Map());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDescription: '',
    targetAudience: '',
    uniqueSellingPoints: '',
    features: '',
    timeline: 'flexible'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate price when project description changes
    if (name === 'projectDescription') {
      // Cancel previous calculation
      if (priceCalculationTimeoutRef.current) {
        clearTimeout(priceCalculationTimeoutRef.current);
      }
      if (priceCalculationAbortControllerRef.current) {
        priceCalculationAbortControllerRef.current.abort();
      }

      const trimmedValue = value.trim();
      
      // Set loading state for short descriptions
      if (trimmedValue.length < 10) {
        setCalculatedPrice(9); // Minimum price
        setIsCalculatingPrice(false);
        return;
      }

      // Check cache first
      const cacheKey = trimmedValue.toLowerCase();
      if (priceCacheRef.current.has(cacheKey)) {
        const cachedPrice = priceCacheRef.current.get(cacheKey)!;
        setCalculatedPrice(cachedPrice);
        setIsCalculatingPrice(false);
        return;
      }

      // Debounce price calculation (wait 1.5 seconds after user stops typing)
      setIsCalculatingPrice(true);
      priceCalculationTimeoutRef.current = setTimeout(async () => {
        // Create new AbortController for this request
        const abortController = new AbortController();
        priceCalculationAbortControllerRef.current = abortController;

        try {
          const price = await calculatePrice(trimmedValue);
          
          // Only update if request wasn't cancelled
          if (!abortController.signal.aborted) {
            // Cache the result
            priceCacheRef.current.set(cacheKey, price);
            setCalculatedPrice(price);
          }
        } catch (error: any) {
          // Only update if request wasn't cancelled and it's not an abort error
          if (!abortController.signal.aborted && error?.name !== 'AbortError') {
            console.error('Error calculating price:', error);
            // Don't set fallback price - keep previous value
          }
        } finally {
          if (!abortController.signal.aborted) {
            setIsCalculatingPrice(false);
          }
        }
      }, 1500);
    }
  };

  // Load Calendly widget script
  useEffect(() => {
    if (isCalendlyLinkSet && selectedOption === 'meeting') {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Cleanup script when component unmounts
        const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      };
    }
  }, [isCalendlyLinkSet, selectedOption]);

  // Cleanup timeout and abort controller on unmount
  useEffect(() => {
    return () => {
      if (priceCalculationTimeoutRef.current) {
        clearTimeout(priceCalculationTimeoutRef.current);
      }
      if (priceCalculationAbortControllerRef.current) {
        priceCalculationAbortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const mvpRequestData: MvpRequestData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: 'other', // You can add a project type selector
        projectDescription: formData.projectDescription,
        targetAudience: formData.targetAudience,
        uniqueSellingPoints: formData.uniqueSellingPoints,
        features: formData.features ? formData.features.split(',').map(f => f.trim()) : [],
        budget: calculatedPrice ? `₹${calculatedPrice}` : '₹9',
        timeline: formData.timeline,
        communicationMethod: selectedOption
      };

      const response = await apiService.submitMvpRequest(mvpRequestData);
      setSubmitStatus('success');
      setSavedRequestId(response.requestId);
      
      // Track analytics
      analytics.trackMvpSubmission('description', {
        budget: calculatedPrice ? `₹${calculatedPrice}` : '₹9',
        timeline: formData.timeline,
      });
      
      // Don't reset form yet - wait for payment

    } catch (error) {
      console.error('Failed to submit MVP request:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = async () => {
    if (!savedRequestId) {
      setPaymentStatus('error');
      return;
    }

    setIsProcessingPayment(true);
    setPaymentStatus('idle');

    try {
      // Use calculated price
      const amount = calculatedPrice || 9;
      
      // Create Razorpay order
      const orderData = await paymentService.createOrder(amount, savedRequestId);
      
      // Initialize payment
      await paymentService.initializePayment(orderData, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        description: `MVP Service - ${formData.projectDescription.substring(0, 50)}...`,
        onSuccess: async (paymentData) => {
          setPaymentStatus('success');
          setIsProcessingPayment(false);
          
          // Reset form after successful payment
          setFormData({
            name: '',
            email: '',
            phone: '',
            projectDescription: '',
            targetAudience: '',
            uniqueSellingPoints: '',
            features: '',
            timeline: 'flexible'
          });
          setCalculatedPrice(null);
          setSavedRequestId(null);
          
          // Track payment success
          analytics.trackEvent('payment_success', {
            amount: amount,
            payment_id: paymentData.razorpay_payment_id,
          });
        },
        onFailure: (error) => {
          console.error('Payment failed:', error);
          setPaymentStatus('error');
          setIsProcessingPayment(false);
          
          // Track payment failure
          analytics.trackError('Payment failed', 'MVPBuilderPage');
        },
      });
    } catch (error) {
      console.error('Payment initialization failed:', error);
      setPaymentStatus('error');
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="text-white max-w-5xl mx-auto py-12 px-4">
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
          Get Your End Product Directly
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto mb-8">
          No need to juggle between multiple AIs. Tell us what you want, and we'll deliver your complete, functional product. 
          <span className="text-cyan-400 font-semibold"> 100% Money Back Guarantee</span> if you don't like the end result - no questions asked.
        </p>
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 max-w-6xl mx-auto mb-8">
          <h3 className="text-xl font-semibold text-center mb-6">What You Can Create</h3>
          <p className="text-center text-slate-300 mb-6 font-medium">Create anything you can think of or do any task you need - from simple websites to complex applications!</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <h4 className="font-semibold text-cyan-400 mb-2">Websites & Apps</h4>
              <p className="text-slate-400">E-commerce sites, SaaS platforms, mobile apps, landing pages, portfolios</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-cyan-400 mb-2">Marketing Campaigns</h4>
              <p className="text-slate-400">Social media content, email campaigns, ad creatives, brand materials</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-cyan-400 mb-2">Videos & Content</h4>
              <p className="text-slate-400">Promotional videos, tutorials, presentations, animated content</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-cyan-400 mb-2">Business Tools</h4>
              <p className="text-slate-400">CRM systems, project management tools, analytics dashboards, automation scripts</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-cyan-400 mb-2">E-commerce Solutions</h4>
              <p className="text-slate-400">Online stores, payment systems, inventory management, customer portals</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-cyan-400 mb-2">Educational Content</h4>
              <p className="text-slate-400">Online courses, interactive tutorials, learning management systems</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-cyan-400 mb-2">Data & Analytics</h4>
              <p className="text-slate-400">Data visualization tools, reporting dashboards, business intelligence platforms</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-cyan-400 mb-2">Creative Projects</h4>
              <p className="text-slate-400">Portfolio websites, art galleries, creative showcases, design systems</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-cyan-400 mb-2">Community Platforms</h4>
              <p className="text-slate-400">Forums, social networks, chat applications, community hubs</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-slate-300 font-semibold">And much more! If you can imagine it, we can build it.</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-900 to-cyan-900 p-6 rounded-lg border border-cyan-500 max-w-2xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Transparent Pricing</h3>
            <p className="text-slate-300 mb-2">Service starts at <span className="text-white font-bold">₹9</span> and maximum price is <span className="text-white font-bold">₹499</span></p>
            <p className="text-slate-400 text-sm">Even for full-stack web development, you'll never pay more than ₹499</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-900 to-emerald-900 p-6 rounded-lg border border-green-500 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="text-green-400" size={24} />
            <span className="text-green-400 font-bold text-lg">100% Money Back Guarantee</span>
          </div>
          <p className="text-green-300">If you don't like the end result, we'll refund you completely - no questions asked.</p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Choose How You Want to Proceed</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div 
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
              selectedOption === 'meeting' 
                ? 'border-cyan-500 bg-cyan-900/20' 
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
            }`}
            onClick={() => {
              setSelectedOption('meeting');
              analytics.trackButtonClick('Schedule Meeting Option', 'MVP Page');
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-8 w-8 text-cyan-400" />
              <h3 className="text-xl font-semibold">Option 1: Schedule a 15-minute Meeting</h3>
            </div>
            <p className="text-slate-400 mb-4">Book a quick call to explain your requirements in detail. Perfect for complex projects or when you want to discuss your vision directly.</p>
            <div className="flex items-center gap-2 text-cyan-400">
              <Clock size={16} />
              <span className="text-sm font-medium">15 minutes</span>
            </div>
          </div>
          
          <div 
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
              selectedOption === 'description' 
                ? 'border-cyan-500 bg-cyan-900/20' 
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
            }`}
            onClick={() => {
              setSelectedOption('description');
              analytics.trackButtonClick('Describe Requirements Option', 'MVP Page');
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="h-8 w-8 text-cyan-400" />
              <h3 className="text-xl font-semibold">Option 2: Describe What You Want</h3>
            </div>
            <p className="text-slate-400 mb-4">Simply describe your requirements in detail through our form. Great for straightforward projects or when you prefer written communication.</p>
            <div className="flex items-center gap-2 text-cyan-400">
              <MessageSquare size={16} />
              <span className="text-sm font-medium">Written description</span>
          </div>
          </div>
        </div>
      </section>

      <section className="mb-16 bg-slate-800/50 p-8 rounded-lg border border-slate-700">
        <h2 className="text-3xl font-bold text-center mb-8">What You'll Receive</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Check className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
            <div>
                <h4 className="font-semibold">Complete, Functional Product</h4>
                <p className="text-slate-400 text-sm">A fully deployed, live application ready to use and share.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Professional UI/UX Design</h4>
                <p className="text-slate-400 text-sm">Modern, user-friendly interface that looks professional.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
            <div>
                <h4 className="font-semibold">All Core Features Implemented</h4>
                <p className="text-slate-400 text-sm">Every feature you requested, working perfectly.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Check className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
            <div>
                <h4 className="font-semibold">Full Source Code Ownership</h4>
                <p className="text-slate-400 text-sm">Complete codebase delivered to you for future development.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">100% Money Back Guarantee</h4>
                <p className="text-slate-400 text-sm">If you don't like the result, full refund - no questions asked.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
            <div>
                <h4 className="font-semibold">Fast Delivery</h4>
                <p className="text-slate-400 text-sm">Your product delivered in 5 days or less.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center">
        {selectedOption === 'meeting' ? (
          <div className="w-full max-w-4xl mx-auto">
            {isCalendlyLinkSet ? (
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <div 
                  className="calendly-inline-widget" 
                  data-url={CALENDLY_LINK}
                  style={{ minWidth: '320px', height: '700px', borderRadius: '8px' }}
                />
              </div>
            ) : (
              <div className="bg-slate-800/50 p-8 rounded-lg border border-slate-700">
                <Calendar className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Schedule Your 15-Minute Meeting</h3>
                <p className="text-slate-400 mb-6">Click the button below to book a quick call and discuss your requirements directly.</p>
                <a
                  href={CALENDLY_LINK}
          target="_blank"
          rel="noopener noreferrer"
                  onClick={() => analytics.trackMeetingBooking()}
                  className="inline-block text-xl font-bold py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-cyan-500/50"
                >
                  Open Calendar Booking
                </a>
                <p className="text-slate-500 text-sm mt-4">The meeting will be conducted via Google Meet</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 max-w-2xl mx-auto mb-6">
              <h3 className="text-xl font-semibold mb-4">Describe Your Requirements</h3>
              
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mb-4 p-4 bg-green-900/50 border border-green-500 rounded-lg">
                  <p className="text-green-400 font-semibold">✅ Request submitted successfully!</p>
                  <p className="text-green-300 text-sm mb-4">Complete your payment to start the project.</p>
                  
                  {/* Payment Button */}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={handlePayment}
                      disabled={isProcessingPayment || paymentStatus === 'success'}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <CreditCard size={20} />
                      {isProcessingPayment 
                        ? 'Processing Payment...' 
                        : paymentStatus === 'success'
                        ? '✅ Payment Successful!'
                        : `Pay ₹${calculatedPrice || 9}`}
                    </button>
                    <p className="text-green-300 text-xs mt-2 text-center">
                      Secure payment via Razorpay • UPI, Cards, Wallets accepted
                    </p>
                  </div>

                  {/* Payment Status Messages */}
                  {paymentStatus === 'success' && (
                    <div className="mt-4 p-3 bg-emerald-900/50 border border-emerald-500 rounded-lg">
                      <p className="text-emerald-400 font-semibold">🎉 Payment Successful!</p>
                      <p className="text-emerald-300 text-sm">Your project has been confirmed. We'll get started right away!</p>
                    </div>
                  )}

                  {paymentStatus === 'error' && (
                    <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-lg">
                      <p className="text-red-400 font-semibold">❌ Payment Failed</p>
                      <p className="text-red-300 text-sm">Please try again. If the issue persists, contact us.</p>
                    </div>
                  )}
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-4 p-4 bg-red-900/50 border border-red-500 rounded-lg">
                  <p className="text-red-400 font-semibold">❌ Failed to submit request</p>
                  <p className="text-red-300 text-sm">Please try again or contact us directly.</p>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-slate-900 border border-slate-600 rounded-md text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-slate-900 border border-slate-600 rounded-md text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-900 border border-slate-600 rounded-md text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
                
                <div>
                  <textarea
                    name="projectDescription"
                    placeholder="Project Description * - Tell us about your project in detail. What do you want to build? What features should it have? Be as specific as possible..."
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-3 bg-slate-900 border border-slate-600 rounded-md text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                  />
                  {/* Dynamic Price Display */}
                  {formData.projectDescription.trim().length > 0 && (
                    <div className="mt-2 p-3 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">💰</span>
                          <div>
                            <p className="text-green-400 text-sm font-medium">Estimated Price:</p>
                            {isCalculatingPrice ? (
                              <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin text-green-400" />
                                <span className="text-white font-bold">Calculating...</span>
                              </div>
                            ) : (
                              <p className="text-white font-bold text-lg">₹{calculatedPrice || 9}</p>
                            )}
                          </div>
                        </div>
                        <p className="text-green-300 text-xs italic">
                          Price calculated based on your project description
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <textarea
                  name="targetAudience"
                  placeholder="Target Audience (Optional) - Who are you trying to reach? What are their pain points and desires?"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-3 bg-slate-900 border border-slate-600 rounded-md text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                />
                
                <textarea
                  name="uniqueSellingPoints"
                  placeholder="Unique Selling Points (Optional) - What makes your product/service unique?"
                  value={formData.uniqueSellingPoints}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-3 bg-slate-900 border border-slate-600 rounded-md text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                />
                
                <input
                  type="text"
                  name="features"
                  placeholder="Key Features (Optional) - List features separated by commas"
                  value={formData.features}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-900 border border-slate-600 rounded-md text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
                
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-900 border border-slate-600 rounded-md text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="ASAP">ASAP</option>
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Your Requirements'}
              </button>
            </form>
            <p className="text-slate-400 text-sm">We'll review your requirements and get back to you within 24 hours.</p>
          </div>
        )}
        {!isCalendlyLinkSet && selectedOption === 'meeting' && (
          <p className="text-slate-500 text-xs mt-2">The Calendly link has not been set up yet.</p>
        )}
      </section>
    </div>
  );
};

export default MVPBuilderPage;