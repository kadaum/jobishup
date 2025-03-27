
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Determine the home path based on the current URL path
  const getHomePath = () => {
    if (location.pathname.startsWith('/en')) {
      return '/en';
    } else if (location.pathname.startsWith('/es')) {
      return '/es';
    }
    return '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">{t('notFound.message') || 'Oops! Page not found'}</p>
        <Link 
          to={getHomePath()} 
          className="text-blue-500 hover:text-blue-700 underline"
        >
          {t('notFound.returnHome') || 'Return to Home'}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
