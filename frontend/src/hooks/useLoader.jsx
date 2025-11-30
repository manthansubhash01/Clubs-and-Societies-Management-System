import { useEffect, useState } from "react";

function useLoader(isDataLoading, minDuration = 800) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!isDataLoading) {
      const timer = setTimeout(() => setShowLoader(false), minDuration);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(true);
    }
  }, [isDataLoading, minDuration]);

  return showLoader;
}

export default useLoader