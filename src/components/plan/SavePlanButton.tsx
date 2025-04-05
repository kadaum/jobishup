
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useAnalytics } from "@/context/AnalyticsContext";
import { InterviewPlan } from "@/types";
import { usePlanSave } from "./auth/usePlanSave";

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
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { trackEvent } = useAnalytics();
  const { saving, handleSavePlan } = usePlanSave();

  const handleSave = async () => {
    if (!isAuthenticated) {
      // Show login dialog if not authenticated
      onLoginRequired();
      trackEvent("Plan", "Save Attempt", "Not Authenticated");
      return;
    }
    
    await handleSavePlan(plan, jobTitle, companyName);
  };

  return (
    <Button 
      onClick={handleSave}
      className="w-full bg-green-600 hover:bg-green-700 text-white button-hover"
      disabled={saving}
    >
      <Save className="mr-2 h-4 w-4" />
      {saving ? t('auth.loading') : t('plan.savePlan')}
    </Button>
  );
};

export default SavePlanButton;
