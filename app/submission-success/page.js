"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SubmissionSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submissionDetails, setSubmissionDetails] = useState({
    id: "",
    type: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    const id = searchParams.get("id");
    const type = searchParams.get("type") || "form";

    if (!id) {
      router.push("/");
      return;
    }

    // Set submission details based on type
    if (type === "live") {
      setSubmissionDetails({
        id,
        type: "live",
        title: "Live Website Request Submitted",
        description:
          "We've received your request and will deploy your website within 3-4 days.",
      });
    } else if (type === "code") {
      setSubmissionDetails({
        id,
        type: "code",
        title: "Code Package Request Submitted",
        description:
          "Your code package will be prepared and sent to you within 48 hours.",
      });
    } else {
      setSubmissionDetails({
        id,
        type: "form",
        title: "Form Submitted Successfully",
        description: "Thank you for your submission. We'll be in touch soon.",
      });
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            {submissionDetails.title}
          </h1>
          <p className="text-gray-500 mt-2 text-center">
            {submissionDetails.description}
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Reference ID:</span>
            <span className="font-medium">{submissionDetails.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Submission Type:</span>
            <span className="font-medium capitalize">
              {submissionDetails.type} Request
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <p className="text-sm text-gray-500 text-center">
            We've sent a confirmation email with these details. Please save your
            reference ID for future communications.
          </p>

          <Link
            href="/"
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
