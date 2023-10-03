import { createContext, useContext, useState } from 'react';

const AppBarContext = createContext();

export function useAppBar() {
  return useContext(AppBarContext);
}

export function AppBarProvider({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <AppBarContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
      {children}
    </AppBarContext.Provider>
  );
}
