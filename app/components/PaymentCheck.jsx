"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentCheck({ requiredPlan }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if payment has been completed
    const paymentCompleted =
      localStorage.getItem("paymentCompleted") === "true";
    const paymentPlan = localStorage.getItem("paymentPlan");

    // Allow access if:
    // 1. Payment is completed AND (plan matches OR plan is "mock" which grants access to all)
    // 2. We're in development mode with mock payment
    const hasAccess =
      paymentCompleted &&
      (paymentPlan === requiredPlan || paymentPlan === "mock");

    if (!hasAccess) {
      // Redirect to pricing page if no valid payment
      alert(
        `You need to purchase the ${requiredPlan} plan before accessing this form.`
      );
      router.push("/pricing");
    } else {
      setLoading(false);
    }
  }, [requiredPlan, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="ml-3 text-lg font-medium text-gray-700">
          Verifying payment...
        </p>
      </div>
    );
  }

  return null; // Component doesn't render anything if payment is valid
}
