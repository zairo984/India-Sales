import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Section 1: Logo & Social Media */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold">IndiaSales</h2>
          <p className="text-sm text-gray-400">
            Quality products for every adventure.
          </p>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-6 h-6 hover:text-blue-500 transition-all" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6 hover:text-pink-500 transition-all" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-6 h-6 hover:text-blue-400 transition-all" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 hover:text-blue-700 transition-all" />
            </Link>
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <Link href="/horse" className="text-gray-400 hover:text-white transition-all">
            Horse
          </Link>
          <Link href="/rider" className="text-gray-400 hover:text-white transition-all">
            Rider
          </Link>
          <Link href="/aboutus" className="text-gray-400 hover:text-white transition-all">
            About Us
          </Link>
          <Link href="/contactus" className="text-gray-400 hover:text-white transition-all">
            Contact Us
          </Link>
        </div>

        {/* Section 3: Newsletter */}
        {/* <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold">Newsletter</h3>
          <p className="text-gray-400">Subscribe to get the latest updates.</p>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div> */}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} IndiaSales. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
