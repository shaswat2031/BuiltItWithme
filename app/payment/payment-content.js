"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentContent() {
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

      // Auto-redirect after 3 seconds
      const timer = setTimeout(() => {
        if (plan === "code") {
          router.push("/formscode");
        } else if (plan === "live") {
          router.push("/formslive");
        } else if (plan === "mock") {
          // Don't auto-redirect for mock payments
        }
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setStatus("failed");
    }
  }, [searchParams, router]);

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
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Payment Processing
        </h2>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {status === "processing" && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Processing Payment
              </h3>
              <p className="text-sm text-gray-600">
                Please wait while we confirm your payment status...
              </p>
            </div>
          )}

          {status === "success" && (
            <div>
              <div className="flex items-center justify-center mb-4">
                <div className="h-12 w-12 text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
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
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center mb-4">
                Payment Successful
              </h3>

              {paymentDetails && (
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <dl className="grid grid-cols-1 gap-y-3">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Plan
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {paymentDetails.plan === "code"
                          ? "Code Only"
                          : paymentDetails.plan === "mock"
                          ? "Mock Payment (Test)"
                          : "Live Website"}
                      </dd>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Payment ID
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {paymentDetails.id}
                      </dd>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {paymentDetails.date}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}

              <p className="text-sm text-gray-600 mb-6 text-center">
                Thank you for your purchase! You will be automatically
                redirected to the form in a moment...
              </p>

              <div className="mt-4">
                {paymentDetails.plan === "mock" ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link
                      href="/formscode"
                      className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Code Only Form
                    </Link>
                    <Link
                      href="/formslive"
                      className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Live Website Form
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={getNextStepLink()}
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Continue to Form
                  </Link>
                )}
              </div>
            </div>
          )}

          {status === "failed" && (
            <div>
              <div className="flex items-center justify-center mb-4">
                <div className="h-12 w-12 text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
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
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center mb-4">
                Payment Failed
              </h3>
              <p className="text-sm text-gray-600 mb-6 text-center">
                There was an issue processing your payment. Please try again.
              </p>
              <div className="mt-4">
                <Link
                  href="/pricing"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Return to Pricing Page
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
