
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const LanguageToggle = () => {
  const { language, setLanguage, isRTL } = useLanguage();
  const isMobile = useIsMobile();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  return (
    <Button 
      variant="ghost" 
      size={isMobile ? "icon" : "sm"}
      onClick={toggleLanguage}
      className={`flex items-center ${isMobile ? 'p-1' : 'gap-1'}`}
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      <Globe size={isMobile ? 18 : 16} />
      {!isMobile && <span>{isRTL ? 'English' : 'العربية'}</span>}
    </Button>
  );
};

export default LanguageToggle;
