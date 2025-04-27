"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentCheck({ requiredPlan }) {
  const [loading, setLoading] = useState(true);
  const [paymentValid, setPaymentValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check payment status from localStorage
    const checkPayment = () => {
      const paymentCompleted =
        localStorage.getItem("paymentCompleted") === "true";
      const paymentPlan = localStorage.getItem("paymentPlan");
      const paymentId = localStorage.getItem("paymentId");
      const paymentDate = localStorage.getItem("paymentDate");

      // Payment is valid if:
      // 1. Payment is marked as completed AND
      // 2. Payment plan matches the required plan AND
      // 3. Payment ID exists AND
      // 4. Payment date exists and is less than 7 days old (prevent very old payments)

      let dateValid = true;
      if (paymentDate) {
        const paymentTime = new Date(paymentDate).getTime();
        const currentTime = new Date().getTime();
        const daysDiff = (currentTime - paymentTime) / (1000 * 60 * 60 * 24);
        dateValid = daysDiff < 7; // Payment valid for 7 days
      }

      const isValid =
        paymentCompleted &&
        paymentPlan === requiredPlan &&
        paymentId &&
        dateValid;
      setPaymentValid(isValid);
      setLoading(false);
    };

    // Check after a brief timeout to let component mount properly
    const timer = setTimeout(checkPayment, 500);
    return () => clearTimeout(timer);
  }, [requiredPlan]);

  // If payment is invalid and done loading, redirect to pricing
  useEffect(() => {
    if (!loading && !paymentValid) {
      router.push("/pricing");
    }
  }, [loading, paymentValid, router]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
        <div className="text-center p-6 max-w-sm mx-auto">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Verifying Payment
          </h2>
          <p className="text-gray-600">
            Please wait while we check your payment status...
          </p>
        </div>
      </div>
    );
  }

  return null; // If payment is valid, don't render anything
}
