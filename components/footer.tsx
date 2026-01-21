"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa6";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
];

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-center gap-4 py-0">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center justify-center md:w-1/3"
          >
            <h3 className="text-xl text-center tracking-wide italic font-bold text-gradient">
              “Learning, building, and improving every single day.”
            </h3>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center justify-center md:w-1/3"
          >
            {/* <h4 className="text-lg font-medium mb-4 tracking-wide">
                            Find me on :
                        </h4> */}

            <div className="flex gap-5 justify-center">
              {[
                {
                  icon: FaInstagram,
                  href: "https://instagram.com/armadii27",
                  color: "text-pink-600",
                },
                {
                  icon: FaFacebook,
                  href: "https://www.facebook.com/medsky27",
                  color: "text-blue-600",
                },
                {
                  icon: FaTelegram,
                  href: "https://t.me/medskyy27",
                  color: "text-sky-500",
                },
                {
                  icon: FaYoutube,
                  href: "https://www.youtube.com/@medskyy27",
                  color: "text-red-600",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`text-xl p-2 rounded-full bg-muted/40 hover:bg-primary/40 dark:hover:bg-gray-800 transition-colors ${social.color}`}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:w-1/3 flex justify-center items-center"
          >
            <div className="flex gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-md text-muted-foreground relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full hover:text-primary"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-6 flex justify-center">
          <div className="h-px w-full bg-border" />
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 flex-wrap">
            © 2025 Armadi27 — Built with Next.js & Tailwind CSS
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
