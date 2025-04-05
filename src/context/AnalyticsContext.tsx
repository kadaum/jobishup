
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
    try {
      // Initialize with debug mode enabled to see console logs
      ReactGA.initialize(GA_TRACKING_ID, {
        gaOptions: {
          debug_mode: true
        },
        testMode: process.env.NODE_ENV !== 'production'
      });
      console.log("Google Analytics initialized with ID:", GA_TRACKING_ID);
      
      // Track initial pageview
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname
      });
      
      // Send a test event using ReactGA
      ReactGA.event({
        category: "Test",
        action: "Initialize",
        label: "ReactGA Test Event"
      });
      
      // Also send a test event using the global gtag function
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'test_event', {
          'event_category': 'test',
          'event_label': 'initialization'
        });
        console.log("Test event sent directly via gtag");
      }
    } catch (error) {
      console.error("Error initializing Google Analytics:", error);
    }
  }, []);

  // Track page views
  useEffect(() => {
    try {
      // Send pageview with updated location
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname,
        title: document.title
      });
      console.log(`Page view tracked: ${location.pathname}`);
      
      // Also use the global gtag function (belt and suspenders approach)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
          page_path: location.pathname,
          page_title: document.title
        });
        console.log("Pageview also tracked via gtag function");
      }
    } catch (error) {
      console.error("Error tracking pageview:", error);
    }
  }, [location]);

  // Track language changes
  useEffect(() => {
    try {
      ReactGA.event({
        category: "Language",
        action: "Change",
        label: language,
      });
      console.log(`Language change tracked: ${language}`);
      
      // Also track with global gtag function
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'language_change', {
          'language': language
        });
        console.log("Language change also tracked via gtag");
      }
    } catch (error) {
      console.error("Error tracking language change:", error);
    }
  }, [language]);

  // Track authentication state
  useEffect(() => {
    try {
      if (user) {
        // Only track that a user is authenticated, not who they are
        ReactGA.event({
          category: "User",
          action: "Authenticated",
        });
        console.log("User authentication tracked");
        
        // Also track with global gtag function
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'login', {
            'method': 'Supabase'
          });
          console.log("Authentication also tracked via gtag");
        }
      }
    } catch (error) {
      console.error("Error tracking authentication:", error);
    }
  }, [user]);

  // Function to track custom events
  const trackEvent = (category: string, action: string, label?: string, value?: number) => {
    try {
      ReactGA.event({
        category,
        action,
        label,
        value,
      });
      console.log(`Event tracked - Category: ${category}, Action: ${action}, Label: ${label || "none"}`);
      
      // Also track with global gtag function
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action.toLowerCase().replace(/\s+/g, '_'), {
          'event_category': category,
          'event_label': label,
          'value': value
        });
        console.log(`Event also tracked via gtag - Category: ${category}, Action: ${action}`);
      }
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
