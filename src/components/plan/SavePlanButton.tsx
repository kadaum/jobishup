
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useAnalytics } from "@/context/AnalyticsContext";
import { InterviewPlan } from "@/types";
import { savePlan } from "@/integrations/supabase/customClient";

interface SavePlanButtonProps {
  plan: InterviewPlan;
  jobTitle?: string;
  companyName?: string;
  onLoginRequired: () => void;
}

const SavePlanButton = ({ 
  plan, 
  jobTitle = "", 
  companyName = "", 
  onLoginRequired 
}: SavePlanButtonProps) => {
  const { t, language } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const { trackEvent } = useAnalytics();

  const handleSavePlan = async () => {
    if (!isAuthenticated) {
      // Show login dialog if not authenticated
      onLoginRequired();
      trackEvent("Plan", "Save Attempt", "Not Authenticated");
      return;
    }
    
    try {
      await savePlan({
        job_title: jobTitle,
        company_name: companyName,
        content: plan,
        raw_text: plan.rawText
      });
      
      trackEvent(
        "Plan", 
        "Save Success", 
        `Job: ${jobTitle} at ${companyName}`
      );
      
      toast.success(t('plan.saved'));
    } catch (error) {
      console.error("Error saving plan:", error);
      
      trackEvent(
        "Plan", 
        "Save Error", 
        `Job: ${jobTitle} at ${companyName}`
      );
      
      toast.error(t('plan.saveError'));
    }
  };

  return (
    <Button 
      onClick={handleSavePlan}
      className="w-full bg-green-600 hover:bg-green-700 text-white button-hover"
    >
      <Save className="mr-2 h-4 w-4" />
      {t('plan.savePlan')}
    </Button>
  );
};

export default SavePlanButton;
