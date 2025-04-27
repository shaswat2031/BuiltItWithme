"use client";

import React, { useState } from "react";
import PaymentCheck from "../components/PaymentCheck";

// Main Component with Payment Check
export default function LiveWebsiteFormPage() {
  return (
    <>
      <PaymentCheck requiredPlan="live" />
      <LiveWebsiteForm />
    </>
  );
}

// Live Website Form Component
function LiveWebsiteForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    title: "",
    jobProfile: "",
    skills: "",
    experience: "",
    education: "",
    projects: "",
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
    githubUsername: "",
    githubPassword: "",
    vercelId: "",
    vercelPassword: "",
    bypassPayment: false,
    domainType: "",
    customDomain: "",
  });

  // Predefined options for select fields
  const skillOptions = [
    "JavaScript",
    "React",
    "Next.js",
    "Python",
    "Node.js",
    "CSS",
    "HTML",
    "TypeScript",
    "GraphQL",
    "SQL",
    "MongoDB",
    "AWS",
    "Docker",
    "UI/UX Design",
    "Responsive Design",
    "Mobile Development",
  ];

  const colorSchemeOptions = [
    "Blue",
    "Green",
    "Red",
    "Purple",
    "Monochrome",
    "Custom",
  ];
  const fontFamilyOptions = [
    "Sans-serif",
    "Serif",
    "Monospace",
    "Display",
    "Handwriting",
  ];
  const layoutStyleOptions = [
    "Minimalist",
    "Modern",
    "Classic",
    "Creative",
    "Corporate",
  ];
  const responsiveOptions = ["All Devices", "Desktop Only", "Mobile Priority"];
  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
  ];
  const timelineOptions = [
    "1 week",
    "2 weeks",
    "1 month",
    "2 months",
    "3+ months",
  ];

  const domainOptions = [
    "Personal Portfolio",
    "Professional Resume",
    "Project Showcase",
    "Freelancer Profile",
    "Creative Portfolio",
    "Developer Portfolio",
    "Agency/Studio",
    "Personal Blog",
    "Business Website",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const value = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files.length > 1 ? Array.from(files) : files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payment validation - check if payment exists or bypass is enabled
    const paymentCompleted =
      localStorage.getItem("paymentCompleted") === "true";
    const paymentPlan = localStorage.getItem("paymentPlan");

    if (
      !paymentCompleted &&
      !formData.bypassPayment &&
      paymentPlan !== "live"
    ) {
      alert(
        "Payment is required before submitting this form. Please complete payment on the pricing page."
      );
      router.push("/pricing");
      return;
    }

    try {
      // Create FormData object to handle file uploads
      const formDataToSend = new FormData();

      // Add all text fields to FormData
      Object.keys(formData).forEach((key) => {
        if (key !== "resume" && key !== "uploadedFiles") {
          if (typeof formData[key] === "boolean") {
            formDataToSend.append(key, formData[key].toString());
          } else if (formData[key] && typeof formData[key] !== "object") {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      // Add file fields if they exist
      if (formData.resume) {
        formDataToSend.append("resume", formData.resume);
      }

      if (formData.uploadedFiles && formData.uploadedFiles.length > 0) {
        for (let i = 0; i < formData.uploadedFiles.length; i++) {
          formDataToSend.append("uploadedFiles", formData.uploadedFiles[i]);
        }
      }

      // Add plan type
      formDataToSend.append("planType", "live");

      // Add status (default to pending)
      formDataToSend.append("status", "pending");

      // Handle payment info - use bypass option for testing when PayPal fails
      if (formData.bypassPayment) {
        formDataToSend.append("paymentId", "TESTING-BYPASS");
        formDataToSend.append("paymentDate", new Date().toISOString());
      } else {
        // Regular payment flow
        formDataToSend.append(
          "paymentId",
          localStorage.getItem("paymentId") || "UNPAID"
        );
        formDataToSend.append(
          "paymentDate",
          localStorage.getItem("paymentDate") || ""
        );
      }

      // Generate submission ID (you can modify this format)
      const submissionId = `LD-${Math.floor(1000 + Math.random() * 9000)}`;
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

      // Show success message
      alert(
        "Form submitted successfully! We'll contact you about your live website soon."
      );

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        title: "",
        jobProfile: "",
        skills: "",
        experience: "",
        education: "",
        projects: "",
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
        githubUsername: "",
        githubPassword: "",
        vercelId: "",
        vercelPassword: "",
        bypassPayment: false,
        domainType: "",
        customDomain: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form: " + error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Live Website Request Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-blue-600">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField
              name="fullName"
              label="Full Name *"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <InputField
              name="email"
              label="Email *"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              name="title"
              label="Professional Title"
              value={formData.title}
              onChange={handleChange}
            />
            <InputField
              name="jobProfile"
              label="Job Profile"
              value={formData.jobProfile}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-blue-600">
            Professional Details
          </h2>

          <div className="mb-6">
            <InputField
              name="skills"
              label="Skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="JavaScript, React, Next.js, etc."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <TextareaField
              name="experience"
              label="Experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Describe your work experience"
            />
            <TextareaField
              name="education"
              label="Education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Your educational background"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField
              name="githubProfile"
              label="GitHub Profile"
              value={formData.githubProfile}
              onChange={handleChange}
              placeholder="https://github.com/username"
            />
            <InputField
              name="socialMediaLinks"
              label="Social Media Links"
              value={formData.socialMediaLinks}
              onChange={handleChange}
              placeholder="LinkedIn, Twitter, etc."
            />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-blue-600">
            Website Design Preferences
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <InputField
              name="designPreferences"
              label="Design Preferences"
              value={formData.designPreferences}
              onChange={handleChange}
              placeholder="Any specific design ideas"
            />
            <SelectField
              name="colorScheme"
              label="Color Scheme"
              options={colorSchemeOptions}
              value={formData.colorScheme}
              onChange={handleChange}
            />
            <SelectField
              name="fontFamily"
              label="Font Family"
              options={fontFamilyOptions}
              value={formData.fontFamily}
              onChange={handleChange}
            />
            <SelectField
              name="layoutStyle"
              label="Layout Style"
              options={layoutStyleOptions}
              value={formData.layoutStyle}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-50 p-6 rounded-lg mb-6">
            <CheckboxField
              name="seoOptimization"
              label="SEO Optimization"
              checked={formData.seoOptimization}
              onChange={handleChange}
            />
            <CheckboxField
              name="contactFormNeeded"
              label="Contact Form"
              checked={formData.contactFormNeeded}
              onChange={handleChange}
            />
            <CheckboxField
              name="blogSection"
              label="Blog Section"
              checked={formData.blogSection}
              onChange={handleChange}
            />
            <CheckboxField
              name="portfolioGallery"
              label="Portfolio Gallery"
              checked={formData.portfolioGallery}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SelectField
              name="responsivePreference"
              label="Responsive Preference"
              options={responsiveOptions}
              value={formData.responsivePreference}
              onChange={handleChange}
            />
            <SelectField
              name="languagePreference"
              label="Language Preference"
              options={languageOptions}
              value={formData.languagePreference}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-blue-600">
            Project Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <InputField
              name="targetAudience"
              label="Target Audience"
              value={formData.targetAudience}
              onChange={handleChange}
            />
            <SelectField
              name="projectTimeline"
              label="Project Timeline"
              options={timelineOptions}
              value={formData.projectTimeline}
              onChange={handleChange}
            />
          </div>

          <TextareaField
            name="additionalRequests"
            label="Additional Requests or Comments"
            value={formData.additionalRequests}
            onChange={handleChange}
            rows={5}
          />
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-blue-600">
            Domain & Hosting
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <SelectField
              name="domainType"
              label="Website Type"
              options={domainOptions}
              value={formData.domainType || ""}
              onChange={handleChange}
            />
            <InputField
              name="customDomain"
              label="Custom Domain (if you have one)"
              value={formData.customDomain || ""}
              onChange={handleChange}
              placeholder="example.com"
            />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-blue-600">
            Account Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <InputField
              name="githubUsername"
              label="GitHub Username"
              value={formData.githubUsername}
              onChange={handleChange}
            />
            <InputField
              name="githubPassword"
              label="GitHub Password"
              type="password"
              value={formData.githubPassword}
              onChange={handleChange}
            />
            <InputField
              name="vercelId"
              label="Vercel ID"
              value={formData.vercelId}
              onChange={handleChange}
            />
            <InputField
              name="vercelPassword"
              label="Vercel Password"
              type="password"
              value={formData.vercelPassword}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-blue-600">
            File Uploads
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FileField
              name="resume"
              label="Resume (PDF)"
              onChange={handleFileChange}
              accept=".pdf"
            />
            <FileField
              name="uploadedFiles"
              label="Additional Files"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.png,.zip"
              multiple
            />
          </div>
        </section>

        <div className="mt-6 mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="bypassPayment"
              name="bypassPayment"
              checked={formData.bypassPayment}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  bypassPayment: e.target.checked,
                }))
              }
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="bypassPayment"
              className="ml-2 block text-sm font-medium text-gray-700"
            >
              Bypass payment for testing (Development only)
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            This allows form submission without PayPal payment for testing
            purposes.
            <strong className="text-red-600"> Remove in production!</strong>
          </p>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full px-8 py-4 bg-blue-600 text-white font-medium text-lg rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-[1.02]"
          >
            Submit Live Website Request
          </button>
        </div>
      </form>
    </div>
  );
}

