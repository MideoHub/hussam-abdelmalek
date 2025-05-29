
// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = 'GA_MEASUREMENT_ID'; // Replace with actual Google Analytics ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID);
  }
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track poem interactions
export const trackPoemView = (poemTitle: string) => {
  trackEvent('view', 'poem', poemTitle);
};

export const trackPoemAudio = (poemTitle: string, action: 'play' | 'pause') => {
  trackEvent(action, 'poem_audio', poemTitle);
};

// Track book downloads
export const trackBookDownload = (bookTitle: string) => {
  trackEvent('download', 'book', bookTitle);
};

// Track daily poem engagement
export const trackDailyPoemView = (poemTitle: string) => {
  trackEvent('view', 'daily_poem', poemTitle);
};

export const trackDailyPoemShare = (poemTitle: string, platform: string) => {
  trackEvent('share', 'daily_poem', `${poemTitle}_${platform}`);
};
