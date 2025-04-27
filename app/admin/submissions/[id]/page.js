"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function SubmissionDetailsPage() {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        // Replace with your actual API endpoint for fetching a submission
        const response = await fetch(`/api/submissions/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch submission");
        }
        const data = await response.json();
        setSubmission(data);
      } catch (error) {
        console.error("Error fetching submission:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSubmission();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-600">
          Submission Not Found
        </h1>
        <p className="mt-2 text-gray-600">
          The submission with ID {id} could not be found.
        </p>
        <Link
          href="/admin/submissions"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Submissions
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Submission Details
          </h1>
          <Link
            href="/admin/submissions"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Back to List
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header with ID and Status */}
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Submission #{submission.id}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Submitted on{" "}
                  {new Date(submission.submittedAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  submission.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : submission.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {submission.status.charAt(0).toUpperCase() +
                  submission.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Payment Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Plan Type
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {submission.planType === "code"
                      ? "Code Only"
                      : submission.planType === "live"
                      ? "Live Website"
                      : submission.planType}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Customer Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {submission.paymentName || "Not provided"}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Transaction ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {submission.paymentId || "Not available"}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Payment Date
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {submission.paymentDate
                      ? new Date(submission.paymentDate).toLocaleDateString()
                      : "Not available"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Other submission details would follow here */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
}
