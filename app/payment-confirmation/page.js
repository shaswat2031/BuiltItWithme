"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function PaymentConfirmation() {
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState({
    transactionId: "",
    amount: "",
    date: "",
    plan: "",
    status: "processing",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPaymentData() {
      try {
        // Get payment ID from URL parameters
        const paymentId = searchParams.get("paymentId");

        if (!paymentId) {
          setError("No payment ID found");
          setIsLoading(false);
          return;
        }

        // Fetch payment details from the server
        const response = await fetch(`/api/payments/details?id=${paymentId}`);

        if (!response.ok) {
          throw new Error("Failed to load payment details");
        }

        const data = await response.json();

        // Set payment details from API response
        setPaymentDetails({
          transactionId:
            data.transactionId || "TXN-" + paymentId.substring(0, 8),
          amount: data.amount ? `₹${data.amount}` : "₹699",
          date: new Date(data.paymentDate || Date.now()).toLocaleString(),
          plan: data.plan || "code",
          status: "success",
        });
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setError("Could not load payment information");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPaymentData();
  }, [searchParams]);

  // Determine which form to link to based on the plan
  const getFormLink = () => {
    const plan = paymentDetails.plan.toLowerCase();
    if (plan === "code") return "/formscode";
    if (plan === "live") return "/formslive";
    return "/";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
            <p className="text-gray-500 mt-2 text-center">
              We're retrieving your payment details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-500"
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
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Payment Verification Failed
            </h1>
            <p className="text-gray-500 mt-2 text-center">{error}</p>
          </div>

          <div className="flex flex-col">
            <Link
              href="/pricing"
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Return to Pricing
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-gray-800">
            Payment Successful!
          </h1>
          <p className="text-gray-500 mt-2 text-center">
            Your payment has been processed successfully.
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-medium">{paymentDetails.transactionId}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">{paymentDetails.amount}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Plan:</span>
            <span className="font-medium capitalize">
              {paymentDetails.plan} Package
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{paymentDetails.date}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <p className="text-sm text-gray-500 text-center">
            A confirmation email has been sent to your registered email address.
          </p>

          <Link
            href="/"
            className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Return to Home
          </Link>

          <Link
            href={getFormLink()}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150"
          >
            Continue to Form
          </Link>
        </div>
      </div>
    </div>
  );
}
