import React from 'react';
import { Calendar, Zap, Rocket, Check } from 'lucide-react';
import { CALENDLY_LINK } from '../constants';

const MVPBuilderPage: React.FC = () => {
  const isCalendlyLinkSet = CALENDLY_LINK !== "https://calendly.com/your-link";

  return (
    <div className="text-white max-w-4xl mx-auto py-12 px-4">
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
          Idea to MVP in 5 Days. For Free.
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
          Have a brilliant idea but struggling to create the website or app? We'll do it for you. Just explain your vision in a 15-minute online meeting and get your Minimum Viable Product (MVP) delivered for free in just 5 days.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Your Idea, Made Simple</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <Calendar className="mx-auto h-12 w-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">1. Share Your Vision</h3>
            <p className="text-slate-400">Schedule a free, no-obligation 15-minute chat. Tell us about your idea—we'll handle the technical questions.</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <Zap className="mx-auto h-12 w-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">2. We Handle Everything</h3>
            <p className="text-slate-400">Our expert team takes over. We manage the design, coding, and deployment. You can relax while we bring your idea to life.</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <Rocket className="mx-auto h-12 w-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">3. Launch Your MVP</h3>
            <p className="text-slate-400">You'll receive a link to your live, functional web application, ready to share with users and investors.</p>
          </div>
        </div>
      </section>

      <section className="mb-16 bg-slate-800/50 p-8 rounded-lg border border-slate-700">
        <h2 className="text-3xl font-bold text-center mb-8">What You'll Receive</h2>
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-start gap-3">
            <Check className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">A Functional Web Application</h4>
              <p className="text-slate-400 text-sm">A deployed, live URL you can share with anyone.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Core Feature Implementation</h4>
              <p className="text-slate-400 text-sm">The one or two key features that define your product.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Simple, Clean UI/UX</h4>
              <p className="text-slate-400 text-sm">A user-friendly interface to demonstrate your concept.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Full Ownership of Code</h4>
              <p className="text-slate-400 text-sm">You receive the complete source code to build upon.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <a
          href={isCalendlyLinkSet ? CALENDLY_LINK : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block text-xl font-bold py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${isCalendlyLinkSet ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-cyan-500/50' : 'bg-slate-600 opacity-50 cursor-not-allowed'}`}
        >
          {isCalendlyLinkSet ? "Claim Your Free MVP Slot" : "Booking Link Not Configured"}
        </a>
        <p className="text-slate-400 text-sm mt-3">This is a limited-time offer. Slots are filled on a first-come, first-served basis.</p>
        {!isCalendlyLinkSet && <p className="text-slate-500 text-xs mt-2">The Calendly link has not been set up yet.</p>}
      </section>
    </div>
  );
};

export default MVPBuilderPage;