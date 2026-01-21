"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { portfolioData } from "@/data/portfolio";
import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

interface ContactSectionProps {
  contact: any;
}

export function ContactSection({ contact }: ContactSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactData = contact || portfolioData.contact;

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: contactData.email,
      href: `mailto:${contactData.email}`,
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: contactData.whatsapp,
      href: `https://wa.me/${contactData.whatsapp.replace(/[^0-9]/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: contactData.location,
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto mb-6" />
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Feel free to reach out if you'd like to collaborate—you are just a
            few clicks away!
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {contactItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="block"
                >
                  <Card className="text-center hover:border-primary transition-all cursor-pointer">
                    <CardContent className="p-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{item.label}</h3>
                      <p className="text-sm text-muted-foreground break-all">
                        {item.value}
                      </p>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>
              <div className="flex justify-center gap-4">
                {[
                  { icon: Github, href: "https://github.com/yourusername" },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com/in/yourprofile",
                  },
                  { icon: BsTwitterX, href: "https://x.com/yourhandle" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
