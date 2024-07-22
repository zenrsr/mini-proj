// ResultDisplay.tsx
import React from "react";

interface ResultDisplayProps {
  cgpa: number | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ cgpa }) => {
  return (
    <div className="result mt-6 text-center">
      <h2 className="text-2xl font-bold">Your CGPA</h2>
      <p className="text-4xl font-bold text-blue-400 mt-2">
        {cgpa !== null ? cgpa : "-"}
      </p>
    </div>
  );
};

export default ResultDisplay;
