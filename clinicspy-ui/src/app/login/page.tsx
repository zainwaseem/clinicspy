"use client";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import axios from "axios";
import baseURL from "@/utils/baseURL";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      router.push("/"); // Redirect to home if already logged in
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to validate email format
    if (!email || !password) {
      toast.error("Please enter email and password");
      setLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("Login successful");
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        login(response.data); // Call Zustand login function
        router.push("/pricing"); // Redirect to home
      } else {
        toast.error("Login failed");
      }
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // disabled eslint rule for this line
      /* eslint-disable */
      const errorMessage =
        (error as any)?.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen lg:h-[calc(100vh-66px)] isolate flex-1 flex-col justify-center px-6 lg:px-8 ">
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

      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <Image
          alt="ClinicSpy Logo"
          src={logo}
          width={150}
          height={150}
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                autoFocus={true}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="forget-password py-0 my-0">
            <Link href="/forget-password">Forget password?</Link>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-primary"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
