
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

// Google Analytics tracking ID - Replace with your GA4 measurement ID in production
const GA_TRACKING_ID = "G-XXXXXXXXXX"; // Replace with your actual GA4 measurement ID

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const location = useLocation();
  const { language } = useLanguage();
  const { user } = useAuth();
  
  // Initialize Google Analytics
  useEffect(() => {
    // Only initialize in production or if explicitly enabled in other environments
    if (process.env.NODE_ENV === "production") {
      ReactGA.initialize(GA_TRACKING_ID);
      console.log("Google Analytics initialized");
    }
  }, []);

  // Track page views
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      // Send pageview with updated location
      ReactGA.send({ hitType: "pageview", page: location.pathname });
      console.log(`Page view tracked: ${location.pathname}`);
    }
  }, [location]);

  // Track language changes
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.event({
        category: "Language",
        action: "Change",
        label: language,
      });
      console.log(`Language change tracked: ${language}`);
    }
  }, [language]);

  // Track authentication state
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && user) {
      // Only track that a user is authenticated, not who they are
      ReactGA.event({
        category: "User",
        action: "Authenticated",
      });
      console.log("User authentication tracked");
    }
  }, [user]);

  // Function to track custom events
  const trackEvent = (category: string, action: string, label?: string, value?: number) => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.event({
        category,
        action,
        label,
        value,
      });
      console.log(`Event tracked - Category: ${category}, Action: ${action}, Label: ${label || "none"}`);
    }
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
