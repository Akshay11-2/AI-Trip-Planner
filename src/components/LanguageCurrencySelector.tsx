import React, { useState } from 'react';
import { Globe, DollarSign, ChevronDown } from 'lucide-react';

interface LanguageCurrencySelectorProps {
  language: string;
  currency: string;
  onLanguageChange: (language: string) => void;
  onCurrencyChange: (currency: string) => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'KRW', name: 'Korean Won', symbol: '₩' }
];

export default function LanguageCurrencySelector({
  language,
  currency,
  onLanguageChange,
  onCurrencyChange
}: LanguageCurrencySelectorProps) {
  const [showLanguages, setShowLanguages] = useState(false);
  const [showCurrencies, setShowCurrencies] = useState(false);

  const selectedLanguage = languages.find(l => l.code === language) || languages[0];
  const selectedCurrency = currencies.find(c => c.code === currency) || currencies[0];

  return (
    <div className="flex items-center space-x-4">
      {/* Language Selector */}
      <div className="relative">
        <button
          onClick={() => setShowLanguages(!showLanguages)}
          className="flex items-center space-x-2 px-3 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white transition-all duration-200"
        >
          <Globe className="h-4 w-4 text-gray-600" />
          <span className="text-lg">{selectedLanguage.flag}</span>
          <span className="text-sm font-medium text-gray-700">{selectedLanguage.code.toUpperCase()}</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>

        {showLanguages && (
          <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 min-w-[200px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setShowLanguages(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 ${
                  language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Currency Selector */}
      <div className="relative">
        <button
          onClick={() => setShowCurrencies(!showCurrencies)}
          className="flex items-center space-x-2 px-3 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white transition-all duration-200"
        >
          <DollarSign className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">{selectedCurrency.code}</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>

        {showCurrencies && (
          <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 min-w-[180px]">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => {
                  onCurrencyChange(curr.code);
                  setShowCurrencies(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between ${
                  currency === curr.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="font-medium">{curr.code}</span>
                <span className="text-sm text-gray-500">{curr.symbol}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}