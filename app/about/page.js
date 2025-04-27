import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroabout from "../../public/hero3.jpg";
export default function About() {
  return (
    <div>
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Banner */}
        <section className="flex flex-col md:flex-row items-center gap-8 mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl shadow-sm">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-800">
              About Us
            </h1>
            <p className="text-xl text-gray-600">
              We Don’t Just Build Portfolios — We Build Personal Brands{" "}
            </p>
            <div className="mt-6 w-20 h-1 bg-blue-500 rounded-full"></div>
          </div>
          <div className="flex-1">
            <Image
              src={heroabout}
              alt="Modern web design showcase"
              width={500}
              height={300}
              className="rounded-lg shadow-md object-cover"
              priority
            />
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <span className="bg-blue-100 p-2 rounded-full mr-2">📍</span> Who We
            Are
          </h2>
          <div className="space-y-4 mb-8 text-gray-700 border-l-4 border-blue-200 pl-6">
            <p>
              Born from a spark of an innovative idea and fueled by passion, we
              believe that every person has the power to become a brand. When
              you embrace your uniqueness, you illuminate the world around you.
            </p>
            <p>
              From ambitious students to visionary developers, from creative
              freelancers to inspired designers—everyone deserves an online
              space that not only looks captivating but also works flawlessly.
            </p>
            <p>
              We create affordable, elegant portfolio websites that come to life
              in just a few days. No confusing jargon. No extravagant packages.
              Just your story, your passion, and a website that reflects your
              true essence.
            </p>
          </div>

          {/* Founder Quote - Enhanced */}
          <div className="mt-10 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2 z-0"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-100 rounded-full translate-y-1/2 -translate-x-1/2 z-0"></div>

            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
              <div className="flex-1">
                <svg
                  className="text-blue-400 w-10 h-10 mb-2 opacity-20"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="italic text-gray-700 text-lg leading-relaxed">
                  Hi, I&apos;m{" "}
                  <span className="font-semibold text-blue-700">
                    Prasad Shaswat
                  </span>
                  , the builder behind these websites. With 4 years of web
                  development experience, my mission is to make professional web
                  presence accessible to everyone.
                </p>
                <div className="mt-4 flex items-center">
                  <div className="h-px flex-1 bg-gray-300"></div>
                  <p className="px-4 font-medium text-gray-600">
                    Founder & Web Developer
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                    React
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                    Next.js
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                    TailwindCSS
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                    UX Design
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section - Enhanced */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <span className="bg-green-100 p-2 rounded-full mr-2">💼</span> What
            We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-green-200 group">
              <div className="flex items-start">
                <span className="flex items-center justify-center bg-gradient-to-br from-green-400 to-emerald-500 text-white p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800 mb-1">
                    Custom Portfolio Websites
                  </h3>
                  <p className="text-gray-600">
                    Starting at just ₹699, fully personalized for your brand
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-blue-200 group">
              <div className="flex items-start">
                <span className="flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500 text-white p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </span>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800 mb-1">
                    Modern Frameworks
                  </h3>
                  <p className="text-gray-600">
                    Built using React, Next.js and other cutting-edge
                    technologies To Build The Brand
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-purple-200 group">
              <div className="flex items-start">
                <span className="flex items-center justify-center bg-gradient-to-br from-purple-400 to-violet-500 text-white p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </span>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800 mb-1">
                    Full Ownership
                  </h3>
                  <p className="text-gray-600">
                    Deployed on Vercel with complete GitHub ownership
                    transferred to you
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-amber-200 group">
              <div className="flex items-start">
                <span className="flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 text-white p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800 mb-1">
                    Quick Turnaround
                  </h3>
                  <p className="text-gray-600">
                    Delivered in just 3-4 days with fully responsive design
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* See The Difference Section - Simplified */}

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <span className="bg-orange-100 p-2 rounded-full mr-2">🔥</span> Why
            Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-400 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-2 text-gray-800">
                Simple Process
              </h3>
              <p className="text-gray-700">Fill a form, get your website.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-green-400 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-2 text-gray-800">
                No Tech Hassle
              </h3>
              <p className="text-gray-700">
                We handle all coding and deployment.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-400 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-2 text-gray-800">
                Affordable & Fast
              </h3>
              <p className="text-gray-700">
                Starting at just ₹699, delivered in days.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-amber-400 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-2 text-gray-800">
                You Own Everything
              </h3>
              <p className="text-gray-700">
                We deploy under your GitHub. You keep full control.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16 bg-gray-50 rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center justify-center">
            <span className="bg-red-100 p-2 rounded-full mr-2">🎯</span> Our
            Mission
          </h2>
          <div className="space-y-4 text-gray-700 text-center max-w-2xl mx-auto">
            <p className="text-lg">
              To make it easy and affordable for anyone to have a personal
              website—especially those just starting out.
            </p>
            <div className="w-16 h-1 bg-red-400 mx-auto my-4 rounded-full"></div>
            <p>
              We believe your name deserves a domain, and your work deserves to
              be seen.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
