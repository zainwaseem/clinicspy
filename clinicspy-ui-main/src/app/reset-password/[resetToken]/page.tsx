"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import baseURL from "@/utils/baseURL";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const resetToken = params.resetToken;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!resetToken) {
      toast.error("Invalid or missing reset token.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `${baseURL}/api/auth/reset-password/${resetToken}`,
        { password }
      );
      if (response.status === 200) {
        toast.success("Password reset successful");
        router.push("/login"); // Redirect to login after success
      }
    } catch (error: unknown) {
      const errorMessage =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any)?.response?.data?.message || "Password reset failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center px-6">
      <div className="w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Reset Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Enter your new password
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-md py-2 text-sm font-semibold shadow hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
