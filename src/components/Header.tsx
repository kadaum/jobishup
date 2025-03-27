
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
      <div className="flex justify-end mb-4">
        {/* Navigation and User Controls */}
        <div className="flex items-center gap-2">
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
