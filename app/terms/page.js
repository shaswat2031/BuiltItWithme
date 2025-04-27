import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsOfService() {
  return (
    <div>
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 pb-4 border-b border-gray-200">
            Terms of Service
          </h1>

          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Last Updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              1. Introduction
            </h2>
            <p className="mb-4">
              Welcome to BuildItWith.me. These Terms of Service govern your use
              of our website and the services we provide. By accessing or using
              our website, you agree to be bound by these Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              2. Services
            </h2>
            <p className="mb-4">
              BuildItWith.me provides custom portfolio website design and
              development services for creators, freelancers, and small
              businesses. Our services include but are not limited to web
              design, development, deployment, and related consultations.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              3. Payment Terms
            </h2>
            <p className="mb-4">
              Payment is required in full before the commencement of work. All
              prices are displayed in USD and are subject to change without
              prior notice. We accept payments via PayPal. Once payment is made,
              it is non-refundable unless otherwise specified or required by
              law.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              4. Delivery and Revisions
            </h2>
            <p className="mb-4">
              We aim to deliver all projects within the specified timeframe
              (typically 3-4 days for standard projects). This timeframe begins
              once we have received all required information and materials from
              you. Each package includes a limited number of revision rounds as
              specified in the package details. Additional revisions may incur
              extra charges.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              5. Intellectual Property
            </h2>
            <p className="mb-4">
              Upon full payment, you will receive rights to use the delivered
              website for your intended purpose. For Live Website packages, the
              code will be transferred to your GitHub account, giving you full
              ownership. BuildItWith.me reserves the right to showcase your
              website in our portfolio unless otherwise agreed upon.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              6. User Responsibilities
            </h2>
            <p className="mb-4">
              You are responsible for providing accurate information and content
              for your website. You warrant that any content you provide does
              not infringe on any third-party rights. You are responsible for
              maintaining any accounts created for you (GitHub, Vercel, etc.)
              after project completion.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              7. Limitation of Liability
            </h2>
            <p className="mb-4">
              BuildItWith.me shall not be liable for any indirect, incidental,
              special, consequential or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other
              intangible losses. Our total liability for any claims shall not
              exceed the amount you paid for the services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              8. Changes to Terms
            </h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. Changes
              will be effective immediately upon posting to our website. Your
              continued use of our services after any changes indicates your
              acceptance of the new Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              9. Governing Law
            </h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with
              the laws of India, without regard to its conflict of law
              principles.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              10. Contact
            </h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
              Prasadshaswat9265@gmail.com
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
