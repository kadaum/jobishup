
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
    // Initialize regardless of environment since we've added the script to index.html
    ReactGA.initialize(GA_TRACKING_ID);
    console.log("Google Analytics initialized");
  }, []);

  // Track page views
  useEffect(() => {
    // Send pageview with updated location
    ReactGA.send({ hitType: "pageview", page: location.pathname });
    console.log(`Page view tracked: ${location.pathname}`);
  }, [location]);

  // Track language changes
  useEffect(() => {
    ReactGA.event({
      category: "Language",
      action: "Change",
      label: language,
    });
    console.log(`Language change tracked: ${language}`);
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
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
