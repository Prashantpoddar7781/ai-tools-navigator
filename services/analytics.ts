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
    if (!this.trackingId || this.isInitialized) {
      return;
    }

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
    document.head.appendChild(script);

    // Initialize GA
    window.gtag('js', new Date());
    window.gtag('config', this.trackingId, {
      page_path: window.location.pathname,
    });

    this.isInitialized = true;
    console.log('✅ Analytics initialized');
  }

  // Track page views
  trackPageView(path: string, title?: string) {
    if (!this.trackingId) return;

    window.gtag('config', this.trackingId, {
      page_path: path,
      page_title: title || document.title,
    });
  }

  // Track MVP form submission
  trackMvpSubmission(method: 'meeting' | 'description', data?: {
    budget?: string;
    timeline?: string;
  }) {
    if (!this.trackingId) return;

    window.gtag('event', 'mvp_form_submission', {
      event_category: 'MVP',
      event_label: method,
      method: method,
      budget: data?.budget || 'unknown',
      timeline: data?.timeline || 'unknown',
    });
  }

  // Track AI Tool Suggester usage
  trackAiSuggester(task: string) {
    if (!this.trackingId) return;

    window.gtag('event', 'ai_suggester_used', {
      event_category: 'AI Tools',
      event_label: task.substring(0, 50), // Limit length
      task_length: task.length,
    });
  }

  // Track meeting booking
  trackMeetingBooking() {
    if (!this.trackingId) return;

    window.gtag('event', 'meeting_booked', {
      event_category: 'Booking',
      event_label: 'Calendly',
    });
  }

  // Track category/tool clicks
  trackToolClick(toolName: string, category: string) {
    if (!this.trackingId) return;

    window.gtag('event', 'tool_clicked', {
      event_category: 'AI Tools',
      event_label: toolName,
      tool_category: category,
    });
  }

  // Track search
  trackSearch(query: string) {
    if (!this.trackingId) return;

    window.gtag('event', 'search', {
      event_category: 'Search',
      search_term: query.substring(0, 50),
    });
  }

  // Track custom events
  trackEvent(eventName: string, params?: Record<string, any>) {
    if (!this.trackingId) return;

    window.gtag('event', eventName, params);
  }

  // Track button clicks
  trackButtonClick(buttonName: string, location?: string) {
    if (!this.trackingId) return;

    window.gtag('event', 'button_click', {
      event_category: 'Interaction',
      event_label: buttonName,
      button_location: location || 'unknown',
    });
  }

  // Track errors
  trackError(errorMessage: string, errorLocation?: string) {
    if (!this.trackingId) return;

    window.gtag('event', 'exception', {
      description: errorMessage,
      fatal: false,
      error_location: errorLocation,
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

