import React from "react";
import useMediaQuery from "../../lib/hooks/useMediaQuery";

const ResumeHistorySection = () => {
  // Use the hook instead of direct window.innerWidth
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div>
      {/* Example usage */}
      {isMobile ? (
        <div>Mobile view content</div>
      ) : (
        <div>Desktop view content</div>
      )}
    </div>
  );
};

export default ResumeHistorySection;
