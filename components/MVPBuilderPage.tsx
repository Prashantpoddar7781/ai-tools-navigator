import React, { useState } from 'react';
import { Calendar, Zap, Rocket, Check, MessageSquare, Clock, Shield, Star } from 'lucide-react';
import { CALENDLY_LINK } from '../constants';

const MVPBuilderPage: React.FC = () => {
  const isCalendlyLinkSet = CALENDLY_LINK !== "https://calendly.com/your-link";
  const [selectedOption, setSelectedOption] = useState<'meeting' | 'description'>('meeting');

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
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 max-w-4xl mx-auto mb-8">
          <h3 className="text-xl font-semibold text-center mb-4">What You Can Create</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <h4 className="font-semibold text-cyan-400 mb-2">Websites & Apps</h4>
              <p className="text-slate-400">E-commerce sites, SaaS platforms, mobile apps, landing pages</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-cyan-400 mb-2">Marketing Campaigns</h4>
              <p className="text-slate-400">Social media content, email campaigns, ad creatives, brand materials</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-cyan-400 mb-2">Videos & Content</h4>
              <p className="text-slate-400">Promotional videos, tutorials, presentations, animated content</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-900 to-cyan-900 p-6 rounded-lg border border-cyan-500 max-w-2xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Transparent Pricing</h3>
            <p className="text-slate-300 mb-2">Service starts at <span className="text-white font-bold">₹99</span> and maximum price is <span className="text-white font-bold">₹499</span></p>
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
            onClick={() => setSelectedOption('meeting')}
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
            onClick={() => setSelectedOption('description')}
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
          <div>
            <a
              href={isCalendlyLinkSet ? CALENDLY_LINK : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block text-xl font-bold py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${isCalendlyLinkSet ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-cyan-500/50' : 'bg-slate-600 opacity-50 cursor-not-allowed'}`}
            >
              {isCalendlyLinkSet ? "Schedule Your 15-Minute Meeting" : "Booking Link Not Configured"}
            </a>
            <p className="text-slate-400 text-sm mt-3">Book a quick call to discuss your requirements in detail.</p>
          </div>
        ) : (
          <div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 max-w-2xl mx-auto mb-6">
              <h3 className="text-xl font-semibold mb-4">Describe Your Requirements</h3>
              <textarea
                placeholder="Tell us about your project in detail. What do you want to build? What features should it have? What's your target audience? Be as specific as possible..."
                className="w-full h-32 p-4 bg-slate-900 border border-slate-600 rounded-md text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
              />
              <button className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                Submit Your Requirements
              </button>
            </div>
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