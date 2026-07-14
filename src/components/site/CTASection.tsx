import { MessageCircle, Sparkles } from "lucide-react";
import fiberBundle from "@/assets/fiber-bundle.jpg";
import { useSiteContent } from "@/content/SiteContentProvider";
import { whatsappLink } from "@/lib/site-content";

export function CTASection() {
  const { config } = useSiteContent();

  return (
    <section id="contato" className="section-spacing-compact relative">
      <div className="container mx-auto px-5">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/40 bg-gradient-to-br from-card via-background to-card p-8 md:p-16">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src={fiberBundle}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover opacity-30"
              width={1280}
              height={1280}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />
          </div>

          {/* Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/30 blur-[100px]" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/40 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold tracking-widest uppercase text-primary">
                Sempre conectando você ao futuro
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-5">
              Fale conosco pelo <span className="text-gradient">WhatsApp</span>.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-9 max-w-xl">
              Conte o que você precisa e nossa equipe ajuda a encontrar o plano
              ideal para sua casa ou empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappLink(config.contact.whatsappUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-bold shadow-brand hover:scale-[1.03] transition-transform"
              >
                <MessageCircle className="w-5 h-5" />
                Falar pelo WhatsApp
              </a>
              <a
                href={`mailto:${config.contact.email}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-border bg-card/60 backdrop-blur text-foreground font-semibold hover:border-primary/50 transition-all"
              >
                Enviar um e-mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
