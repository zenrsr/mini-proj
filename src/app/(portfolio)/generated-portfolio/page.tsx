"use client";

import Image from "next/image";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo
} from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Themes array to store the color classes
const themes = [
  { bg: "bg-green-500", text: "text-white" },
  { bg: "bg-black", text: "text-white" },
  { bg: "bg-red-500", text: "text-white" },
  { bg: "bg-purple-500", text: "text-white" }
];

const Portfolio = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    number: "",
    place: "",
    bio: "",
    linkedin: "",
    github: "",
    experience: ""
  });
  const [education, setEducation] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [projects, setProjects] = useState<
    { title: string; description: string }[]
  >([]);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [resume, setResume] = useState<string | null>(null);
  const [portfolio, setPortfolio] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const portfolioRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = () => {
      const storedData = {
        fname: localStorage.getItem("fname") || "",
        lname: localStorage.getItem("lname") || "",
        email: localStorage.getItem("email") || "",
        number: localStorage.getItem("number") || "",
        place: localStorage.getItem("place") || "",
        bio: localStorage.getItem("bio") || "",
        linkedin: localStorage.getItem("linkedin") || "",
        github: localStorage.getItem("github") || "",
        experience: localStorage.getItem("experience") || ""
      };

      setFormData(storedData);
      setEducation(JSON.parse(localStorage.getItem("education") || "[]"));
      setSkills(JSON.parse(localStorage.getItem("skills") || "[]"));
      setCertifications(
        JSON.parse(localStorage.getItem("certifications") || "[]")
      );

      const projectTitles = JSON.parse(
        localStorage.getItem("projectTitles") || "[]"
      );
      const projectDescriptions = JSON.parse(
        localStorage.getItem("projectDescriptions") || "[]"
      );
      setProjects(
        projectTitles.map((title: string, index: number) => ({
          title,
          description: projectDescriptions[index] || ""
        }))
      );

      setProfilePic(localStorage.getItem("profilePic"));
      setResume(localStorage.getItem("resume"));
      setPortfolio(localStorage.getItem("portfolio"));
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Change the theme every time the component re-renders
    setCurrentTheme(themes[Math.floor(Math.random() * themes.length)]);
  }, [
    formData,
    education,
    skills,
    certifications,
    projects,
    profilePic,
    resume,
    portfolio
  ]);

  const addSectionRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  }, []);

  const renderList = useCallback(
    (items: string[], title: string) => (
      <section ref={addSectionRef} className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="mb-2">
              {item}
            </li>
          ))}
        </ul>
      </section>
    ),
    [addSectionRef]
  );

  const profileSection = useMemo(
    () => (
      <header ref={addSectionRef} className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          {formData.fname} {formData.lname}
        </h1>
        <p className="text-xl">
          {formData.email} | {formData.number}
        </p>
        <p className="text-lg">{formData.place}</p>
        <p className="mt-4">{formData.bio}</p>
        {profilePic && (
          <Image
            src={profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mt-4"
            width={128}
            height={128}
          />
        )}
      </header>
    ),
    [formData, profilePic, addSectionRef]
  );

  const downloadPDF = () => {
    if (portfolioRef.current) {
      html2canvas(portfolioRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("portfolio.pdf");
      });
    }
  };

  return (
    <div
      ref={portfolioRef}
      className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} p-8`}
    >
      {profileSection}
      {renderList(education, "Education")}
      {renderList(skills, "Skills")}
      {renderList(certifications, "Certifications")}

      <section ref={addSectionRef} className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Projects</h2>
        {projects.map((project, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <p className="mt-2">{project.description}</p>
          </div>
        ))}
      </section>

      <section ref={addSectionRef} className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Experience</h2>
        <p>{formData.experience}</p>
      </section>

      <section ref={addSectionRef} className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Social Media</h2>
        <p>
          <a
            href={formData.linkedin}
            className="text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <br />
          <a
            href={formData.github}
            className="text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </section>

      <section ref={addSectionRef} className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Uploads</h2>
        {resume && (
          <p>
            <a
              href={resume}
              className="text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </p>
        )}
        {portfolio && (
          <p>
            <a
              href={portfolio}
              className="text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
          </p>
        )}
      </section>

      <button
        onClick={downloadPDF}
        className="mt-8 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default Portfolio;
