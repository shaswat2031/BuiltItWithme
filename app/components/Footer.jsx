import Link from "next/link";
import Image from "next/image";
import paypal from "../../public/paypal.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              BuildItWith.me
            </h3>
            <p className="max-w-xs text-gray-300 leading-relaxed mb-6">
              Affordable, custom portfolio websites for creators, freelancers,
              and small businesses.
            </p>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">Payment We Accept</h4>
              <div className="flex gap-3 items-center bg-gray-800 p-2 rounded-lg inline-flex">
                <div className="bg-white px-2 py-1 rounded">
                  <Image src={paypal} alt="PayPal" width={60} height={20} />
                </div>
                <span className="text-gray-300 text-sm">
                  Secure payments via PayPal
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="text-blue-400">→</span> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="text-blue-400">→</span> Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="text-blue-400">→</span> About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Contact Us
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a
                  href="mailto:Prasadshaswat9265@gmail.com"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Prasadshaswat9265@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.323 14.657a8.03 8.03 0 005.686 2.333 8.03 8.03 0 005.686-2.333A8.522 8.522 0 0010 6a8.522 8.522 0 00-4.677 8.657z"
                    clipRule="evenodd"
                  />
                </svg>
                <a
                  href="https://instagram.com/Prasad_shaswat"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Instagram: Prasad_shaswat
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Follow Us
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://instagram.com/Prasad_shaswat"
                className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-pink-500"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram</span>
              </a>

              <a
                href="https://facebook.com"
                className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-blue-500"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
                <span>Facebook</span>
              </a>

              <a
                href="https://twitter.com"
                className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-blue-400"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                <span>Twitter</span>
              </a>

              <a
                href="https://linkedin.com"
                className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-blue-600"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} BuildItWith.me | All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
