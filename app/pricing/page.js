"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const router = useRouter();

  // Handler for PayPal script loaded
  const handlePayPalLoad = () => {
    setPaypalLoaded(true);
  };

  // Show payment required modal
  const handleSkipAttempt = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowPaymentModal(false);
  };

  // Initialize PayPal buttons when SDK is loaded
  useEffect(() => {
    if (paypalLoaded && typeof window.paypal !== "undefined") {
      // Code Only Button
      window.paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "black",
            layout: "vertical",
            label: "pay",
          },
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  description: "Code Only Portfolio Website",
                  amount: {
                    currency_code: "USD",
                    value: 8.5, // Updated price from 0.059 to 8.50
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (orderData) {
              // Redirect to payment confirmation page
              router.push(
                `/payment?paymentId=${orderData.id}&plan=code&success=true`
              );
            });
          },
          onError: function (err) {
            console.error("PayPal payment failed", err);
            router.push("/payment?success=false");
          },
        })
        .render("#paypal-button-code");

      // Live Website Button
      window.paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "blue",
            layout: "vertical",
            label: "pay",
          },
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  description: "Live Website Portfolio Package",
                  amount: {
                    currency_code: "USD",
                    value: 10.0, // Keeping the $10.00 price as requested
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (orderData) {
              // Redirect to payment confirmation page
              router.push(
                `/payment?paymentId=${orderData.id}&plan=live&success=true`
              );
            });
          },
          onError: function (err) {
            console.error("PayPal payment failed", err);
            router.push("/payment?success=false");
          },
        })
        .render("#paypal-button-live");

      // Mock Payment Button ($1)
      window.paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "silver",
            layout: "vertical",
            label: "pay",
          },
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  description: "Mock Payment (Test Only)",
                  amount: {
                    currency_code: "USD",
                    value: 1.0,
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (orderData) {
              // Store type as "mock" but enable both code and live features
              router.push(
                `/payment?paymentId=${orderData.id}&plan=mock&success=true`
              );
            });
          },
          onError: function (err) {
            console.error("PayPal payment failed", err);
            router.push("/payment?success=false");
          },
        })
        .render("#paypal-button-mock");
    }
  }, [paypalLoaded, router]);

  return (
    <main>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=AZtoWMjoWGXqp3LxKr6fKM3dhdRjLObOxqFsNPuZ0sD8hK-y4nENJ9AiYKiOLsf3g9OSOplnPDKKlck-&currency=USD`}
        onLoad={handlePayPalLoad}
      />
      <Navbar />

      {/* Payment Required Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-red-100 p-2 mr-3">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Payment Required
              </h3>
            </div>

            <p className="text-gray-600 mb-4">
              To proceed with the{" "}
              {selectedPlan === "code" ? "Code Only" : "Live Website"} option,
              payment is required. This helps us provide quality service and
              support.
            </p>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  closeModal();
                  document
                    .getElementById(
                      selectedPlan === "code"
                        ? "paypal-button-code"
                        : "paypal-button-live"
                    )
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
            >
              Choose Your Plan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
            >
              Select the option that works best for your needs
            </motion.p>
          </div>

          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
            {/* Option 1: Code Only */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="p-6">
                <h2 className="text-2xl leading-6 font-semibold text-gray-900 flex items-center">
                  <span className="mr-2 bg-gray-100 p-2 rounded-full">💼</span>{" "}
                  Option 1: Code Only
                </h2>
                <p className="mt-4 text-base text-gray-500">
                  Perfect for developers or students who just want the files
                </p>
                <p className="mt-8 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">
                    $8.50
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">
                    one-time
                  </span>
                </p>

                {/* PayPal Button Container */}
                <div id="paypal-button-code" className="mt-8"></div>

                <button
                  onClick={() => handleSkipAttempt("code")}
                  className="mt-4 block w-full bg-gray-800 border border-gray-800 rounded-md py-3 text-sm font-semibold text-white text-center hover:bg-gray-900 transition-colors shadow-md hover:shadow-lg"
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
                    <span className="text-green-500 text-lg bg-green-50 p-1 rounded-full">
                      ✅
                    </span>
                    <span className="text-base text-gray-500">
                      Custom portfolio website (based on your info)
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-green-500 text-lg bg-green-50 p-1 rounded-full">
                      ✅
                    </span>
                    <span className="text-base text-gray-500">
                      Full source code in ZIP or GitHub
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-red-500 text-lg bg-red-50 p-1 rounded-full">
                      ❌
                    </span>
                    <span className="text-base text-gray-500">
                      No live deployment
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-blue-500 text-lg bg-blue-50 p-1 rounded-full">
                      📦
                    </span>
                    <span className="text-base text-gray-500">
                      Delivered within 3–4 days
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Option 2: Live Website */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="border border-gray-200 rounded-lg shadow-lg divide-y divide-gray-200 bg-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ring-2 ring-indigo-500 relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                  Most Popular
                </span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl leading-6 font-semibold text-gray-900 flex items-center">
                  <span className="mr-2 bg-indigo-100 p-2 rounded-full">
                    🚀
                  </span>{" "}
                  Option 2: Live Website
                </h2>
                <p className="mt-4 text-base text-gray-500">
                  Hassle-free—just fill the form and get your website online!
                </p>
                <p className="mt-8 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">
                    $10.00
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">
                    one-time
                  </span>
                </p>

                {/* PayPal Button Container */}
                <div id="paypal-button-live" className="mt-8"></div>

                <button
                  onClick={() => handleSkipAttempt("live")}
                  className="mt-4 block w-full bg-indigo-600 border border-transparent rounded-md py-3 text-sm font-semibold text-white text-center hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
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
                    <span className="text-green-500 text-lg bg-green-50 p-1 rounded-full">
                      ✅
                    </span>
                    <span className="text-base text-gray-500">
                      Everything in Option 1
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-green-500 text-lg bg-green-50 p-1 rounded-full">
                      ✅
                    </span>
                    <span className="text-base text-gray-500">
                      Deployed live on Vercel
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-green-500 text-lg bg-green-50 p-1 rounded-full">
                      ✅
                    </span>
                    <span className="text-base text-gray-500">
                      Connected to your GitHub (you own it)
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-green-500 text-lg bg-green-50 p-1 rounded-full">
                      ✅
                    </span>
                    <span className="text-base text-gray-500">
                      Ready-to-share website link
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-blue-500 text-lg bg-blue-50 p-1 rounded-full">
                      🌐
                    </span>
                    <span className="text-base text-gray-500">
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
                Mock payment for testing ($1)
              </p>
            </div>

            {/* PayPal Mock Button Container */}
            <div id="paypal-button-mock" className="mt-4"></div>

            <p className="text-xs text-gray-400 mt-3 text-center">
              This option is for development testing only
            </p>
          </motion.div>

          {/* Feature comparison table */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-16 bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-center text-gray-900 mb-8">
                Detailed Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Feature
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Option 1: Code Only
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Option 2: Live Website
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Custom design
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        ✅
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        ✅
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Source code
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        ✅
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        ✅
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Live deployment
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        ❌
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        ✅
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        GitHub integration
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        Optional
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        ✅
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Custom domain setup
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        ❌
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        ✅
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Post-delivery support
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        7 days
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        14 days
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-16 bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-2xl font-medium text-center text-gray-900 mb-8">
                Frequently Asked Questions
              </h3>
              <div className="space-y-6">
                {[
                  {
                    question: "How long does it take to get my website?",
                    answer:
                      "Most websites are delivered within 3-4 business days after receiving all your information and requirements.",
                  },
                  {
                    question: "Is this a one-time payment?",
                    answer:
                      "Yes, all our plans are one-time payments. There are no recurring subscription fees.",
                  },
                  {
                    question: "Can I request revisions?",
                    answer:
                      "Yes, both plans include 2 rounds of revisions to ensure you're completely satisfied with your website.",
                  },
                  {
                    question: "What technologies do you use?",
                    answer:
                      "We build modern websites using Next.js, React, Tailwind CSS, and other cutting-edge technologies for optimal performance.",
                  },
                  {
                    question:
                      "Do I need technical knowledge to maintain the site?",
                    answer:
                      "Not at all! With Option 2, we'll set everything up for you. Basic updates can be done through GitHub's interface with no coding required.",
                  },
                  {
                    question: "Can I upgrade from Option 1 to Option 2 later?",
                    answer:
                      "Yes! You can upgrade to the Live Website option later for a small additional fee. Just contact us when you're ready.",
                  },
                  {
                    question: "What if I already have a domain name?",
                    answer:
                      "No problem! With Option 2, we'll help you connect your existing domain to your new website at no extra charge.",
                  },
                  {
                    question: "Do you provide SEO optimization?",
                    answer:
                      "Yes, all our websites are built with SEO best practices in mind, including metadata, semantic HTML, and performance optimizations.",
                  },
                  {
                    question: "What happens after my support period ends?",
                    answer:
                      "You can purchase additional support time as needed. We also offer maintenance packages for clients who want ongoing support.",
                  },
                ].map((faq, index) => (
                  <FAQ
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-10 text-center"
          >
            <p className="text-base text-gray-500">
              Have questions? Feel free to{" "}
              <Link
                href="/contact"
                className="font-medium text-indigo-600 hover:text-indigo-500 underline"
              >
                contact us
              </Link>
              .
            </p>

            {/* Call to action */}
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Get Started Today
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

// FAQ Component
function FAQ({ question, answer }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={`border-b border-gray-200 pb-4 ${isOpen ? "" : "pb-2"}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left focus:outline-none group"
      >
        <h4 className="text-lg font-medium text-indigo-600 group-hover:text-indigo-800 transition-colors">
          {question}
        </h4>
        <span
          className={`ml-4 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5 text-indigo-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p
          className={`mt-2 text-base text-gray-500 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {answer}
        </p>
      </motion.div>
    </div>
  );
}
