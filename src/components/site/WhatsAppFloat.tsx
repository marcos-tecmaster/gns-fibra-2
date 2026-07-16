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
      className="whatsapp-float fixed z-40 grid place-items-center rounded-full bg-whatsapp text-white shadow-whatsapp transition-transform hover:scale-110"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-25 motion-reduce:hidden" />
      <MessageCircle className="whatsapp-float-icon relative" fill="currentColor" />
    </a>
  );
}
