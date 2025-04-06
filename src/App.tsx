import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { toast } from "sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import SavedPlans from "./pages/SavedPlans";
import PlanDetails from "./pages/PlanDetails";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AnalyticsProvider } from "./context/AnalyticsContext";
import SEOHead from "./components/SEOHead";
import Footer from "./components/Footer";

// Test component to fire an event on mount
const AppInitializer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Direct gtag call to test
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'app_initialized', {
        'time': new Date().toString()
      });
      console.log("App initialization event sent via gtag");
    }
    
    // Check URL parameters for payment feedback and authentication
    const searchParams = new URLSearchParams(location.search);
    
    // If user is authenticated and there's a hash fragment in the URL,
    // it might be from a social auth redirect - clean it up
    if (isAuthenticated && window.location.hash === '#') {
      // Replace the URL without the hash
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // Handle premium payment success
    if (searchParams.get('premium_success')) {
      toast.success(
        language === 'en' ? 'Premium plan unlocked successfully!' : 
        language === 'es' ? '¡Plan premium desbloqueado con éxito!' : 
        'Plano premium desbloqueado com sucesso!'
      );
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'premium_payment_success', {
          'plan_id': searchParams.get('planId') || 'unknown'
        });
      }
    }
    
    // Handle premium payment cancel
    if (searchParams.get('premium_cancel')) {
      toast.error(
        language === 'en' ? 'Premium plan purchase cancelled.' : 
        language === 'es' ? 'Compra del plan premium cancelada.' : 
        'Compra do plano premium cancelada.'
      );
    }
    
    // Handle donation success
    if (searchParams.get('donation_success')) {
      toast.success(
        language === 'en' ? 'Thank you for your donation!' : 
        language === 'es' ? '¡Gracias por tu donación!' : 
        'Obrigado pela sua doação!'
      );
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'donation_success');
      }
    }
    
    // Handle donation cancel
    if (searchParams.get('donation_cancel')) {
      toast.error(
        language === 'en' ? 'Donation cancelled.' : 
        language === 'es' ? 'Donación cancelada.' : 
        'Doação cancelada.'
      );
    }
  }, [location, language, isAuthenticated, navigate]);

  return null;
};

function AppContent() {
  return (
    <>
      <AppInitializer />
      <SEOHead />
      <Toaster richColors position="top-center" />
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/saved-plans" element={<SavedPlans />} />
          <Route path="/plan/:id" element={<PlanDetails />} />
          
          {/* Language-specific routes */}
          <Route path="/en" element={<Index />} />
          <Route path="/es" element={<Index />} />
          <Route path="/en/auth" element={<Auth />} />
          <Route path="/es/auth" element={<Auth />} />
          <Route path="/en/saved-plans" element={<SavedPlans />} />
          <Route path="/es/saved-plans" element={<SavedPlans />} />
          <Route path="/en/plan/:id" element={<PlanDetails />} />
          <Route path="/es/plan/:id" element={<PlanDetails />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <AnalyticsProvider>
            <AppContent />
          </AnalyticsProvider>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
