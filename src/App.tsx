
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

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <SEOHead />
          <Toaster richColors position="top-center" />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/saved-plans" element={<SavedPlans />} />
            <Route path="/plan/:id" element={<PlanDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
