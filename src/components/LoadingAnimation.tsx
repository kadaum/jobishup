
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const LoadingAnimation = () => {
  const { t } = useLanguage();
  // Create an array for dots animation
  const dots = Array.from({ length: 3 });

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: { 
      y: [0, -10, 0],
      transition: {
        repeat: Infinity,
        duration: 1.2,
      }
    }
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mt-12 flex flex-col items-center justify-center px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="glass-card p-8 rounded-xl flex flex-col items-center justify-center w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full bg-interview-light-blue flex items-center justify-center">
            <motion.div
              className="w-10 h-10 text-2xl flex items-center justify-center"
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              🔍
            </motion.div>
          </div>
        </div>
        
        <h3 className="text-xl font-medium text-center mb-3">{t('loading.title')}</h3>
        
        <p className="text-interview-dark-gray text-center max-w-md mb-6 text-sm md:text-base">
          {t('loading.subtitle')}
        </p>
        
        <motion.div 
          className="flex space-x-2 justify-center items-center"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {dots.map((_, index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full bg-interview-blue"
              variants={dotVariants}
              custom={index}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingAnimation;
