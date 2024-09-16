import { Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-t border-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <div className="text-gray-300 text-sm">
            <p>© 2024 CAN-Store. All rights reserved.</p>
          </div>
          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to={"/privacy"}
              className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
            >
              Privacy Policy
            </Link>
            <Link
              to={"/terms"}
              className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
            >
              Terms of Service
            </Link>
          </nav>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-emerald-400"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-emerald-400"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-emerald-400"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
