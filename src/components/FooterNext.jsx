import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Building2,
  Phone,
} from "lucide-react";
import Link from "next/link";

const FooterNext = () => {
  return (
    <footer className="text-gray-300 px-6 py-10 border-t border-white/10 bg-black">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-white">

        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
          <img
            src="/jansuraajlogo.png"
            alt="Jan Suraaj Logo"
            width={64}
            height={64}
            className="rounded-full"
          />
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Jan Suraaj. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8">
          <Link href="https://www.jansuraaj.org/" className="text-white hover:text-brand-gold flex items-center gap-2 transition" target="_blank" rel="noopener noreferrer">
            <Building2 className="w-4 h-4" />
            The Company
          </Link>

          <Link href="https://www.jansuraaj.org/contact" className="text-white hover:text-brand-gold flex items-center gap-2 transition" target="_blank" rel="noopener noreferrer">
            <Phone className="w-4 h-4" />
            Contact
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <p className="text-xs text-gray-400">Connect with us:</p>

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
