import { motion } from "framer-motion";
import {
  ExternalLink,
  Headphones,
  Mail,
  MessageCircle,
  Phone,
  UserRound,
} from "lucide-react";
import supportMascot from "@/assets/mascote/v2/suporte-tecnico.png";
import { useSiteContent } from "@/content/SiteContentProvider";
import { whatsappLink } from "@/lib/site-content";

const supportOptions = [
  {
    id: "contratar",
    title: "Quero contratar",
    description:
      "Conheça os planos e encontre a opção adequada para sua casa ou empresa.",
    ctaLabel: "Conhecer planos pelo WhatsApp",
    message: "Olá! Quero conhecer os planos da GNS Fibra.",
    icon: MessageCircle,
  },
  {
    id: "cliente",
    title: "Já sou cliente",
    description: "Fale com a equipe para receber orientação sobre seu serviço.",
    ctaLabel: "Solicitar atendimento",
    message: "Olá! Já sou cliente GNS Fibra e preciso de atendimento.",
    icon: Headphones,
  },
];

export function Support() {
  const { config } = useSiteContent();
  const phoneHref = config.contact.phone
    ? `tel:${config.contact.phone.replace(/\D/g, "")}`
    : undefined;

  return (
    <section id="suporte" className="section-spacing-standard relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-transparent to-card/55" />

      <div className="container mx-auto min-w-0 px-4 sm:px-5">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="min-w-0"
          >
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-primary">
              Atendimento GNS Fibra
            </span>
            <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
              Atendimento humano para ajudar você{" "}
              <span className="text-gradient">de verdade.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Seja para conhecer os planos, verificar sua conexão ou acessar os
              serviços de cliente, nossa equipe está pronta para orientar você.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {supportOptions.map(({ id, title, description, ctaLabel, message, icon: Icon }) => (
                <article key={id} className="support-card">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-brand">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-black leading-snug">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                  <a
                    href={whatsappLink(config.contact.whatsappUrl, message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-5 py-3 text-center text-sm font-bold text-primary-foreground shadow-brand transition-transform hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    {ctaLabel}
                  </a>
                </article>
              ))}

              <article className="support-card md:col-span-2">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-primary/35 bg-primary/10 text-primary">
                  <UserRound className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-black leading-snug">Central do Assinante</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Acesse os serviços disponíveis para clientes GNS Fibra.
                  </p>
                </div>
                <a
                  href={config.links.customerPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-card/70 px-5 py-3 text-center text-sm font-bold text-foreground transition-colors hover:border-primary/60 hover:text-primary"
                >
                  Acessar Central do Assinante
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
              {phoneHref && (
                <a
                  href={phoneHref}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card/45 px-4 py-2 transition-colors hover:border-primary/60 hover:text-primary"
                >
                  <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                  {config.contact.phone}
                </a>
              )}
              <a
                href={`mailto:${config.contact.email}`}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card/45 px-4 py-2 transition-colors hover:border-primary/60 hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                {config.contact.email}
              </a>
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="support-mascot-stage"
            aria-hidden="true"
          >
            <img
              src={supportMascot}
              alt=""
              width={596}
              height={840}
              loading="lazy"
              decoding="async"
              className="support-mascot-image pointer-events-none"
            />
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
