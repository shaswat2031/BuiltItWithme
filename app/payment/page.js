"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("processing");
  const [paymentDetails, setPaymentDetails] = useState({});

  useEffect(() => {
    const success = searchParams.get("success") === "true";
    const paymentId = searchParams.get("paymentId");
    const plan = searchParams.get("plan");

    if (success && paymentId) {
      // Save payment info to localStorage
      localStorage.setItem("paymentCompleted", "true");
      localStorage.setItem("paymentId", paymentId);
      localStorage.setItem("paymentPlan", plan);
      localStorage.setItem("paymentDate", new Date().toISOString());

      setPaymentDetails({
        id: paymentId,
        plan: plan,
        date: new Date().toLocaleString(),
      });

      setStatus("success");
    } else {
      setStatus("failed");
    }
  }, [searchParams]);

  const getNextStepLink = () => {
    const plan = searchParams.get("plan");

    if (plan === "code") {
      return "/formscode";
    } else if (plan === "live") {
      return "/formslive";
    } else if (plan === "mock") {
      // For mock payment, show both options
      return null;
    }
    return "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {status === "processing" && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-lg font-medium text-gray-700">
                Processing payment...
              </p>
            </div>
          )}

          {status === "success" && (
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Payment Successful!
                </h3>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Thank you for your purchase. Your payment has been processed
                    successfully.
                  </p>
                  <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 bg-gray-50 p-4 rounded-md">
                    <div className="px-4 py-2">
                      <dt className="text-xs font-medium text-gray-500 truncate">
                        Payment ID
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-gray-900">
                        {paymentDetails.id}
                      </dd>
                    </div>
                    <div className="px-4 py-2">
                      <dt className="text-xs font-medium text-gray-500 truncate">
                        Plan
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-indigo-600">
                        {paymentDetails.plan === "mock"
                          ? "Mock Payment (Test)"
                          : paymentDetails.plan === "code"
                          ? "Code Only"
                          : "Live Website"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="mt-6">
                {paymentDetails.plan === "mock" ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link
                      href="/formscode"
                      className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Code Only Form
                    </Link>
                    <Link
                      href="/formslive"
                      className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Live Website Form
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={getNextStepLink()}
                    className="inline-flex justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Continue to Form
                  </Link>
                )}
              </div>
            </div>
          )}

          {status === "failed" && (
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Payment Failed
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    There was an issue processing your payment. Please try
                    again.
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    href="/pricing"
                    className="inline-flex justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Return to Pricing
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
