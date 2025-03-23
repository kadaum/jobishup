
import { motion } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const { t } = useLanguage();
  const { isAuthenticated, signOut } = useAuth();
  
  return (
    <motion.header 
      className="w-full py-6 px-4 sm:px-6 flex flex-col items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center mb-4 md:mb-0 w-full">
        <motion.div 
          className="flex items-center gap-2 mb-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <span className="text-3xl">🚀</span>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-interview-blue to-interview-purple bg-clip-text text-transparent">
            {t('app.title')}
          </h1>
        </motion.div>
        <motion.p 
          className="text-gray-600 max-w-md text-center text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t('app.subtitle')}
        </motion.p>
      </div>
      
      <div className="flex items-center justify-end w-full mt-4 gap-2">
        <LanguageSelector />
        
        {isAuthenticated ? (
          <div className="flex gap-2">
            <Link to="/saved-plans">
              <Button variant="outline" size="sm">
                {t('savedPlans.myPlans')}
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => signOut()}
            >
              {t('auth.signOut')}
            </Button>
          </div>
        ) : (
          <Link to="/auth">
            <Button variant="outline" size="sm">
              {t('auth.signIn')}
            </Button>
          </Link>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
