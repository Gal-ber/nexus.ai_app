import React, { createContext, useContext, useMemo } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme: Theme = 'light';

  // הפונקציה toggleTheme נשארת ריקה כדי לא לשבור רכיבים שעדיין משתמשים בה,
  // אך היא לא תבצע שום פעולה.
  const toggleTheme = () => {};

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  // מסירים את ה-useEffect שמשנה את ה-class ב-HTML
  // ומסירים את השמירה ב-localStorage.

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
