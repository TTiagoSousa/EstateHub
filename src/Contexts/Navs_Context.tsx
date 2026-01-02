import { createContext, useContext, useState, type ReactNode } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface Alert {
  open: boolean;
  message: string;
  type: AlertType | '';
}

interface NavigationContextType {
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [alert, setAlert] = useState<Alert>({
    open: false,
    message: '',
    type: '',
  });

  return (
    <NavigationContext.Provider value={{ alert, setAlert }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavs() {
  const context = useContext(NavigationContext);
  
  if (context === undefined) {
    throw new Error('useNavs must be used within a NavigationProvider');
  }
  
  return context;
}