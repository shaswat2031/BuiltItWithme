"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentCheck({ requiredPlan }) {
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationError, setVerificationError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get payment ID from URL parameters or sessionStorage
        const paymentId =
          searchParams.get("paymentId") || sessionStorage.getItem("paymentId");

        if (!paymentId) {
          throw new Error("No payment ID found");
        }

        // Verify payment with the server
        const response = await fetch(
          `/api/payments/verify?id=${paymentId}&plan=${requiredPlan}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Payment verification failed");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error("Invalid payment for this resource");
        }

        // Store payment ID in session storage for future use
        sessionStorage.setItem("paymentId", paymentId);
        sessionStorage.setItem("paymentPlan", data.paymentDetails.plan);

        // If payment is verified, allow access
        setIsVerifying(false);
      } catch (error) {
        console.error("Payment verification error:", error);
        setVerificationError(error.message);

        // Redirect to pricing after a short delay
        setTimeout(() => {
          router.push("/pricing");
        }, 2000);
      }
    };

    verifyPayment();
  }, [requiredPlan, router, searchParams]);

  if (isVerifying) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
        <div className="text-center p-6 max-w-sm mx-auto">
          {verificationError ? (
            <>
              <div className="text-red-500 mb-4">
                <svg
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Payment Verification Failed
              </h2>
              <p className="text-gray-500 mb-4">{verificationError}</p>
              <p className="text-gray-500">Redirecting to payment page...</p>
            </>
          ) : (
            <>
              <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Verifying Payment
              </h2>
              <p className="text-gray-500">
                Please wait while we verify your payment...
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  // Return null if verification is complete
  return null;
}
