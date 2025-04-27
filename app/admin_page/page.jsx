"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiCode,
  FiGlobe,
  FiSearch,
  FiFilter,
  FiEye,
  FiEdit,
  FiTrash2,
  FiLogOut,
  FiDownload,
  FiExternalLink,
} from "react-icons/fi";

// Mock admin credentials (in production, use proper authentication)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "shaswat",
};

// Removed mock data as we'll fetch from MongoDB

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from MongoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/submissions");
        if (!response.ok) {
          throw new Error("Failed to fetch submissions");
        }
        const data = await response.json();
        setSubmissions(data);
        setFilteredSubmissions(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setSelectedSubmission(null);
  };

  // Handle search and filter
  useEffect(() => {
    let results = submissions;

    // Apply search
    if (searchTerm) {
      results = results.filter(
        (sub) =>
          sub.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      results = results.filter((sub) => sub.status === filterStatus);
    }

    // Apply plan filter
    if (filterPlan !== "all") {
      results = results.filter((sub) => sub.planType === filterPlan);
    }

    setFilteredSubmissions(results);
  }, [searchTerm, filterStatus, filterPlan, submissions]);

  // View submission details
  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission);
  };

  // Delete submission
  const handleDeleteSubmission = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this submission? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch(`/api/submissions/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete submission");
        }

        const updatedSubmissions = submissions.filter((sub) => sub.id !== id);
        setSubmissions(updatedSubmissions);

        if (selectedSubmission && selectedSubmission.id === id) {
          setSelectedSubmission(null);
        }

        // Show success message
        alert("Submission deleted successfully!");
      } catch (error) {
        console.error("Error deleting submission:", error);
        alert("Failed to delete submission. Please try again.");
      }
    }
  };

  // Update submission status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/submissions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update submission status");
      }

      const updatedSubmission = await response.json();

      const updatedSubmissions = submissions.map((sub) => {
        if (sub.id === id) {
          return { ...sub, status: newStatus };
        }
        return sub;
      });

      setSubmissions(updatedSubmissions);

      if (selectedSubmission && selectedSubmission.id === id) {
        setSelectedSubmission({
          ...selectedSubmission,
          status: newStatus,
        });
      }

      // Show success message
      alert(`Status updated to "${newStatus}" successfully!`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Sign in to manage client submissions
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">BuildItWith.me</h1>

          <button
            onClick={handleLogout}
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <FiLogOut className="mr-1" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Submissions list */}
          <div className="lg:col-span-1 bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-lg">Client Submissions</h2>
            </div>

            {/* Search and filters */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex mb-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search by name, email, or ID..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              <div className="flex space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plan
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm"
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                  >
                    <option value="all">All Plans</option>
                    <option value="code">Code Only</option>
                    <option value="live">Live Website</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submissions list */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 240px)" }}
            >
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading submissions...</p>
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No submissions found</p>
                </div>
              ) : (
                filteredSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className={`p-4 border-b border-gray-200 hover:bg-blue-50 cursor-pointer ${
                      selectedSubmission &&
                      selectedSubmission.id === submission.id
                        ? "bg-blue-50"
                        : ""
                    }`}
                    onClick={() => handleViewSubmission(submission)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {submission.fullName}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          submission.planType === "code"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-indigo-100 text-indigo-800"
                        }`}
                      >
                        {submission.planType === "code"
                          ? "Code Only"
                          : "Live Website"}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <FiUser className="mr-1" />
                      <span>{submission.email}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span>Submitted: {submission.submittedAt}</span>
                      <span
                        className={`px-2 py-1 rounded-full ${
                          submission.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : submission.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {submission.status === "in-progress"
                          ? "In Progress"
                          : submission.status.charAt(0).toUpperCase() +
                            submission.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right column - Submission details */}
          <div className="lg:col-span-2 bg-white shadow-sm rounded-lg overflow-hidden">
            {selectedSubmission ? (
              <div>
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h2 className="font-semibold text-lg flex items-center">
                    {selectedSubmission.planType === "code" ? (
                      <>
                        <FiCode className="mr-2 text-gray-600" /> Code Only
                        Submission
                      </>
                    ) : (
                      <>
                        <FiGlobe className="mr-2 text-indigo-600" /> Live
                        Website Submission
                      </>
                    )}
                    <span className="ml-3 text-xs px-2 py-1 rounded-full bg-gray-200">
                      {selectedSubmission.id}
                    </span>
                  </h2>

                  {/* Add PDF download buttons */}
                  <div className="flex space-x-2">
                    {selectedSubmission.pdfUrl && (
                      <a
                        href={selectedSubmission.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-100 transition-colors"
                      >
                        <FiDownload className="mr-1" /> User PDF
                      </a>
                    )}

                    {selectedSubmission.adminPdfUrl && (
                      <a
                        href={selectedSubmission.adminPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-md hover:bg-indigo-100 transition-colors"
                      >
                        <FiDownload className="mr-1" /> Admin PDF
                      </a>
                    )}

                    {selectedSubmission.googleDriveUrl && (
                      <a
                        href={selectedSubmission.googleDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-1.5 bg-green-50 text-green-600 text-sm font-medium rounded-md hover:bg-green-100 transition-colors"
                      >
                        <FiExternalLink className="mr-1" /> Google Drive
                      </a>
                    )}
                  </div>

                  <div className="space-x-2 flex">
                    <select
                      className={`text-xs px-2 py-1 rounded border focus:outline-none ${
                        selectedSubmission.status === "completed"
                          ? "bg-green-100 text-green-800 border-green-300"
                          : selectedSubmission.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                          : "bg-blue-100 text-blue-800 border-blue-300"
                      }`}
                      value={selectedSubmission.status}
                      onChange={(e) =>
                        handleUpdateStatus(
                          selectedSubmission.id,
                          e.target.value
                        )
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>

                    <button
                      onClick={() =>
                        handleDeleteSubmission(selectedSubmission.id)
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-1">
                        Client Information
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-lg font-semibold mb-1">
                          {selectedSubmission.fullName}
                        </p>
                        <p className="text-gray-600 mb-3">
                          {selectedSubmission.email}
                        </p>

                        {selectedSubmission.details.title && (
                          <p className="mb-1">
                            <span className="font-medium">Title:</span>{" "}
                            {selectedSubmission.details.title}
                          </p>
                        )}

                        {selectedSubmission.details.jobProfile && (
                          <p className="mb-1">
                            <span className="font-medium">Job Profile:</span>{" "}
                            {selectedSubmission.details.jobProfile}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-1">
                        Project Details
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        {selectedSubmission.details.skills && (
                          <p className="mb-1">
                            <span className="font-medium">Skills:</span>{" "}
                            {selectedSubmission.details.skills}
                          </p>
                        )}

                        {selectedSubmission.details.githubProfile && (
                          <p className="mb-1">
                            <span className="font-medium">GitHub Profile:</span>{" "}
                            {selectedSubmission.details.githubProfile}
                          </p>
                        )}

                        {selectedSubmission.details.projectTimeline && (
                          <p className="mb-1">
                            <span className="font-medium">Timeline:</span>{" "}
                            {selectedSubmission.details.projectTimeline}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-1">
                        Design Preferences
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        {selectedSubmission.details.designPreferences && (
                          <p className="mb-1">
                            <span className="font-medium">Design Notes:</span>{" "}
                            {selectedSubmission.details.designPreferences}
                          </p>
                        )}

                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {selectedSubmission.details.colorScheme && (
                            <p className="text-sm">
                              <span className="font-medium">Color Scheme:</span>{" "}
                              {selectedSubmission.details.colorScheme}
                            </p>
                          )}

                          {selectedSubmission.details.fontFamily && (
                            <p className="text-sm">
                              <span className="font-medium">Font Family:</span>{" "}
                              {selectedSubmission.details.fontFamily}
                            </p>
                          )}

                          {selectedSubmission.details.layoutStyle && (
                            <p className="text-sm">
                              <span className="font-medium">Layout:</span>{" "}
                              {selectedSubmission.details.layoutStyle}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-1">
                        Features
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm">
                            <span className="font-medium">Contact Form:</span>
                            {selectedSubmission.details.contactFormNeeded
                              ? "Yes"
                              : "No"}
                          </p>

                          <p className="text-sm">
                            <span className="font-medium">Blog Section:</span>
                            {selectedSubmission.details.blogSection
                              ? "Yes"
                              : "No"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information Section */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-1">
                      Payment Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      {selectedSubmission.paymentId ? (
                        <>
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <p>
                              <span className="font-medium">Payment ID:</span>{" "}
                              <span className="font-mono">
                                {selectedSubmission.paymentId}
                              </span>
                            </p>
                            <p>
                              <span className="font-medium">Status:</span>{" "}
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs ${
                                  selectedSubmission.paymentId &&
                                  !selectedSubmission.paymentId.includes(
                                    "UNPAID"
                                  ) &&
                                  !selectedSubmission.paymentId.includes(
                                    "TESTING"
                                  )
                                    ? "bg-green-100 text-green-800"
                                    : selectedSubmission.paymentId &&
                                      selectedSubmission.paymentId.includes(
                                        "TESTING"
                                      )
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {selectedSubmission.paymentId &&
                                !selectedSubmission.paymentId.includes(
                                  "UNPAID"
                                ) &&
                                !selectedSubmission.paymentId.includes(
                                  "TESTING"
                                )
                                  ? "COMPLETED"
                                  : selectedSubmission.paymentId &&
                                    selectedSubmission.paymentId.includes(
                                      "TESTING"
                                    )
                                  ? "TEST PAYMENT"
                                  : "UNPAID"}
                              </span>
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {selectedSubmission.planType && (
                              <p>
                                <span className="font-medium">Plan Type:</span>{" "}
                                {selectedSubmission.planType === "code"
                                  ? "Code Only ($699)"
                                  : "Live Website ($799)"}
                              </p>
                            )}
                            {selectedSubmission.paymentDate && (
                              <p>
                                <span className="font-medium">
                                  Payment Date:
                                </span>{" "}
                                {new Date(
                                  selectedSubmission.paymentDate
                                ).toLocaleDateString()}
                              </p>
                            )}
                            {selectedSubmission.paymentName && (
                              <p>
                                <span className="font-medium">
                                  Customer Name:
                                </span>{" "}
                                {selectedSubmission.paymentName}
                              </p>
                            )}
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-500 italic">
                          No payment information available
                        </p>
                      )}
                    </div>
                  </div>

                  {selectedSubmission.planType === "live" && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-600 mb-1">
                        Account Information
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        {selectedSubmission.details.githubUsername && (
                          <p className="mb-1">
                            <span className="font-medium">
                              GitHub Username:
                            </span>{" "}
                            {selectedSubmission.details.githubUsername}
                          </p>
                        )}

                        {/* GitHub password and Vercel credentials are sensitive and shouldn't be displayed in plaintext */}
                        <p className="mb-1">
                          <span className="font-medium">GitHub Password:</span>{" "}
                          <span className="text-gray-500 italic">
                            [hidden for security]
                          </span>
                        </p>

                        {selectedSubmission.details.vercelId && (
                          <p className="mb-1">
                            <span className="font-medium">Vercel ID:</span>{" "}
                            {selectedSubmission.details.vercelId}
                          </p>
                        )}

                        <p className="mb-1">
                          <span className="font-medium">Vercel Password:</span>{" "}
                          <span className="text-gray-500 italic">
                            [hidden for security]
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">
                      Actions
                    </h3>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                        Send Email to Client
                      </button>
                      <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm font-medium">
                        Export Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8 text-center">
                <div className="max-w-md">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    No submission selected
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Click on a submission from the list to view details
                  </p>

                  <div className="flex justify-center space-x-4 text-gray-400">
                    <FiCode size={32} />
                    <FiGlobe size={32} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
