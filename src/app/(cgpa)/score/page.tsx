"use client";
import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import InputField from "./InputField";
import ResultDisplay from "./ResultDisplay";

const CGPACalculator: React.FC = () => {
  const [semesters, setSemesters] = useState<number>(1);
  const [grades, setGrades] = useState<number[]>([]);
  const [credits, setCredits] = useState<number[]>([]);
  const [cgpa, setCGPA] = useState<number | null>(null);

  useEffect(() => {
    gsap.from(".calculator", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      delay: 0.5
    });
  }, []);

  const handleSemestersChange = (value: number) => {
    setSemesters(value);
    setGrades(new Array(value).fill(0));
    setCredits(new Array(value).fill(0));
  };

  const handleGradeChange = (index: number, value: number) => {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
  };

  const handleCreditChange = (index: number, value: number) => {
    const newCredits = [...credits];
    newCredits[index] = value;
    setCredits(newCredits);
  };

  const calculateCGPA = () => {
    const totalCredits = credits.reduce((sum, credit) => sum + credit, 0);
    const weightedSum = grades.reduce(
      (sum, grade, index) => sum + grade * credits[index],
      0
    );
    const calculatedCGPA = weightedSum / totalCredits;
    setCGPA(Number(calculatedCGPA.toFixed(2)));

    gsap.to(".result", { scale: 1.1, duration: 0.3, yoyo: true, repeat: 1 });
  };

  return (
    <div className="calculator bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
      <InputField
        label="Number of Semesters"
        value={semesters}
        onChange={(e) => handleSemestersChange(Number(e.target.value))}
        min={1}
        max={8}
      />

      {Array.from({ length: semesters }).map((_, index) => (
        <div key={index} className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Semester {index + 1}</h3>
          <InputField
            label="Grade"
            value={grades[index] || 0}
            onChange={(e) => handleGradeChange(index, Number(e.target.value))}
            min={0}
            max={10}
            step={0.1}
          />
          <InputField
            label="Credits"
            value={credits[index] || 0}
            onChange={(e) => handleCreditChange(index, Number(e.target.value))}
            min={0}
            max={30}
          />
        </div>
      ))}

      <button
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300"
        onClick={calculateCGPA}
      >
        Calculate CGPA
      </button>

      <ResultDisplay cgpa={cgpa} />
    </div>
  );
};

export default CGPACalculator;
