import { useAppBar } from '../contexts/AppBarContext';

function AppWrapper({ children }) {
  const { isDrawerOpen, toggleDrawer } = useAppBar(); // Access the context

  const handleLinkClick = () => {
    if (isDrawerOpen) {
      toggleDrawer(); // Minimize the AppBar when a link is clicked
    }
  };

  return <div onClick={handleLinkClick}>{children}</div>;
}

export default AppWrapper;
