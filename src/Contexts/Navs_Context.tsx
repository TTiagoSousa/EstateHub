import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface Alert {
  open: boolean;
  message: string;
  type: AlertType | '';
}

type NavigationType = 'Sidebar_Home' | 'Top_Nav_Navigation' | 'Mobile_Menu';

interface NavigationContextType {
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
  typeOfNavigation: NavigationType;
  setTypeOfNavigation: (type: NavigationType) => void;
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

  // Navigation type state
  const [typeOfNavigation, setTypeOfNavigationState] = useState<NavigationType>(() => {
    const saved = localStorage.getItem('sidebarPosition');
    return (saved as NavigationType) || 'Sidebar_Home';
  });

  // Salvar no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('sidebarPosition', typeOfNavigation);
  }, [typeOfNavigation]);

  // Função para mudar o tipo de navegação
  const setTypeOfNavigation = (type: NavigationType) => {
    setTypeOfNavigationState(type);
  };

  return (
    <NavigationContext.Provider 
      value={{ 
        alert, 
        setAlert, 
        typeOfNavigation, 
        setTypeOfNavigation 
      }}
    >
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