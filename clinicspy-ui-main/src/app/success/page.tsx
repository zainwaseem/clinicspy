"use client";
// pages/PaymentSuccess.tsx
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { BadgeCheck } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import baseURL from "@/utils/baseURL";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentSuccess: FC = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const [loading, setLoading] = useState(false);

  async function getUser() {
    setLoading(true);
    if (!localStorage.getItem("token")) {
      toast.error("User not authenticated");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`${baseURL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status !== 200) {
        toast.error("User Subscription not Updated");
      }

      logout();
      login(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUser();
    // disable eslint
    /* eslint-disable */
  }, []);

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center isolate">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
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
        {loading ? (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Setting up your subscription plan...
            </h1>
            <p className="text-gray-600 mt-2">Please wait a moment.</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                Payment Successful!
              </h1>
              <BadgeCheck className="w-5 h-5 text-primary" />
            </div>
            <p className="text-gray-600 mt-2">
              Thank you for your purchase. Your payment has been processed
              successfully.
            </p>
            <Button onClick={handleGoBack}>Go Back to Home</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
