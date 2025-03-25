
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import InterviewPlan from "@/components/InterviewPlan";
import LoadingAnimation from "@/components/LoadingAnimation";
import { useLanguage } from "@/context/LanguageContext";
import { SavedPlan, InterviewPlan as InterviewPlanType } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { Building, Clock, ArrowLeft } from "lucide-react";

const PlanDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<SavedPlan | null>(null);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/auth");
    } else if (isAuthenticated && id) {
      fetchPlan(id);
    }
  }, [isAuthenticated, id]);

  const fetchPlan = async (planId: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('saved_plans')
        .select('*')
        .eq('id', planId)
        .single();
      
      if (error) {
        throw error;
      }
      
      setPlan(data as unknown as SavedPlan);
    } catch (error) {
      console.error("Error fetching plan:", error);
      toast.error(t('savedPlans.errorFetching'));
      navigate("/saved-plans");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return { date: '', time: '' };
    
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
    for (let i = 0; i < (companyName || '').length; i++) {
      hashCode += companyName.charCodeAt(i);
    }
    
    return colors[hashCode % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient pt-4 pb-20">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        
        <div className="px-4 mt-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <LoadingAnimation />
              <p className="mt-4 text-lg">{t('loading.title')}</p>
            </div>
          ) : plan ? (
            <>
              <div className="flex items-center mb-8">
                <Button 
                  onClick={() => navigate("/saved-plans")}
                  variant="outline"
                  size="sm"
                  className="mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {t('backToSavedPlans')}
                </Button>
                
                {plan.company_name && (
                  <div className="flex items-center">
                    <div className={`${getCompanyColor(plan.company_name)} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3`}>
                      {getCompanyInitials(plan.company_name)}
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold">{plan.job_title}</h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Building className="h-3.5 w-3.5 mr-1.5" />
                          <span>{plan.company_name}</span>
                        </div>
                        
                        {plan.created_at && (
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                            <span>
                              {formatDate(plan.created_at).date} • {formatDate(plan.created_at).time}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <InterviewPlan plan={plan.content} />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg">{t('savedPlans.errorFetching')}</p>
              <Button 
                onClick={() => navigate("/saved-plans")}
                className="bg-interview-blue hover:bg-interview-blue/90 mt-4"
              >
                {t('backToSavedPlans')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
