
import { useState } from "react";
import { savePlan } from "@/integrations/supabase/customClient";
import { InterviewPlan } from "@/types";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { useAnalytics } from "@/context/AnalyticsContext";

export function usePlanSave() {
  const [saving, setSaving] = useState(false);
  const { t, language } = useLanguage();
  const { trackEvent } = useAnalytics();

  const handleSavePlan = async (
    plan: InterviewPlan,
    jobTitle: string,
    companyName: string
  ) => {
    setSaving(true);
    
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
      
      toast.success(
        language === 'en' ? 'Plan saved successfully!' : 
        language === 'es' ? '¡Plan guardado con éxito!' : 
        'Plano salvo com sucesso!'
      );
      
      return true;
    } catch (error) {
      console.error("Error saving plan:", error);
      
      trackEvent(
        "Plan", 
        "Save Error", 
        `Job: ${jobTitle} at ${companyName}`
      );
      
      toast.error(t('plan.saveError'));
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    saving,
    handleSavePlan
  };
}
