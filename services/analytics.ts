// Google Analytics 4 Service
// Initialize and track user events

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: {
        page_path?: string;
        page_title?: string;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}

class AnalyticsService {
  private trackingId: string | null = null;
  private isInitialized: boolean = false;

  constructor() {
    // Get GA tracking ID from environment variable
    this.trackingId = import.meta.env.VITE_GA_TRACKING_ID || null;
  }

  // Initialize Google Analytics
  initialize() {
    // Debug: Check if tracking ID is available
    console.log('🔍 Analytics init - Tracking ID:', this.trackingId ? 'Set' : 'NOT SET');
    
    if (!this.trackingId) {
      console.warn('⚠️ Google Analytics Tracking ID not found. Set VITE_GA_TRACKING_ID environment variable.');
      return;
    }

    if (this.isInitialized) {
      console.log('✅ Analytics already initialized');
      return;
    }

    try {
      // Create dataLayer
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag as any;

      // Load GA script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackingId}`;
      script.onload = () => {
        console.log('✅ Google Analytics script loaded');
      };
      script.onerror = () => {
        console.error('❌ Failed to load Google Analytics script');
      };
      document.head.appendChild(script);

      // Wait a bit for script to load, then initialize
      setTimeout(() => {
        // Initialize GA
        window.gtag('js', new Date());
        window.gtag('config', this.trackingId!, {
          page_path: window.location.pathname,
          send_page_view: true,
        });

        this.isInitialized = true;
        console.log('✅ Analytics initialized with ID:', this.trackingId);
      }, 100);
    } catch (error) {
      console.error('❌ Analytics initialization failed:', error);
    }
  }

  // Wait for gtag to be available
  private waitForGtag(callback: () => void, maxAttempts = 10) {
    if (window.gtag && this.isInitialized) {
      callback();
      return;
    }

    if (maxAttempts > 0) {
      setTimeout(() => this.waitForGtag(callback, maxAttempts - 1), 100);
    } else {
      console.warn('⚠️ gtag not available after waiting');
    }
  }

  // Track page views
  trackPageView(path: string, title?: string) {
    if (!this.trackingId) {
      console.warn('⚠️ Cannot track page view - Tracking ID not set');
      return;
    }

    this.waitForGtag(() => {
      window.gtag('config', this.trackingId!, {
        page_path: path,
        page_title: title || document.title,
      });
      console.log('📊 Page view tracked:', path);
    });
  }

  // Track MVP form submission
  trackMvpSubmission(method: 'meeting' | 'description', data?: {
    budget?: string;
    timeline?: string;
  }) {
    if (!this.trackingId) return;

    this.waitForGtag(() => {
      window.gtag('event', 'mvp_form_submission', {
        event_category: 'MVP',
        event_label: method,
        method: method,
        budget: data?.budget || 'unknown',
        timeline: data?.timeline || 'unknown',
      });
      console.log('📊 MVP submission tracked:', method);
    });
  }

  // Track AI Tool Suggester usage
  trackAiSuggester(task: string) {
    if (!this.trackingId) return;

    this.waitForGtag(() => {
      window.gtag('event', 'ai_suggester_used', {
        event_category: 'AI Tools',
        event_label: task.substring(0, 50), // Limit length
        task_length: task.length,
      });
      console.log('📊 AI suggester tracked:', task.substring(0, 30));
    });
  }

  // Track meeting booking
  trackMeetingBooking() {
    if (!this.trackingId) return;

    this.waitForGtag(() => {
      window.gtag('event', 'meeting_booked', {
        event_category: 'Booking',
        event_label: 'Calendly',
      });
      console.log('📊 Meeting booking tracked');
    });
  }

  // Track category/tool clicks
  trackToolClick(toolName: string, category: string) {
    if (!this.trackingId) return;

    this.waitForGtag(() => {
      window.gtag('event', 'tool_clicked', {
        event_category: 'AI Tools',
        event_label: toolName,
        tool_category: category,
      });
    });
  }

  // Track search
  trackSearch(query: string) {
    if (!this.trackingId) return;

    this.waitForGtag(() => {
      window.gtag('event', 'search', {
        event_category: 'Search',
        search_term: query.substring(0, 50),
      });
    });
  }

  // Track custom events
  trackEvent(eventName: string, params?: Record<string, any>) {
    if (!this.trackingId) return;

    this.waitForGtag(() => {
      window.gtag('event', eventName, params);
    });
  }

  // Track button clicks
  trackButtonClick(buttonName: string, location?: string) {
    if (!this.trackingId) return;

    this.waitForGtag(() => {
      window.gtag('event', 'button_click', {
        event_category: 'Interaction',
        event_label: buttonName,
        button_location: location || 'unknown',
      });
    });
  }

  // Track errors
  trackError(errorMessage: string, errorLocation?: string) {
    if (!this.trackingId) return;

    this.waitForGtag(() => {
      window.gtag('event', 'exception', {
        description: errorMessage,
        fatal: false,
        error_location: errorLocation,
      });
    });
  }
}

// Export singleton instance
export const analytics = new AnalyticsService();

// Auto-initialize when module loads
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      analytics.initialize();
    });
  } else {
    analytics.initialize();
  }
}

