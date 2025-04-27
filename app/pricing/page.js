"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import QRCodePayment from "../../components/QRCodePayment";

export default function PricingPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const router = useRouter();

  // Show payment required modal
  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);

    // Set the amount based on the selected plan
    if (plan === "code") {
      setSelectedAmount(699);
    } else if (plan === "live") {
      setSelectedAmount(799);
    } else if (plan === "mock") {
      setSelectedAmount(1);
    }

    setShowPaymentModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowPaymentModal(false);
  };

  // Handle manual payment process for testing
  const handleManualPayment = (plan) => {
    const tempPaymentId = `MANUAL-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;
    localStorage.setItem("paymentCompleted", "true");
    localStorage.setItem("paymentId", tempPaymentId);
    localStorage.setItem("paymentPlan", plan);
    localStorage.setItem("paymentDate", new Date().toISOString());
    localStorage.setItem("paymentName", "Test User");
    router.push(
      `/payment?paymentId=${tempPaymentId}&plan=${plan}&success=true`
    );
  };

  return (
    <main>
      <Navbar />

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Payment for{" "}
                {selectedPlan === "code"
                  ? "Code Only"
                  : selectedPlan === "live"
                  ? "Live Website"
                  : "Mock Test"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <QRCodePayment plan={selectedPlan} amount={selectedAmount} />
          </div>
        </div>
      )}

      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Choose the option that works best for your needs
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12 lg:max-w-4xl mx-auto">
            {/* Code Only Option */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="px-6 py-8">
                <h2 className="text-2xl leading-6 font-semibold text-gray-900 flex items-center">
                  <span className="mr-2 bg-gray-100 p-2 rounded-full">💼</span>{" "}
                  Option 1: Code Only
                </h2>
                <p className="mt-4 text-base text-gray-500">
                  Perfect for developers or students who just want the files
                </p>
                <p className="mt-8 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ₹699
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">
                    one-time
                  </span>
                </p>

                <button
                  onClick={() => handleChoosePlan("code")}
                  className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-3 text-sm font-semibold text-white text-center hover:bg-gray-900 transition-colors shadow-md hover:shadow-lg"
                >
                  Choose This Plan
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                  What&apos;s included
                </h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base text-gray-700">
                      Full HTML, CSS, JS code
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base text-gray-700">
                      Self-host or deploy yourself
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base text-gray-700">
                      Basic customization guide
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Live Website Option */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden border-blue-500 border-2"
            >
              <div className="px-6 py-8">
                <h2 className="text-2xl leading-6 font-semibold text-gray-900 flex items-center">
                  <span className="mr-2 bg-blue-100 p-2 rounded-full">🚀</span>{" "}
                  Option 2: Live Website
                </h2>
                <p className="mt-4 text-base text-gray-500">
                  Full-service solution with live deployment and support
                </p>
                <p className="mt-8 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ₹799
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">
                    one-time
                  </span>
                </p>

                <button
                  onClick={() => handleChoosePlan("live")}
                  className="mt-8 block w-full bg-blue-600 border border-blue-600 rounded-md py-3 text-sm font-semibold text-white text-center hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Choose This Plan
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                  What&apos;s included
                </h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base text-gray-700">
                      Everything in Code Only plan
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base text-gray-700">
                      We deploy it for you
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base text-gray-700">
                      Your site is LIVE in 3–4 days
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Mock Payment Option (Development Only) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-12 max-w-md mx-auto border border-gray-300 rounded-lg p-6 bg-gray-50"
          >
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium text-gray-700 flex items-center justify-center">
                <span className="mr-2 bg-gray-200 p-1 rounded-full text-sm">
                  💻
                </span>
                Development Testing
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Mock payment for testing (₹1)
              </p>
            </div>

            <button
              onClick={() => handleChoosePlan("mock")}
              className="w-full bg-gray-600 border border-transparent rounded-md py-3 text-sm font-semibold text-white text-center hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
            >
              Test Payment (₹1.00)
            </button>

            <button
              onClick={() => handleManualPayment("mock")}
              className="mt-4 w-full bg-green-600 border border-transparent rounded-md py-3 text-sm font-semibold text-white text-center hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
            >
              Test Access (Skip Payment)
            </button>

            <p className="text-xs text-gray-400 mt-3 text-center">
              This option is for development testing only
            </p>
          </motion.div>

          {/* Feature comparison table */}
          {/* ...existing code... */}
        </div>
      </div>
    </main>
  );
}
