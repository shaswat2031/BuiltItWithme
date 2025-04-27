"use client";

import { Suspense } from "react";
import PaymentContent from "./payment-content";

export default function PaymentPage() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            Loading payment details...
          </div>
        }
      >
        <PaymentContent />
      </Suspense>
    </div>
  );
}