// Helper Components
function InputField({
  name,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}) {
  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      />
    </div>
  );
}

function TextareaField({
  name,
  label,
  value,
  onChange,
  placeholder = "",
  rows = 3,
}) {
  return (
    <div className="mb-2">
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
        rows={rows}
        placeholder={placeholder}
        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      />
    </div>
  );
}

function CheckboxField({ name, label, checked, onChange }) {
  return (
    <div className="flex items-center bg-white p-3 rounded-md border border-gray-200 shadow-sm hover:border-blue-300 transition-all">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label htmlFor={name} className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
}

function FileField({ name, label, onChange, accept, multiple = false }) {
  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition-all duration-200">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={name}
              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
            >
              <span>Upload {multiple ? "files" : "a file"}</span>
              <input
                id={name}
                name={name}
                type="file"
                onChange={onChange}
                accept={accept}
                multiple={multiple}
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">
            {accept.split(",").join(", ")} up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
}

function SelectField({
  name,
  label,
  options,
  value,
  onChange,
  multiple = false,
}) {
  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        multiple={multiple}
        className={`block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
          multiple ? "h-32" : ""
        }`}
      >
        {!multiple && <option value="">Select an option</option>}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {multiple && (
        <p className="mt-1 text-xs text-gray-500">
          Hold Ctrl (or Cmd) to select multiple options
        </p>
      )}
    </div>
  );
}
