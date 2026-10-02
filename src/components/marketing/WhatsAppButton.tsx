import { MessageCircle } from "lucide-react";
import { COMPANY } from "@/lib/data/company";

export default function WhatsAppButton() {
  return (
    <a
      href={COMPANY.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp'tan yazın"
      className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-primary-green text-white shadow-md transition-colors hover:bg-primary-red lg:flex"
    >
      <MessageCircle size={26} strokeWidth={2} aria-hidden />
    </a>
  );
}
