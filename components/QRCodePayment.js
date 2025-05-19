"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import payimage from "../public/699.jpg"; // Example image import, adjust as needed
import payimage2 from "../public/799.jpg"; // Example image import, adjust as needed
import payimage3 from "../public/1.jpg"; // Example image import, adjust as needed

export default function QRCodePayment({ plan, amount }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState({
    name: "",
    transactionId: "",
    date: new Date().toISOString().split("T")[0],
  });
  const router = useRouter();

  // QR code URLs - replace these with your actual QR code images
  const qrCodeUrls = {
    code: payimage,
    live: payimage2,
    mock: payimage3,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create payment record in database
      const paymentData = {
        plan: plan,
        status: "completed",
        amount: amount,
        paymentDate: new Date(transactionDetails.date).toISOString(),
        userName: transactionDetails.name,
        paymentMethod: "QR Code Payment",
        transactionId: transactionDetails.transactionId,
      };

      // Send data to API endpoint
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Failed to store payment data");
      }

      const result = await response.json();
      const paymentId = result.paymentId;

      // Store payment details in localStorage for client-side verification
      localStorage.setItem("paymentCompleted", "true");
      localStorage.setItem("paymentPlan", plan);
      localStorage.setItem("paymentId", paymentId);
      localStorage.setItem("paymentDate", new Date().toISOString());
      localStorage.setItem("paymentName", transactionDetails.name);
      localStorage.setItem("transactionId", transactionDetails.transactionId);

      // Redirect to payment confirmation page
      router.push(
        `/payment?paymentId=${paymentId}&plan=${plan}&success=true${
          result.duplicate ? "&duplicate=true" : ""
        }`
      );
    } catch (error) {
      console.error("Error saving payment:", error);
      alert("There was an error processing your payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {!showConfirmation ? (
        <div className="text-center">
          <div className="bg-white p-4 rounded-lg shadow-md inline-block mb-4">
            <Image
              src={qrCodeUrls[plan] || "/images/default-qr.png"}
              alt={`QR Code for ${plan} payment`}
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <p className="text-gray-600 mb-4">
            Scan the QR code above to make your payment of ${amount}
          </p>
          <button
            onClick={() => setShowConfirmation(true)}
            className="w-full bg-green-600 border border-transparent rounded-md py-3 text-sm font-semibold text-white text-center hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
          >
            I&apos;ve Made the Payment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={transactionDetails.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your full name"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="transactionId"
              className="block text-sm font-medium text-gray-700"
            >
              Transaction ID
            </label>
            <input
              type="text"
              id="transactionId"
              name="transactionId"
              required
              value={transactionDetails.transactionId}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your payment transaction ID"
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500">
              This should be the unique transaction ID from your payment receipt
            </p>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={transactionDetails.date}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 border border-transparent rounded-md py-3 text-sm font-semibold text-white text-center hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Confirm Payment"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
