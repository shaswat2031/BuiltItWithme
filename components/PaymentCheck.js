"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentCheck({ requiredPlan }) {
  const [isVerifying, setIsVerifying] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if payment has been completed
    const paymentCompleted =
      localStorage.getItem("paymentCompleted") === "true";
    const paymentPlan = localStorage.getItem("paymentPlan");
    const paymentId = localStorage.getItem("paymentId");

    // Check if the payment plan matches the required plan
    // Allow "test" plan to access both code and live forms for testing purposes
    const hasPaidForPlan =
      paymentPlan === requiredPlan ||
      (paymentPlan === "test" &&
        (requiredPlan === "code" || requiredPlan === "live"));

    if (!paymentCompleted || !hasPaidForPlan || !paymentId) {
      // If payment is not completed or doesn't match the required plan, redirect to pricing
      router.push("/pricing");
    } else {
      // Otherwise, allow access to the form
      setIsVerifying(false);
    }
  }, [requiredPlan, router]);

  if (isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Verifying Payment
          </h2>
          <p className="text-gray-500">
            Please wait while we verify your payment...
          </p>
        </div>
      </div>
    );
  }

  // Return null if verification is complete
  return null;
}
