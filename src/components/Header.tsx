
import { motion } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

const Header = () => {
  const { t } = useLanguage();
  const { isAuthenticated, signOut } = useAuth();
  
  return (
    <motion.header 
      className="w-full py-6 px-4 sm:px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center mb-4 md:flex-row md:justify-between md:items-center">
        {/* Logo and Title - Centered on mobile */}
        <motion.div 
          className="flex flex-col items-center w-full md:w-auto md:flex-row md:gap-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <span className="text-3xl mb-2 md:mb-0">🚀</span>
          <div className="flex flex-col items-center w-full md:items-start">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-interview-blue to-interview-purple bg-clip-text text-transparent text-center md:text-left">
              {t('app.title')}
            </h1>
            <p className="text-gray-600 text-xs md:text-sm text-center md:text-left">
              {t('app.subtitle')}
            </p>
          </div>
        </motion.div>
        
        {/* Navigation and User Controls */}
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <LanguageSelector />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{t('savedPlans.myPlans')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/saved-plans" className="flex items-center w-full">
                    {t('savedPlans.myPlans')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="flex items-center text-red-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('auth.signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm">
                {t('auth.signIn')}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
