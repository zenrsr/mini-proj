import { useState, useEffect } from "react";

function useOnScreen(ref: unknown, threshold = 0.3) {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry?.isIntersecting ?? false);
      },
      {
        rootMargin: "0px",
        threshold
      }
    );
    if (ref && typeof ref === "object" && "current" in ref) {
      const currentRef = ref.current;
      if (currentRef instanceof Element) {
        observer.observe(currentRef);
        return () => {
          observer.unobserve(currentRef);
        };
      }
    }
    return undefined;
  }, [ref, threshold]);
  return isIntersecting;
}
export default useOnScreen;
