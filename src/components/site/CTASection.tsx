import { Mail, MessageCircle, Phone, Sparkles } from "lucide-react";
import fiberBundle from "@/assets/fiber-bundle.jpg";
import contactMascot from "@/assets/mascote/v2/contato-whatsapp-acenando.png";
import { useSiteContent } from "@/content/SiteContentProvider";
import { whatsappLink } from "@/lib/site-content";

export function CTASection() {
  const { config } = useSiteContent();
  const phoneHref = config.contact.phone
    ? `tel:${config.contact.phone.replace(/\D/g, "")}`
    : undefined;

  return (
    <section id="contato" className="section-spacing-compact relative">
      <div className="container mx-auto px-5">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/40 bg-gradient-to-br from-card via-background to-card p-6 shadow-elevated sm:p-8 md:p-12 lg:p-14">
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

          <div className="relative z-10 grid min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.42fr)]">
            <div className="min-w-0">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5">
                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Vamos conectar você
                </span>
              </div>
              <h2 className="max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                Pronto para falar com a{" "}
                <span className="text-gradient">GNS Fibra?</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                Conte onde você mora ou trabalha e nossa equipe ajuda a
                verificar a cobertura e encontrar a opção adequada.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={whatsappLink(
                    config.contact.whatsappUrl,
                    "Olá! Quero verificar a cobertura e conhecer os planos da GNS Fibra.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-primary-glow px-7 py-3.5 text-center font-bold text-primary-foreground shadow-brand transition-transform hover:scale-[1.03]"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Falar pelo WhatsApp
                </a>
                <a
                  href={`mailto:${config.contact.email}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card/70 px-7 py-3.5 text-center font-semibold text-foreground backdrop-blur transition-colors hover:border-primary/60 hover:text-primary"
                >
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  Enviar um e-mail
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 text-sm text-muted-foreground">
                {phoneHref && (
                  <a
                    href={phoneHref}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card/55 px-4 py-2 transition-colors hover:border-primary/60 hover:text-primary"
                  >
                    <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                    {config.contact.phone}
                  </a>
                )}
                <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card/55 px-4 py-2">
                  <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                  {config.contact.email}
                </span>
              </div>
            </div>

            <figure className="cta-mascot-stage" aria-hidden="true">
              <img
                src={contactMascot}
                alt=""
                width={582}
                height={840}
                loading="lazy"
                decoding="async"
                className="cta-mascot-image pointer-events-none"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
