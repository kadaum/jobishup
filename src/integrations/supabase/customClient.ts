
import { supabase } from './client';
import { SavedPlan } from '@/types';

// This is a wrapper around the original supabase client that adds
// support for the saved_plans table until the types are regenerated
export const customSupabase = {
  ...supabase,
  from: (table: string) => {
    if (table === 'saved_plans') {
      // Add type casting for the saved_plans table
      return supabase.from(table as any);
    }
    return supabase.from(table);
  }
};

// Helper functions for saved plans
export const getSavedPlans = async () => {
  const { data, error } = await customSupabase
    .from('saved_plans')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as unknown as SavedPlan[];
};

export const savePlan = async (plan: {
  job_title: string;
  company_name: string;
  content: any;
  raw_text?: string;
}) => {
  const { error } = await customSupabase
    .from('saved_plans')
    .insert(plan as any);
  
  if (error) throw error;
  return true;
};

export const deleteSavedPlan = async (id: string) => {
  const { error } = await customSupabase
    .from('saved_plans')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};
