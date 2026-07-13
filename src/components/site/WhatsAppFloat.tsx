import { MessageCircle } from "lucide-react";
import { useSiteContent } from "@/content/SiteContentProvider";
import { whatsappLink } from "@/lib/site-content";

export function WhatsAppFloat() {
  const { config } = useSiteContent();

  return (
    <a
      href={whatsappLink(config.contact.whatsappUrl)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-4 right-4 z-40 grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_8px_30px_oklch(0.72_0.18_150/0.5)] transition-transform hover:scale-110 sm:bottom-5 sm:right-5"
      style={{ backgroundColor: "oklch(0.72 0.18 150)" }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[oklch(0.72_0.18_150)] opacity-25 motion-reduce:hidden" />
      <MessageCircle className="relative h-7 w-7" fill="currentColor" />
    </a>
  );
}
