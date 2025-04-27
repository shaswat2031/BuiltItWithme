"use client";
import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiTrash2,
  FiCheck,
  FiUpload,
  FiUser,
  FiMail,
  FiBook,
  FiAward,
  FiBriefcase,
  FiGithub,
} from "react-icons/fi";
import PaymentCheck from "../components/PaymentCheck";

// Main Form Component
export default function CodeOnlyForm() {
  // Add payment verification
  return (
    <>
      <PaymentCheck requiredPlan="code" />
      <CodeOnlyFormContent />
    </>
  );
}

// Form Content Component
function CodeOnlyFormContent() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    title: "",
    briefSummary: "",
    jobProfile: "",
    skills: "",
    projects: [],
    experience: [],
    education: [],
    githubProfile: "",
    resume: null,
    designPreferences: "",
    colorScheme: "",
    fontFamily: "",
    layoutStyle: "",
    seoOptimization: false,
    contactFormNeeded: false,
    blogSection: false,
    portfolioGallery: false,
    responsivePreference: "all",
    socialMediaLinks: "",
    languagePreference: "",
    targetAudience: "",
    projectTimeline: "",
    uploadedFiles: [],
    additionalRequests: "",
  });

  const emptyEducation = {
    institution: "",
    degree: "",
    year: "",
    description: "",
  };
  const emptyProject = {
    title: "",
    description: "",
    technologies: "",
    link: "",
  };
  const emptyExperience = {
    company: "",
    position: "",
    duration: "",
    description: "",
  };

  const addEducation = () =>
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { ...emptyEducation }],
    }));
  const addProject = () =>
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...emptyProject }],
    }));
  const addExperience = () =>
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...emptyExperience }],
    }));

  const removeItem = (arrayName, index) => {
    const updatedArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const handleArrayChange = (e, index, arrayName) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[arrayName]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const fileList = Array.from(files);
    if (name === "uploadedFiles") {
      setFormData((prev) => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...fileList],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: fileList[0] }));
    }
  };

  // Add payment ID to form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object to handle file uploads
      const formDataToSend = new FormData();

      // Add text and checkbox fields to FormData
      Object.keys(formData).forEach((key) => {
        if (
          key !== "resume" &&
          key !== "uploadedFiles" &&
          !["projects", "experience", "education"].includes(key)
        ) {
          if (typeof formData[key] === "boolean") {
            formDataToSend.append(key, formData[key].toString());
          } else if (formData[key] && typeof formData[key] !== "object") {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      // Handle array fields
      ["projects", "experience", "education"].forEach((arrayField) => {
        formDataToSend.append(arrayField, JSON.stringify(formData[arrayField]));
      });

      // Add file fields
      if (formData.resume) {
        formDataToSend.append("resume", formData.resume);
      }

      if (formData.uploadedFiles && formData.uploadedFiles.length > 0) {
        for (let i = 0; i < formData.uploadedFiles.length; i++) {
          formDataToSend.append("uploadedFiles", formData.uploadedFiles[i]);
        }
      }

      // Add plan type
      formDataToSend.append("planType", "code");

      // Add status (default to pending)
      formDataToSend.append("status", "pending");

      // Add payment details from localStorage
      formDataToSend.append(
        "paymentId",
        localStorage.getItem("paymentId") || "UNPAID"
      );
      formDataToSend.append(
        "paymentDate",
        localStorage.getItem("paymentDate") || ""
      );

      // Generate submission ID
      const submissionId = `CD-${Math.floor(1000 + Math.random() * 9000)}`;
      formDataToSend.append("id", submissionId);

      // Add submission date
      const submittedAt = new Date().toISOString().split("T")[0];
      formDataToSend.append("submittedAt", submittedAt);

      // Send to API
      const response = await fetch("/api/submissions", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }

      alert("Form submitted successfully! We'll send your code package soon.");

      // Reset form or redirect
      // You could redirect to a success page or reset the form
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form: " + error.message);
    }
  };

  useEffect(() => {
    if (formData.education.length === 0) addEducation();
    if (formData.projects.length === 0) addProject();
    if (formData.experience.length === 0) addExperience();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3 border-gray-200">
        Premium Code Request
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FiUser className="mr-2 text-indigo-600" /> Personal Details
        </h3>
        <InputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          icon={<FiUser />}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          icon={<FiMail />}
        />
        <InputField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextareaField
          label="Brief Summary"
          name="briefSummary"
          value={formData.briefSummary}
          onChange={handleChange}
        />
      </div>

      <Section
        label="Projects"
        icon={<FiBook />}
        items={formData.projects}
        addItem={addProject}
        removeItem={(i) => removeItem("projects", i)}
        renderFields={(item, i) => (
          <>
            <InputField
              label="Title"
              name="title"
              value={item.title}
              onChange={(e) => handleArrayChange(e, i, "projects")}
            />
            <TextareaField
              label="Description"
              name="description"
              value={item.description}
              onChange={(e) => handleArrayChange(e, i, "projects")}
            />
            <InputField
              label="Technologies"
              name="technologies"
              value={item.technologies}
              onChange={(e) => handleArrayChange(e, i, "projects")}
            />
            <InputField
              label="Link"
              name="link"
              value={item.link}
              onChange={(e) => handleArrayChange(e, i, "projects")}
            />
          </>
        )}
      />

      <Section
        label="Experience"
        icon={<FiBriefcase />}
        items={formData.experience}
        addItem={addExperience}
        removeItem={(i) => removeItem("experience", i)}
        renderFields={(item, i) => (
          <>
            <InputField
              label="Company"
              name="company"
              value={item.company}
              onChange={(e) => handleArrayChange(e, i, "experience")}
            />
            <InputField
              label="Position"
              name="position"
              value={item.position}
              onChange={(e) => handleArrayChange(e, i, "experience")}
            />
            <InputField
              label="Duration"
              name="duration"
              value={item.duration}
              onChange={(e) => handleArrayChange(e, i, "experience")}
            />
            <TextareaField
              label="Description"
              name="description"
              value={item.description}
              onChange={(e) => handleArrayChange(e, i, "experience")}
            />
          </>
        )}
      />

      <Section
        label="Education"
        icon={<FiAward />}
        items={formData.education}
        addItem={addEducation}
        removeItem={(i) => removeItem("education", i)}
        renderFields={(item, i) => (
          <>
            <InputField
              label="Institution"
              name="institution"
              value={item.institution}
              onChange={(e) => handleArrayChange(e, i, "education")}
            />
            <InputField
              label="Degree"
              name="degree"
              value={item.degree}
              onChange={(e) => handleArrayChange(e, i, "education")}
            />
            <InputField
              label="Year"
              name="year"
              value={item.year}
              onChange={(e) => handleArrayChange(e, i, "education")}
            />
            <TextareaField
              label="Description"
              name="description"
              value={item.description}
              onChange={(e) => handleArrayChange(e, i, "education")}
            />
          </>
        )}
      />

      <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FiGithub className="mr-2 text-indigo-600" /> Professional Profile
        </h3>
        <InputField
          label="GitHub Profile"
          name="githubProfile"
          value={formData.githubProfile}
          onChange={handleChange}
        />
        <TextareaField
          label="Skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FiUpload className="mr-2 text-indigo-600" /> Files & Documents
        </h3>
        <FileField label="Resume" name="resume" onChange={handleFileChange} />
        <FileField
          label="Upload Additional Files"
          name="uploadedFiles"
          onChange={handleFileChange}
          multiple
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Design Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Design Preferences"
            name="designPreferences"
            value={formData.designPreferences}
            onChange={handleChange}
          />
          <InputField
            label="Color Scheme"
            name="colorScheme"
            value={formData.colorScheme}
            onChange={handleChange}
          />
          <InputField
            label="Font Family"
            name="fontFamily"
            value={formData.fontFamily}
            onChange={handleChange}
          />
          <InputField
            label="Layout Style"
            name="layoutStyle"
            value={formData.layoutStyle}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Website Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckboxField
            label="SEO Optimization"
            name="seoOptimization"
            checked={formData.seoOptimization}
            onChange={handleChange}
          />
          <CheckboxField
            label="Contact Form"
            name="contactFormNeeded"
            checked={formData.contactFormNeeded}
            onChange={handleChange}
          />
          <CheckboxField
            label="Blog Section"
            name="blogSection"
            checked={formData.blogSection}
            onChange={handleChange}
          />
          <CheckboxField
            label="Portfolio Gallery"
            name="portfolioGallery"
            checked={formData.portfolioGallery}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Additional Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Responsive Preference"
            name="responsivePreference"
            value={formData.responsivePreference}
            onChange={handleChange}
          />
          <InputField
            label="Language Preference"
            name="languagePreference"
            value={formData.languagePreference}
            onChange={handleChange}
          />
          <InputField
            label="Target Audience"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
          />
          <InputField
            label="Project Timeline"
            name="projectTimeline"
            value={formData.projectTimeline}
            onChange={handleChange}
          />
          <InputField
            label="Social Media Links"
            name="socialMediaLinks"
            value={formData.socialMediaLinks}
            onChange={handleChange}
          />
        </div>
        <TextareaField
          label="Additional Requests"
          name="additionalRequests"
          value={formData.additionalRequests}
          onChange={handleChange}
        />
      </div>

      <div className="pt-4 flex justify-center">
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center"
        >
          <FiCheck className="mr-2" /> Submit Code Request
        </button>
      </div>
    </form>
  );
}

// Reusable Components
function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  icon,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative rounded-md">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{icon}</span>
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
    </div>
  );
}

function TextareaField({ label, name, value, onChange }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
}

function CheckboxField({ label, name, checked, onChange }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label
        htmlFor={name}
        className="ml-3 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    </div>
  );
}

function FileField({ label, name, onChange, multiple = false }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="mt-1 flex items-center">
        <span className="inline-block h-12 w-12 rounded-md overflow-hidden bg-gray-100 mr-3">
          <FiUpload className="h-full w-full text-gray-400 p-2" />
        </span>
        <input
          type="file"
          id={name}
          name={name}
          onChange={onChange}
          multiple={multiple}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>
    </div>
  );
}

function Section({ label, items, addItem, removeItem, renderFields, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
        {icon && <span className="mr-2 text-indigo-600">{icon}</span>}
        {label}
      </h3>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 p-5 rounded-lg relative transition-all hover:shadow-md bg-gradient-to-r from-white to-gray-50"
          >
            <div className="space-y-4">{renderFields(item, index)}</div>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="absolute top-3 right-3 text-rose-500 hover:text-rose-700 p-1 rounded-full hover:bg-rose-50 transition-colors flex items-center"
            >
              <FiTrash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-4 flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors text-sm font-medium"
      >
        <FiPlus className="mr-1" /> Add {label}
      </button>
    </div>
  );
}
