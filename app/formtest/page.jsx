"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiCheck,
  FiUser,
  FiMail,
  FiClipboard,
  FiFileText,
} from "react-icons/fi";
import PaymentCheck from "../components/PaymentCheck";

// Main Test Form Component
export default function TestForm() {
  return (
    <>
      <PaymentCheck requiredPlan="test" />
      <TestFormContent />
    </>
  );
}

// Test Form Content Component
function TestFormContent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    testPurpose: "",
    expectedResults: "",
    comments: "",
    acknowledgement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object
      const formDataToSend = new FormData();

      // Add form fields to FormData
      Object.keys(formData).forEach((key) => {
        if (typeof formData[key] === "boolean") {
          formDataToSend.append(key, formData[key].toString());
        } else if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add plan type
      formDataToSend.append("planType", "test");

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
      const submissionId = `TEST-${Math.floor(1000 + Math.random() * 9000)}`;
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

      alert(
        "Test form submitted successfully! Your submission will appear in the admin panel."
      );

      // Clear form or redirect
      setFormData({
        fullName: "",
        email: "",
        testPurpose: "",
        expectedResults: "",
        comments: "",
        acknowledgement: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto space-y-8 bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl shadow-lg my-8"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3 border-amber-200">
        Test Payment Form
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FiUser className="mr-2 text-amber-600" /> Tester Information
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
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FiClipboard className="mr-2 text-amber-600" /> Test Details
        </h3>
        <TextareaField
          label="Purpose of Testing"
          name="testPurpose"
          value={formData.testPurpose}
          onChange={handleChange}
          placeholder="What aspects are you testing?"
          required
        />
        <TextareaField
          label="Expected Results"
          name="expectedResults"
          value={formData.expectedResults}
          onChange={handleChange}
          placeholder="What do you expect to see in the admin panel?"
          required
        />
        <TextareaField
          label="Additional Comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Any other notes about this test"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <input
            id="acknowledgement"
            name="acknowledgement"
            type="checkbox"
            checked={formData.acknowledgement}
            onChange={handleChange}
            required
            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
          />
          <label
            htmlFor="acknowledgement"
            className="ml-2 block text-sm text-gray-700"
          >
            I acknowledge this is a test submission that will appear in the
            admin panel
          </label>
        </div>
      </div>

      <div className="pt-4 flex justify-center">
        <button
          type="submit"
          disabled={!formData.acknowledgement}
          className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-lg rounded-lg shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all transform hover:scale-105 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiCheck className="mr-2" /> Submit Test Request
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
  placeholder = "",
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
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
          placeholder={placeholder}
          className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 transition-colors ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
    </div>
  );
}

function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
