"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useCallback } from "react";

interface Project {
  title: string;
  description: string;
}

interface FormData {
  fname: string;
  lname: string;
  email: string;
  number: string;
  place: string;
  bio: string;
  linkedin: string;
  github: string;
  experience: string;
}

const Form = () => {
  const [education, setEducation] = useState<string[]>([""]);
  const [skills, setSkills] = useState<string[]>([""]);
  const [certifications, setCertifications] = useState<string[]>([""]);
  const [projects, setProjects] = useState<Project[]>([
    { title: "", description: "" }
  ]);
  const [formData, setFormData] = useState<FormData>({
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
  const [files, setFiles] = useState({
    profilePic: null as File | null,
    resume: null as File | null,
    portfolio: null as File | null
  });

  const handleArrayInput = useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<string[]>>,
      index: number,
      value: string
    ) => {
      setter((prev) => prev.map((item, i) => (i === index ? value : item)));
    },
    []
  );

  const addInput = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
      setter((prev) => [...prev, ""]);
    },
    []
  );

  const removeInput = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
      setter((prev) => prev.filter((_, i) => i !== index));
    },
    []
  );

  const handleProjectChange = useCallback(
    (index: number, field: keyof Project, value: string) => {
      setProjects((prev) =>
        prev.map((project, i) =>
          i === index ? { ...project, [field]: value } : project
        )
      );
    },
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof files) => {
      if (e.target.files && e.target.files[0]) {
        setFiles((prev) => ({ ...prev, [key]: e.target.files?.[0] || null }));
      }
    },
    []
  );

  const readFileAsDataURL = (file: File | null): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Save form data to localStorage
      Object.entries(formData).forEach(([key, value]) =>
        localStorage.setItem(key, value)
      );
      localStorage.setItem("skills", JSON.stringify(skills));
      localStorage.setItem("certifications", JSON.stringify(certifications));
      localStorage.setItem("education", JSON.stringify(education));
      localStorage.setItem(
        "projectTitles",
        JSON.stringify(projects.map((p) => p.title))
      );
      localStorage.setItem(
        "projectDescriptions",
        JSON.stringify(projects.map((p) => p.description))
      );

      try {
        const profilePicDataURL = await readFileAsDataURL(files.profilePic);
        const resumeDataURL = await readFileAsDataURL(files.resume);
        const portfolioDataURL = await readFileAsDataURL(files.portfolio);

        if (profilePicDataURL)
          localStorage.setItem("profilePic", profilePicDataURL);
        if (resumeDataURL) localStorage.setItem("resume", resumeDataURL);
        if (portfolioDataURL)
          localStorage.setItem("portfolio", portfolioDataURL);

        window.location.href = "/generated-portfolio"; // Redirect to Portfolio page
      } catch (error) {
        console.error("Error handling files:", error);
      }
    },
    [formData, skills, certifications, education, projects, files]
  );

  const renderInputField = (
    label: string,
    name: keyof FormData,
    type: string = "text",
    required: boolean = true
  ) => (
    <div className="mb-4">
      <Label htmlFor={name} className="block font-semibold mb-2">
        {label}:{required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
        required={required}
        className="w-full p-2 mb-4 input"
      />
    </div>
  );

  const renderTextareaField = (
    label: string,
    name: keyof FormData,
    rows: number = 2,
    required: boolean = false
  ) => (
    <div className="mb-4">
      <Label htmlFor={name} className="block font-semibold mb-2">
        {label}:{required && <span className="text-red-500">*</span>}
      </Label>
      <Textarea
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        rows={rows}
        placeholder={`Enter your ${label.toLowerCase()}`}
        required={required}
        className="w-full p-2 mb-4 input"
      />
    </div>
  );

  const renderDynamicInputs = (
    label: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>,
    rows: number = 1
  ) => (
    <div className="mb-4">
      <Label htmlFor={label.toLowerCase()} className="block font-semibold mb-2">
        {label}:<span className="text-red-500">*</span>
      </Label>
      {state.map((item, index) => (
        <div key={index} className="flex mb-2">
          <Textarea
            value={item}
            onChange={(e) => handleArrayInput(setState, index, e.target.value)}
            rows={rows}
            placeholder={`Enter your ${label.toLowerCase()}`}
            required
            className="w-full p-2 input mr-2"
          />
          <button
            type="button"
            onClick={() => removeInput(setState, index)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            ✖
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addInput(setState)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add {label}
      </button>
    </div>
  );

  return (
    <div className="mx-auto p-4 bg-black w-screen min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-white backdrop-blur-sm bg-opacity-5 p-8 rounded-lg shadow-lg inner"
      >
        <h1 className="text-3xl font-bold mb-4 title">Personal Information</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {renderInputField("First Name", "fname")}
            {renderInputField("Last Name", "lname")}
            {renderInputField("Email", "email", "email")}
            {renderInputField("Phone", "number", "number")}
            {renderTextareaField("Place", "place")}
            {renderTextareaField("Bio", "bio", 2, true)}
          </div>
          <div>
            {renderDynamicInputs("Education", education, setEducation, 3)}
            {renderDynamicInputs("Skills", skills, setSkills)}
            {renderDynamicInputs(
              "Certifications",
              certifications,
              setCertifications
            )}
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <Label className="block font-semibold mb-2">
                  Project {index + 1}
                </Label>
                {renderInputField(
                  "Title",
                  `projects[${index}].title` as keyof FormData
                )}
                {renderTextareaField(
                  "Description",
                  `projects[${index}].description` as keyof FormData,
                  3
                )}
                <button
                  type="button"
                  onClick={() =>
                    setProjects((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove Project
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setProjects((prev) => [...prev, { title: "", description: "" }])
              }
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
            >
              Add Project
            </button>
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="linkedin" className="block font-semibold mb-2">
            LinkedIn URL:
          </Label>
          <Input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            placeholder="Enter your LinkedIn URL"
            className="w-full p-2 input"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="github" className="block font-semibold mb-2">
            GitHub URL:
          </Label>
          <Input
            type="url"
            id="github"
            name="github"
            value={formData.github}
            onChange={handleInputChange}
            placeholder="Enter your GitHub URL"
            className="w-full p-2 input"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="experience" className="block font-semibold mb-2">
            Experience:
          </Label>
          <Textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            rows={4}
            placeholder="Enter your experience"
            className="w-full p-2 input"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="profilePic" className="block font-semibold mb-2">
            Profile Picture:
          </Label>
          <Input
            type="file"
            id="profilePic"
            onChange={(e) => handleFileChange(e, "profilePic")}
            className="w-full p-2 input"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="resume" className="block font-semibold mb-2">
            Resume:
          </Label>
          <Input
            type="file"
            id="resume"
            onChange={(e) => handleFileChange(e, "resume")}
            className="w-full p-2 input"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="portfolio" className="block font-semibold mb-2">
            Portfolio:
          </Label>
          <Input
            type="file"
            id="portfolio"
            onChange={(e) => handleFileChange(e, "portfolio")}
            className="w-full p-2 input"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
