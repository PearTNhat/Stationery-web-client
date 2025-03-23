import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("Location changed to:", location.pathname);
    window.scrollTo(0, 0);
  }, [location]);
  

  return null;
};

export default ScrollToTop;
