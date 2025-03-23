
import { motion } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

const Header = () => {
  const { t } = useLanguage();
  
  return (
    <motion.header 
      className="w-full py-6 px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center mb-4 md:mb-0 md:items-center md:w-full">
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
      
      <div className="md:absolute md:right-6">
        <LanguageSelector />
      </div>
    </motion.header>
  );
};

export default Header;
