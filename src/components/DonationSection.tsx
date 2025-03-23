
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const DonationSection = () => {
  const handleDonate = () => {
    alert("Integração com Stripe será implementada aqui.");
    // Future Stripe implementation will go here
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="glass-card overflow-hidden border border-white/20 p-6 relative">
        <div className="absolute -top-2 -right-2">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <span className="inline-block bg-interview-light-purple text-interview-purple px-3 py-1 rounded-full text-sm font-medium">
              Apoie 💜
            </span>
          </motion.div>
        </div>
        
        <div className="text-center mb-6">
          <h3 className="text-xl font-medium mb-3">
            🫶 Curtiu o InterviewPrep?
          </h3>
          <p className="text-interview-dark-gray">
            Se esse plano te ajudou, você pode nos apoiar com uma doação.
          </p>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex justify-center"
        >
          <Button 
            onClick={handleDonate}
            className="bg-white border border-interview-purple text-interview-purple hover:bg-interview-light-purple hover:text-interview-purple/90 button-hover shadow-sm"
          >
            <Heart className="mr-2 h-4 w-4 text-interview-purple" fill="#8B5CF6" />
            Apoiar com uma doação
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default DonationSection;
