"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

// Mock portfolio examples - in a real implementation, these would come from a data store
const portfolioWorks = [
  {
    id: 1,
    title: "DreamHouse Design",
    category: "Business",
    image: "/dreamhouse-design.jpg",
    description:
      "Stunning 3D visualization website for a luxury home design studio. Features interactive floor plans and VR home tours for clients.",
    technology: "React, Next.js, TailwindCSS, Three.js, GSAP",
    clientName: "DreamHouse Architects",
    completionDate: "April 2023",
  },
  {
    id: 2,
    title: "Prasad Shaswat Portfolio",
    category: "Portfolio",
    image: "/prasad-portfolio.jpg",
    description:
      "Award-winning developer portfolio with interactive code demos, 3D project showcases, and animated skill visualization.",
    technology: "React, Three.js, WebGL, Framer Motion",
    clientName: "Prasad Shaswat",
    completionDate: "June 2023",
  },
  {
    id: 3,
    title: "Sunidhi Portfolio",
    category: "Creative",
    image: "/sunidhi-portfolio.jpg",
    description:
      "Immersive digital art portfolio featuring interactive canvas animations, particle effects, and seamless transitions between works.",
    technology: "Next.js, TailwindCSS, Canvas API, GSAP",
    clientName: "Sunidhi Creatives",
    completionDate: "August 2023",
  },
];

// Categories for filtering
const categories = ["All", "Portfolio", "Creative", "Business"];

export default function Works() {
  // Client-side functionality would be moved to a client component
  // This is a simplified version for demonstration

  return (
    <div>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Our Work
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of custom-designed websites built for
            creators, freelancers, and small businesses
          </p>
          <div className="mt-6 w-20 h-1 bg-blue-500 rounded-full mx-auto"></div>
        </section>

        {/* Portfolio Gallery */}
        <section className="mb-16">
          {/* Filter tabs would be interactive in a client component */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Portfolio grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioWorks.map((work) => (
              <div
                key={work.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group transform hover:-translate-y-2 hover:rotate-1"
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative h-72 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 h-full w-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {/* Replace with actual images in production */}
                    <span className="text-gray-500 font-medium">
                      {work.title} Preview
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6 backdrop-blur-sm group-hover:backdrop-blur-none">
                    <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <h3 className="font-bold text-xl mb-2">{work.title}</h3>
                      <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                        {work.category}
                      </p>
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                        <span className="px-3 py-1.5 text-xs bg-white/20 text-white rounded-full backdrop-blur-sm">
                          {work.clientName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 relative z-10 bg-white">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                      {work.category}
                    </span>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-100 text-purple-600 rounded-full">
                      {work.completionDate}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">
                    {work.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {work.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500 font-medium">
                      {work.technology}
                    </span>
                    <Link
                      href={`/Works/${work.id}`}
                      className="text-blue-600 text-sm font-medium hover:underline flex items-center group"
                    >
                      View Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Client Testimonials Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  A
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800">Amit Kumar</h3>
                  <p className="text-gray-500 text-sm">Freelance Developer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "My portfolio site turned out exactly how I imagined it. The
                code is clean and well-structured, making it easy for me to
                update and maintain."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800">Sanya Patel</h3>
                  <p className="text-gray-500 text-sm">UI/UX Designer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The team delivered my portfolio ahead of schedule and it looks
                fantastic on all devices. The design perfectly represents my
                brand identity."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-gray-50 to-purple-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                  R
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800">Rahul Singh</h3>
                  <p className="text-gray-500 text-sm">Photographer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As a photographer, I needed a site that showcases my work
                beautifully. BuildItWith.me delivered exactly that with a
                gorgeous gallery that loads quickly."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Own Portfolio?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our satisfied clients and get your professional website in just
            3-4 days.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-bold transition-all hover:bg-gray-100 hover:shadow-lg"
          >
            View Our Pricing
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
