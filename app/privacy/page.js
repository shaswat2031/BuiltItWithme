import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div>
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 pb-4 border-b border-gray-200">
            Privacy Policy
          </h1>

          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Last Updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              1. Introduction
            </h2>
            <p className="mb-4">
              At BuildItWith.me, we respect your privacy and are committed to
              protecting your personal data. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website or use our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              2. Information We Collect
            </h2>
            <p className="mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
              <li>
                Personal information (such as name, email address, and contact
                details) that you voluntarily provide when filling out forms on
                our website.
              </li>
              <li>
                Account credentials for third-party services (GitHub, Vercel)
                required to set up your website if you choose our Live Website
                package.
              </li>
              <li>
                Information about your project requirements and preferences.
              </li>
              <li>Payment information (processed securely through PayPal).</li>
              <li>
                Usage information and analytics data when you browse our
                website.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
              <li>Provide, operate, and maintain our services.</li>
              <li>Process and complete transactions.</li>
              <li>
                Set up and configure your website according to your
                requirements.
              </li>
              <li>
                Communicate with you regarding your project and service updates.
              </li>
              <li>Improve our website and user experience.</li>
              <li>Comply with legal obligations.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              4. Information Sharing
            </h2>
            <p className="mb-4">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information in the following
              circumstances:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
              <li>
                With service providers who assist us in operating our website
                and conducting our business.
              </li>
              <li>
                With third-party platforms necessary for your website setup
                (GitHub, Vercel) with your consent.
              </li>
              <li>If required by law or to respond to legal process.</li>
              <li>
                To protect our rights, property, or safety, or that of our users
                or others.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              5. Data Security
            </h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your
              personal information. However, no method of transmission over the
              Internet or electronic storage is 100% secure. We strive to use
              commercially acceptable means to protect your personal information
              but cannot guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              6. Third-Party Services
            </h2>
            <p className="mb-4">
              Our website may contain links to third-party websites or services
              that are not owned or controlled by BuildItWith.me. We have no
              control over and assume no responsibility for the content, privacy
              policies, or practices of any third-party sites or services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              7. Your Rights
            </h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding
              your personal data, including:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
              <li>
                The right to access and receive a copy of your personal data.
              </li>
              <li>The right to rectify or update your personal data.</li>
              <li>The right to erase your personal data.</li>
              <li>The right to restrict processing of your personal data.</li>
              <li>The right to object to processing of your personal data.</li>
              <li>The right to data portability.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              8. Changes to This Privacy Policy
            </h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
              You are advised to review this Privacy Policy periodically for any
              changes.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              9. Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please
              contact us at: Prasadshaswat9265@gmail.com
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
