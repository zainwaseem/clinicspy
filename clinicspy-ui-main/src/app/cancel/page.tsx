"use client";
// pages/PaymentSuccess.tsx
import { useRouter } from "next/navigation";
import { FC } from "react";
import { X } from "lucide-react";

const Cancel: FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/"); // Navigate to home page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center isolate">
      <div
        aria-hidden="true"
        className="absolute inset-x-0  -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-primary opacity-30"
        />
      </div>
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 text-center">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-800 ">
            Payment Cancelled!
          </h1>
          <X className="w-5 h-5 text-red-500" />
        </div>
        <p className="text-gray-600 mt-2">Your payment has been cancelled.</p>
        <button
          onClick={handleGoBack}
          className="mt-6 px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition duration-200"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default Cancel;
