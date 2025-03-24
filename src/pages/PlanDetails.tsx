
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

const PlanDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
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
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold">{plan.job_title}</h2>
                  <p className="text-lg opacity-80">{plan.company_name}</p>
                </div>
                <Button 
                  onClick={() => navigate("/saved-plans")}
                  className="bg-interview-blue hover:bg-interview-blue/90"
                >
                  {t('backToForm')}
                </Button>
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
                {t('backToForm')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
