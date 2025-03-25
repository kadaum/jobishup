
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Trash2, Building, Clock } from "lucide-react";
import { toast } from "sonner";
import { SavedPlan } from "@/types";
import { getSavedPlans, deleteSavedPlan } from "@/integrations/supabase/customClient";

const SavedPlans = () => {
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not authenticated, redirect to auth page
    if (!isAuthenticated && !loading) {
      navigate("/auth");
    } else if (isAuthenticated) {
      fetchSavedPlans();
    }
  }, [isAuthenticated, user]);

  const fetchSavedPlans = async () => {
    try {
      setLoading(true);
      
      // Fetch plans from the saved_plans table
      const data = await getSavedPlans();
      
      // Cast to the correct type
      setPlans(data || []);
    } catch (error) {
      console.error("Error fetching saved plans:", error);
      toast.error(t('savedPlans.errorFetching'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlan = async (id: string) => {
    try {
      // Delete from the saved_plans table
      await deleteSavedPlan(id);
      
      // Update local state to remove the deleted plan
      setPlans((prev) => prev.filter((plan) => plan.id !== id));
      toast.success(t('savedPlans.deleted'));
    } catch (error) {
      console.error("Error deleting plan:", error);
      toast.error(t('savedPlans.errorDeleting'));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    // Get the locale based on the current language
    const localeMap: Record<string, string> = {
      en: 'en-US',
      pt: 'pt-BR',
      es: 'es-ES'
    };
    const locale = localeMap[language] || 'pt-BR';
    
    // Format date
    const dateFormat = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
    
    // Format time
    const timeFormat = new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
    
    return { date: dateFormat, time: timeFormat };
  };

  // Function to generate company logo placeholder with initials
  const getCompanyInitials = (companyName: string) => {
    if (!companyName) return "CO";
    
    return companyName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };
  
  // Generate a consistent color based on company name
  const getCompanyColor = (companyName: string) => {
    const colors = [
      'bg-blue-500', 'bg-purple-500', 'bg-green-500', 
      'bg-pink-500', 'bg-indigo-500', 'bg-yellow-500',
      'bg-red-500', 'bg-teal-500', 'bg-orange-500'
    ];
    
    let hashCode = 0;
    for (let i = 0; i < companyName.length; i++) {
      hashCode += companyName.charCodeAt(i);
    }
    
    return colors[hashCode % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient pt-4 pb-20">
      <div className="w-full max-w-7xl mx-auto">
        <Header />

        <div className="px-4 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{t('savedPlans.title')}</h2>
              <Button
                onClick={() => navigate("/")}
                className="bg-interview-blue hover:bg-interview-blue/90"
              >
                {t('backToForm')}
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <p>{t('savedPlans.loading')}</p>
              </div>
            ) : plans.length === 0 ? (
              <Card className="glass-card overflow-hidden border border-white/20 p-6 text-center">
                <p>{t('savedPlans.noPlans')}</p>
                <Button
                  onClick={() => navigate("/")}
                  className="bg-interview-blue hover:bg-interview-blue/90 mt-4"
                >
                  {t('savedPlans.createFirst')}
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan) => {
                  const { date, time } = formatDate(plan.created_at);
                  const companyInitials = getCompanyInitials(plan.company_name);
                  const companyColor = getCompanyColor(plan.company_name);
                  
                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                      className="transition-all duration-300"
                    >
                      <Card className="glass-card overflow-hidden border border-white/20 h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow">
                        <div className="bg-gradient-to-r from-interview-light-blue to-interview-light-purple p-4 border-b border-white/20 flex items-center gap-3">
                          <div className={`${companyColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                            {companyInitials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{plan.job_title}</h3>
                            <p className="text-sm opacity-80 truncate">{plan.company_name}</p>
                          </div>
                        </div>
                        <div className="p-4 flex-grow space-y-2">
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                            <span className="flex items-center gap-1">
                              <span>{date}</span>
                              <span className="text-gray-400">•</span>
                              <span>{time}</span>
                            </span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Building className="h-3.5 w-3.5 mr-1.5" />
                            <span>{plan.company_name}</span>
                          </div>
                        </div>
                        <div className="p-4 pt-0 flex justify-between">
                          <Button
                            onClick={() => navigate(`/plan/${plan.id}`)}
                            className="bg-interview-blue hover:bg-interview-blue/90"
                            size="sm"
                          >
                            {t('savedPlans.view')}
                          </Button>
                          <Button
                            onClick={() => handleDeletePlan(plan.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SavedPlans;
