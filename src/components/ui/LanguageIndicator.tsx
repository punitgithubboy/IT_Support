import React from 'react';
import { getFlagByLangName } from '../../config/languages';

interface LanguageIndicatorProps {
  language: string;
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const LanguageIndicator: React.FC<LanguageIndicatorProps> = ({
  language,
  size = 'md',
  withText = true,
}) => {
  const flag = getFlagByLangName(language);
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <span className={sizeClasses[size]}>{flag}</span>
      {withText && (
        <span className={`font-medium ${sizeClasses[size]}`}>
          {language}
        </span>
      )}
    </div>
  );
};

export default LanguageIndicator;