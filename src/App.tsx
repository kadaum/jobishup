
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import SavedPlans from "./pages/SavedPlans";
import PlanDetails from "./pages/PlanDetails";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import SEOHead from "./components/SEOHead";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
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
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
