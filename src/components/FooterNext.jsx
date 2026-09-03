import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ShieldCheck,
  HelpCircle,
  Building2,
  Phone,
  MessageCircleQuestion,
} from "lucide-react";
import Link from "next/link";

const FooterNext = () => {
  return (
    <footer className="text-gray-300 px-6 py-10 border-t border-white/10 bg-black">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-white">
        
        {/* Column 1 - Logo and Copyright */}
        <div className="text-center md:text-left">
          <img
            src="/wisowl-withtext-white.svg"
            alt="WisOwl Logo"
            width={140}
            className="mb-4  transition mx-auto md:mx-0"
          />
          <p className="text-xs ">
            © {new Date().getFullYear()} WisOwl. All rights reserved.
          </p>
        </div>

        {/* Column 2 - Footer Links */}
        <div className="flex flex-row gap-10 items-center md:items-start col-span-2">
          
          {/* Section 1 */}
          <div className="flex flex-col gap-3">
            <Link href="/about" className="text-white hover:text-white flex items-center gap-2 transition">
              <Building2 className="w-4 h-4" />
              The Company
            </Link>

            <Link href="/hiw" className="text-white hover:text-white flex items-center gap-2 transition">
              <HelpCircle className="w-4 h-4" />
              How It Works
            </Link>

            <Link href="/contact" className="text-white hover:text-white flex items-center gap-2 transition">
              <Phone className="w-4 h-4" />
              Contact
            </Link>

            <Link href="/faq" className="text-white hover:text-white flex items-center gap-2 transition">
              <MessageCircleQuestion className="w-4 h-4" />
              FAQ
            </Link>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col gap-3">
            <Link href="/privacy-policy" className="text-white hover:text-white flex items-center gap-2 transition">
              <ShieldCheck className="w-4 h-4" />
              Privacy Policy
            </Link>

            <Link href="/terms-of-service" className="text-white hover:text-white flex items-center gap-2 transition">
              <ShieldCheck className="w-4 h-4" />
              Terms of Service
            </Link>

            <Link href="/cancellation-and-refund" className="text-white hover:text-white flex items-center gap-2 transition">
              <ShieldCheck className="w-4 h-4" />
              Cancellation and Refund Policy
            </Link>

            <Link href="/shipping-delivery-policy" className="text-white hover:text-white flex items-center gap-2 transition">
              <ShieldCheck className="w-4 h-4" />
              Shipping and Delivery Policy
            </Link>
          </div>
        </div>

        {/* Column 3 - Social Icons */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <p className=" text-xs">Connect with us:</p>

          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/share/1BjufuYZqt/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3b82f6] transition text-white"
            >
              <Facebook className="w-5 h-5" />
            </a>

            <a
              href="https://www.linkedin.com/company/wisowl/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0e76a8] transition text-white"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <a
              href="https://www.instagram.com/thewisowl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e1306c] transition text-white"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href="https://www.youtube.com/@thewisowl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ff0000] transition text-white"
            >
              <Youtube className="w-5 h-5" />
            </a>

            <a
              href="https://x.com/Wisowlai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ff0000] transition text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 22 22"
                fill="currentColor"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.64 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932L18.901 1.153zm-1.292 19.49h2.04L6.486 3.24H4.298l13.31 17.403z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNext;