
import { useLanguage } from "@/context/LanguageContext";

interface AuthToggleProps {
  isSignUp: boolean;
  onToggle: () => void;
}

const AuthToggle = ({ isSignUp, onToggle }: AuthToggleProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="mt-4 text-center">
      <button
        type="button"
        onClick={onToggle}
        className="text-interview-blue hover:underline text-sm"
      >
        {isSignUp ? t('auth.alreadyHaveAccount') : t('auth.dontHaveAccount')}
      </button>
    </div>
  );
};

export default AuthToggle;
