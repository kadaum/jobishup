
import { supabase } from './client';
import { SavedPlan } from '@/types';

// Type assertions to fix TypeScript errors with Supabase tables
// This is necessary because the Supabase types don't include our custom tables
type Tables = 'saved_plans';

export const getSavedPlans = async (): Promise<SavedPlan[]> => {
  const { data, error } = await supabase
    .from('saved_plans' as Tables)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching saved plans:', error);
    throw error;
  }

  return data as unknown as SavedPlan[];
};

export const savePlan = async (planData: {
  job_title: string;
  company_name: string;
  content: any;
  raw_text?: string;
}): Promise<void> => {
  // Add user_id to the plan data
  const userData = { 
    ...planData, 
    user_id: supabase.auth.getUser().then(({ data }) => data.user?.id)
  };
  
  const { error } = await supabase
    .from('saved_plans' as Tables)
    .insert(userData as any);

  if (error) {
    console.error('Error saving plan:', error);
    throw error;
  }
};

export const deleteSavedPlan = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('saved_plans' as Tables)
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting plan:', error);
    throw error;
  }
};
