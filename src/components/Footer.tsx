import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto flex flex-wrap items-center  px-6 lg:px-20 gap-4 md:gap-[22px] justify-start md:justify-between">
        {/* Section 1: Logo & Social Media */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold">IndiaSales</h2>
          <p className="text-sm text-gray-400">
            Quality products for every adventure.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className="flex space-x-3">
          <Link
            href="/products/horse"
            className="text-gray-400 hover:text-white transition-all"
          >
            Horse
          </Link>
          <Link
            href="/products/rider"
            className="text-gray-400 hover:text-white transition-all"
          >
            Rider
          </Link>
          <Link
            href="/aboutus"
            className="text-gray-400 hover:text-white transition-all"
          >
            About Us
          </Link>
          <Link
            href="/contactus"
            className="text-gray-400 hover:text-white transition-all"
          >
            Contact Us
          </Link>
        </div>

        <div className="flex space-x-4">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-6 h-6 hover:text-blue-500 transition-all" />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-6 h-6 hover:text-pink-500 transition-all" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-6 h-6 hover:text-blue-400 transition-all" />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-6 h-6 hover:text-blue-700 transition-all" />
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-4 pt-2 text-center text-gray-500 text-sm ">
        © {new Date().getFullYear()} IndiaSales. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
