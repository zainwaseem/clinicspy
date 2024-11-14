"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const user = useAuthStore((state) => state.user); // Get the user from Zustand
  const loadUser = useAuthStore((state) => state.loadUser); // Zustand loadUser function
  const logout = useAuthStore((state) => state.logout); // Zustand logout function
  const router = useRouter();

  // Load user from localStorage on component mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    router.push("/login");
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <nav className="w-full shadow-sm h-16">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src={logo}
            width={150}
            height={150}
            alt="ClinicSpy Logo"
            className="h-10"
          />
        </div>

        {/* Links (Hidden on mobile) */}
        <div className="hidden md:flex space-x-8">
          <Link href="/">
            <span className="text-gray-700 hover:text-primary cursor-pointer">
              Home
            </span>
          </Link>
          <Link href="/pricing">
            <span className="text-gray-700 hover:text-primary cursor-pointer">
              Pricing
            </span>
          </Link>
          {/*
          <Link href="#">
            <span className="text-gray-700 hover:text-primary cursor-pointer">
              Features
            </span>
          </Link>
           <Link href="#">
            <span className="text-gray-700 hover:text-primary cursor-pointer">
              AdvanceCare
            </span>
          </Link> <Link href="#">
            <span className="text-gray-700 hover:text-primary cursor-pointer">
              Contact Us
            </span>
          </Link>
          <Link href="/pricing">
            <span className="text-gray-700 hover:text-primary cursor-pointer">
              Get Started
            </span>
          </Link> */}
        </div>

        {/* Get Started Button (Hidden on mobile) */}
        <div className="hidden md:flex">
          {user ? (
            <Link
              href="/"
              onClick={handleLogout}
              className="rounded-full flex cursor-pointer gap-3 items-center bg-primary text-white px-6 py-2  hover:bg-primary/90"
            >
              Sign Out
              {/* <Image src={arrow} width={20} height={20} alt="logo" /> */}
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-full flex cursor-pointer gap-3 items-center bg-primary text-white px-6 py-2  hover:bg-primary/90"
            >
              Sign In
              {/* <Image src={arrow} width={20} height={20} alt="logo" /> */}
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon (Visible on mobile) */}
        <div className="md:hidden">
          <button
            aria-label="Menu"
            className="text-gray-700"
            onClick={toggleSidebar}
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-sm z-50 w-64 transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center px-4 py-4">
          <Image
            src={logo}
            width={120}
            height={120}
            alt="ClinicSpy Logo"
            className="h-8"
          />
          <button
            aria-label="Close"
            className="text-gray-700"
            onClick={toggleSidebar}
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col space-y-6 px-4 mt-8">
          <Link href="/" onClick={toggleSidebar}>
            <span className="text-gray-700 hover:text-primary cursor-pointer">
              Home
            </span>
          </Link>
          {/* <Link href="#" onClick={toggleSidebar}>
            <span className="text-gray-700 hover:text-primary cursor-pointer">
              Features
            </span>
          </Link> */}
          <Link href="/pricing" onClick={toggleSidebar}>
            <span className="text-gray-700 hover:text-primary cursor-pointer">
              Pricing
            </span>
          </Link>
          {/* <Link href="#" onClick={toggleSidebar}>
            <span className="text-gray-700 hover:text-primary cursor-pointer">
              AdvanceCare
            </span>
          </Link>
           <Link href="#" onClick={toggleSidebar}>
            <span className="text-gray-700 hover:text-primary cursor-pointer">
              Contact Us
            </span>
          </Link> */}

          {user ? (
            <Link
              href="/"
              onClick={handleLogout}
              className="rounded-full cursor-pointer flex  gap-3 items-center bg-primary text-white px-6 py-2  hover:bg-primary/90"
            >
              Sign Out
              {/* <Image src={arrow} width={20} height={20} alt="logo" /> */}
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-full cursor-pointer flex  gap-3 items-center bg-primary text-white px-6 py-2  hover:bg-primary/90"
            >
              Sign In
              {/* <Image src={arrow} width={20} height={20} alt="logo" /> */}
            </Link>
          )}
        </div>
      </div>
      {/* Overlay for sidebar */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 cursor-pointer bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
