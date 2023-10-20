import { useEffect } from 'react';
import useLanguageStore from '../store/languageStore';

const LanguageDetector = () => {
  const { setIsPortuguese } = useLanguageStore();

  useEffect(() => {
    const language = navigator.language;

    if (language === 'pt-BR') {
      setIsPortuguese(true);
    } else {
      setIsPortuguese(false);     
    }
  }, [setIsPortuguese]);

  return null;
};

export default LanguageDetector;