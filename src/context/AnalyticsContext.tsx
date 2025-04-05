
import { createContext, useContext, useEffect, ReactNode } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import { useAuth } from "./AuthContext";

interface AnalyticsContextProps {
  trackEvent: (category: string, action: string, label?: string, value?: number) => void;
}

const AnalyticsContext = createContext<AnalyticsContextProps>({
  trackEvent: () => {},
});

export const useAnalytics = () => useContext(AnalyticsContext);

// Google Analytics tracking ID - Using the provided GA4 measurement ID
const GA_TRACKING_ID = "G-DTTEFJG2LR";

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const location = useLocation();
  const { language } = useLanguage();
  const { user } = useAuth();
  
  // Initialize Google Analytics
  useEffect(() => {
    // Initialize with debug mode enabled to see console logs
    ReactGA.initialize(GA_TRACKING_ID, {
      gaOptions: {
        debug_mode: true
      }
    });
    console.log("Google Analytics initialized with ID:", GA_TRACKING_ID);
    
    // Track initial pageview
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname
    });
  }, []);

  // Track page views
  useEffect(() => {
    // Send pageview with updated location
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
      title: document.title
    });
    console.log(`Page view tracked: ${location.pathname}`);
    
    // Also use the global gtag function (belt and suspenders approach)
    if (window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: location.pathname,
        page_title: document.title
      });
    }
  }, [location]);

  // Track language changes
  useEffect(() => {
    ReactGA.event({
      category: "Language",
      action: "Change",
      label: language,
    });
    console.log(`Language change tracked: ${language}`);
    
    // Also track with global gtag function
    if (window.gtag) {
      window.gtag('event', 'language_change', {
        'language': language
      });
    }
  }, [language]);

  // Track authentication state
  useEffect(() => {
    if (user) {
      // Only track that a user is authenticated, not who they are
      ReactGA.event({
        category: "User",
        action: "Authenticated",
      });
      console.log("User authentication tracked");
      
      // Also track with global gtag function
      if (window.gtag) {
        window.gtag('event', 'login', {
          'method': 'Supabase'
        });
      }
    }
  }, [user]);

  // Function to track custom events
  const trackEvent = (category: string, action: string, label?: string, value?: number) => {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
    console.log(`Event tracked - Category: ${category}, Action: ${action}, Label: ${label || "none"}`);
    
    // Also track with global gtag function
    if (window.gtag) {
      window.gtag('event', action.toLowerCase().replace(/\s+/g, '_'), {
        'event_category': category,
        'event_label': label,
        'value': value
      });
    }
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
