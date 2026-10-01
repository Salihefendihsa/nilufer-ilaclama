"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { COMPANY } from "@/lib/data/company";

export default function WhatsAppButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.6 }}
      className="fixed bottom-6 right-8 z-50 hidden h-14 w-14 items-center justify-center lg:flex"
    >
      <motion.span
        aria-hidden
        initial={{ opacity: 0.6, scale: 1 }}
        animate={{ opacity: 0, scale: 2.1 }}
        transition={{ duration: 1.8, delay: 1.4, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-full bg-primary-green"
      />

      <motion.a
        href={COMPANY.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp'tan yazın"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{
          duration: 0.6,
          delay: 1.4,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary-green text-white shadow-lg shadow-primary-green/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary-green/40"
      >
        <MessageCircle size={26} strokeWidth={2} />
      </motion.a>
    </motion.div>
  );
}
