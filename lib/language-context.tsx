import React, { createContext, useContext, useState, useCallback, useEffect, useMemo, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language, languages, t } from './translations';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  tr: ReturnType<typeof t>;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LANGUAGE_KEY = '@medquiz_language';
const validLanguageIds = new Set<string>(languages.map((l) => l.id));

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_KEY).then((lang) => {
      if (lang && validLanguageIds.has(lang)) {
        setLanguageState(lang as Language);
      }
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);

  const setLanguage = useCallback(async (lang: Language) => {
    setLanguageState(lang);
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  }, []);

  const tr = t(language);

  const value = useMemo(() => ({
    language,
    setLanguage,
    tr,
  }), [language, setLanguage]);

  if (!loaded) return null;

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
