import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { ChevronRight, Facebook, LinkedinIcon, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#4E4A4A]  text-gray-300 py-16 lg:px-2 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo */}
        <div className="flex flex-col">
          <Image
            src={logo}
            width={150}
            height={150}
            alt="ClinicSpy Logo"
            className="h-10"
          />
        </div>

        {/* Pages - Left */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            <span className="text-yellow-500">|</span> Pages
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-1">
              <ChevronRight size={16} />
              <Link href="#" className="">
                Features
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight size={16} />
              <Link href="/pricing" className="">
                Pricing
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight size={16} />
              <Link
                href="https://AdvancedCare.ai"
                target="_blank"
                className="hover:underline"
              >
                Part of the AdvancedCare family
              </Link>
            </li>
          </ul>
        </div>

        {/* Pages - Right */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            <span className="text-yellow-500">|</span> Pages
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-1">
              <ChevronRight size={16} />
              <Link href="#" className="">
                Term of Use
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight size={16} />
              <Link href="#" className="">
                Privacy Policy
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight size={16} />
              <Link href="#" className="">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            <span className="text-yellow-500">|</span> Social Media
          </h3>
          <div className="flex space-x-4">
            <Link
              href="https://www.linkedin.com/company/advancedcare"
              className="text-gray-300 hover:text-white"
              target="_blank"
            >
              <LinkedinIcon size={20} />
            </Link>
            <Link
              href="http://x.com/advancedcareai"
              className="text-gray-300 hover:text-white"
              target="_blank"
            >
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">
              <Facebook size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 mt-8">
        <p>© Copyright 2024 | ClinicSpy | All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
