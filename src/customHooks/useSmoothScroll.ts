import { useState, useEffect } from 'react';

interface UseSmoothScrollProps {
  defaultShowBackToTop?: boolean;
}

const useSmoothScroll = ({
  defaultShowBackToTop = false,
}: UseSmoothScrollProps = {}) => {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(
    defaultShowBackToTop
  );

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const screenTop = window.innerHeight;
    if (scrollTop > screenTop) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  useEffect(() => {
    document.body.style.overflowY = 'auto';
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return showBackToTop;
};

export default useSmoothScroll;