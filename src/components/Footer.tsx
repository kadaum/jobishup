
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-50 border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🚀</span>
              <h3 className="text-xl font-bold bg-gradient-to-r from-interview-blue to-interview-purple bg-clip-text text-transparent">
                JobishUp
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {t('footer.brandDescription')}
            </p>
          </div>
          
          {/* Links section */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4 text-gray-800">{t('footer.product')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-interview-blue text-sm transition">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link to="/saved-plans" className="text-gray-600 hover:text-interview-blue text-sm transition">
                  {t('savedPlans.myPlans')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources section */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4 text-gray-800">{t('footer.resources')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-interview-blue text-sm transition">
                  {t('footer.blog')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-interview-blue text-sm transition">
                  {t('footer.faq')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Connect section */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4 text-gray-800">{t('footer.connect')}</h4>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-interview-blue transition">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-interview-blue transition">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-interview-blue transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {currentYear} JobishUp. {t('footer.allRightsReserved')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-interview-blue transition">
                {t('footer.terms')}
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-interview-blue transition">
                {t('footer.privacy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
