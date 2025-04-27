"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import payimage from "../public/699.jpg"; // Example image import, adjust as needed
import payimage2 from "../public/799.jpg"; // Example image import, adjust as needed
import payimage3 from "../public/1.jpg"; // Example image import, adjust as needed

export default function QRCodePayment({ plan, amount }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store payment details in localStorage
    localStorage.setItem("paymentCompleted", "true");
    localStorage.setItem("paymentPlan", plan);
    localStorage.setItem("paymentId", transactionDetails.transactionId);
    localStorage.setItem("paymentDate", new Date().toISOString());
    localStorage.setItem("paymentName", transactionDetails.name);

    // Redirect to payment confirmation page
    router.push(
      `/payment?paymentId=${transactionDetails.transactionId}&plan=${plan}&success=true`
    );
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
            />
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
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 border border-transparent rounded-md py-3 text-sm font-semibold text-white text-center hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
          >
            Confirm Payment
          </button>
        </form>
      )}
    </div>
  );
}
