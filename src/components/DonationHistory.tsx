
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Donation {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

const DonationHistory = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        // Only fetch donations if user is logged in
        if (sessionData?.session?.user?.id) {
          const { data, error } = await supabase
            .from("donations")
            .select("*")
            .order("created_at", { ascending: false });
          
          if (error) {
            throw error;
          }
          
          setDonations(data || []);
        }
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("Não foi possível carregar suas doações.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // If user is not logged in or there are no donations, don't show anything
  if ((!donations || donations.length === 0) && !isLoading) {
    return null;
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="text-green-600 font-medium">Completa</span>;
      case "pending":
        return <span className="text-yellow-600 font-medium">Pendente</span>;
      default:
        return <span className="text-gray-600 font-medium">{status}</span>;
    }
  };

  return (
    <Card className="p-6 mb-6 bg-white">
      <h3 className="text-xl font-medium mb-4">Suas Doações</h3>
      
      {isLoading ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin h-6 w-6 border-2 border-interview-purple border-t-transparent rounded-full" />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-4">
          {donations.map((donation) => (
            <div 
              key={donation.id} 
              className="p-4 border rounded-md flex justify-between items-center"
            >
              <div>
                <div className="font-medium">
                  {donation.currency.toUpperCase()} {donation.amount.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(donation.created_at), { 
                    addSuffix: true, 
                    locale: ptBR 
                  })}
                </div>
              </div>
              <div>
                {getStatusLabel(donation.status)}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default DonationHistory;
