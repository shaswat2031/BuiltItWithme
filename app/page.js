import Image from "next/image";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { MotionDiv, MotionButton } from "./components/MotionWrapper";
import hero1 from "../public/hero1.png";

import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-700 text-white py-24 px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-300"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-purple-400"></div>
        </div>

        <div className="container mx-auto flex flex-col md:flex-row items-center relative z-10">
          <MotionDiv
            className="md:w-1/2 text-center md:text-left mb-10 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-purple-800 bg-opacity-50 rounded-full px-4 py-1 text-sm mb-4 backdrop-blur-sm border border-purple-500 border-opacity-30">
              Limited Time Offer: Professional Websites At Affordable Rates
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                Developed by Us. Defined as A Brand
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 font-light">
              Beautiful, responsive websites custom-built for your brand
              starting at just
              <span className="font-bold text-white ml-2 text-2xl md:text-3xl">
                ₹2500
              </span>
              .<br />
              <span className="relative inline-block font-bold mx-2 px-2">
                Your vision, our expertise
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-yellow-500"></span>
              </span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link href="/pricing">
                <MotionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-indigo-600 hover:bg-opacity-90 px-8 py-4 rounded-xl font-bold transition shadow-lg hover:shadow-xl"
                >
                  Get Started →
                </MotionButton>
              </Link>
            </div>
          </MotionDiv>

          <MotionDiv
            className="md:w-1/2 md:pl-10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-full h-full bg-gradient-to-br from-pink-500 to-yellow-500 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-gray-900 rounded-2xl p-4 shadow-2xl border border-gray-700">
                <Image
                  src={hero1}
                  alt="Website design preview"
                  width={600}
                  height={400}
                  className="mx-auto rounded-lg"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 bg-white text-gray-800 rounded-full p-3 shadow-lg">
                  <span className="text-sm font-bold">Live in 3-4 days!</span>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>

        {/* Wave SVG at bottom of hero section */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            className="fill-current text-white"
          >
            <path d="M0,64L80,69.3C160,75,320,85,480,85.3C640,85,800,75,960,69.3C1120,64,1280,64,1360,64L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
              Our Advantages
            </span>
            <h2 className="text-4xl font-extrabold mt-4 mb-2">
              Why Choose Us?
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              {
                icon: "💰",
                title: "Budget-Friendly",
                desc: "High-quality websites starting at just ₹2,500",
              },
              {
                icon: "⚡",
                title: "Quick Delivery",
                desc: "Your complete website ready in just 3-4 business days",
              },
              {
                icon: "🎨",
                title: "Unique Design",
                desc: "Custom-built to perfectly represent your brand identity",
              },
              {
                icon: "🚀",
                title: "Easy Hosting",
                desc: "We handle deployment with free Vercel hosting included",
              },
              {
                icon: "🌟",
                title: "Small Business Focus",
                desc: "Specifically designed for creators and entrepreneurs",
              },
              {
                icon: "🔒",
                title: "100% Ownership",
                desc: "You own the code and domain with full control",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-5 bg-blue-50 inline-block p-4 rounded-full">
                  {item.icon}
                </div>
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-medium">
              All Inclusive
            </span>
            <h2 className="text-4xl font-extrabold mt-4 mb-2">What You Get</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-blue-500 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100"
            >
              {/* Basic Package */}
              <div className="mb-8 pb-2 border-b border-gray-100">
                <h3 className="text-xl font-bold text-blue-600 mb-4">
                  Basic Package (₹2,500)
                </h3>
                <ul className="space-y-4">
                  {[
                    {
                      icon: "✨",
                      text: "One-page professional website with modern design",
                      highlight: "Included",
                    },
                    {
                      icon: "📱",
                      text: "Fully responsive design for all devices (mobile, tablet & desktop)",
                      highlight: "Mobile-friendly",
                    },
                    {
                      icon: "🔍",
                      text: "Up to 5 custom content sections tailored to your needs",
                      highlight: "Personalized",
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-lg">
                      <span className="text-2xl bg-blue-50 p-2 rounded-lg">
                        {item.icon}
                      </span>
                      <div>
                        <span className="text-gray-800">{item.text}</span>
                        {item.highlight && (
                          <span className="ml-2 text-sm font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {item.highlight}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hosting & Technical */}
              <div className="mb-8 pb-2 border-b border-gray-100">
                <h3 className="text-xl font-bold text-blue-600 mb-4">
                  Hosting & Technical
                </h3>
                <ul className="space-y-4">
                  {[
                    {
                      icon: "🚀",
                      text: "Free deployment to GitHub + Vercel",
                      highlight: "No hosting fees",
                    },
                    {
                      icon: "⚡",
                      text: "Lightning-fast performance with next-gen optimization",
                      highlight: "SEO-friendly",
                    },
                    {
                      icon: "🔒",
                      text: "HTTPS security and basic SEO setup",
                      highlight: "Secure",
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-lg">
                      <span className="text-2xl bg-blue-50 p-2 rounded-lg">
                        {item.icon}
                      </span>
                      <div>
                        <span className="text-gray-800">{item.text}</span>
                        {item.highlight && (
                          <span className="ml-2 text-sm font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {item.highlight}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add-ons */}
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">
                  Optional Add-ons
                </h3>
                <ul className="space-y-4">
                  {[
                    {
                      icon: "💻",
                      text: "Full source code access (₹699)",
                      highlight: "Developer option",
                    },
                    {
                      icon: "🛠️",
                      text: "Complete setup with domain & email configuration (₹799)",
                      highlight: "Hassle-free",
                    },
                    {
                      icon: "🔄",
                      text: "Free revisions within first 7 days of delivery",
                      highlight: "Satisfaction guaranteed",
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-lg">
                      <span className="text-2xl bg-blue-50 p-2 rounded-lg">
                        {item.icon}
                      </span>
                      <div>
                        <span className="text-gray-800">{item.text}</span>
                        {item.highlight && (
                          <span className="ml-2 text-sm font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {item.highlight}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-2 inline-block">
              Simple Process
            </span>
            <h2 className="text-4xl font-bold mt-2">How It Works</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Getting your professional website is just 3 simple steps away.
              We&apos;ve streamlined the process to make it quick and
              hassle-free.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                icon: "📝",
                title: "Share Your Vision",
                desc: "Fill our simple form with your requirements, preferences, and any examples you like. The more details you provide, the better we can match your vision.",
                color: "blue",
              },
              {
                step: "02",
                icon: "🎨",
                title: "We Create Your Site",
                desc: "Our team of designers and developers will craft your custom website with attention to your brand, target audience, and specific needs.",
                color: "purple",
              },
              {
                step: "03",
                icon: "🚀",
                title: "Launch in 3-4 Days",
                desc: "Your complete website is delivered and deployed quickly. We'll handle the technical setup so you can focus on your business.",
                color: "green",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-xl shadow-md p-8 md:w-1/3 border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-${step.color}-600 flex items-center justify-center text-white font-bold`}
                >
                  {step.step}
                </div>

                <div className="text-4xl mb-6">{step.icon}</div>
                <h3
                  className={`text-2xl font-bold mb-4 text-${step.color}-600`}
                >
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4">{step.desc}</p>

                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-0 z-10 text-3xl text-gray-300">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/pricing">
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-xl font-bold transition shadow-lg hover:shadow-xl"
              >
                Start Your Project Now
              </MotionButton>
            </Link>
            <p className="text-gray-500 mt-4 text-sm">
              No commitment - Get a free consultation
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
