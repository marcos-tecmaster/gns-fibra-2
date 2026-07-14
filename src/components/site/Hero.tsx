import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  MessageCircle,
  Wifi,
  Zap,
} from "lucide-react";
import heroFiber from "@/assets/hero-fiber.jpg";
import { useSiteContent } from "@/content/SiteContentProvider";
import { whatsappLink } from "@/lib/site-content";

const heroBenefits = [
  { icon: CheckCircle2, label: "Fibra óptica" },
  { icon: Wifi, label: "Wi-Fi de alta performance" },
  { icon: Building2, label: "Casa e empresa" },
];

function splitHeroTitle(title: string) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 2) {
    return { titleStart: title, highlightedTitle: "" };
  }

  return {
    titleStart: words.slice(0, -2).join(" "),
    highlightedTitle: words.slice(-2).join(" "),
  };
}

function HeroVisual() {
  return (
    <div
      className="hero-mascot-stage"
      aria-hidden="true"
      data-future-mascot-slot="hero"
    />
  );
}

export function Hero() {
  const { config } = useSiteContent();
  const { titleStart, highlightedTitle } = splitHeroTitle(config.company.heroTitle);

  return (
    <section
      id="inicio"
      className="relative min-w-0 overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:min-h-[760px] lg:pt-36"
    >
      <div className="absolute inset-0">
        <img
          src={heroFiber}
          alt=""
          fetchPriority="high"
          className="hero-fiber-backdrop"
          width={1920}
          height={1080}
        />
        <div className="hero-fiber-tone" />
        <div className="hero-fiber-readability" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-hero-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-hero-grid) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 52% 45%, black 18%, transparent 72%)",
        }}
      />

      <div className="container relative mx-auto min-w-0 px-4 sm:px-5">
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.82fr)] lg:gap-12">
          <div className="min-w-0 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-primary/45 bg-primary/10 px-3 py-2 backdrop-blur-md sm:px-4"
            >
              <Zap className="h-4 w-4 shrink-0 text-primary" />
              <span className="min-w-0 text-[11px] font-bold uppercase leading-relaxed tracking-normal text-primary sm:text-sm">
                Há mais de {config.company.yearsActive} anos conectando pessoas
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="max-w-4xl text-balance break-words text-4xl font-black leading-[1.03] tracking-normal min-[390px]:text-[2.75rem] sm:text-5xl md:text-6xl xl:text-7xl"
            >
              {titleStart}
              {highlightedTitle ? (
                <>
                  {" "}
                  <span className="text-gradient">{highlightedTitle}</span>
                </>
              ) : null}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/78 sm:text-lg md:text-xl"
            >
              {config.company.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href={whatsappLink(
                  config.contact.whatsappUrl,
                  "Olá! Quero consultar os planos disponíveis para meu endereço.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 max-w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-primary-glow px-5 py-4 text-center text-sm font-bold text-primary-foreground shadow-brand transition-all hover:-translate-y-0.5 hover:brightness-110 sm:px-7 sm:text-base"
              >
                <MessageCircle className="h-5 w-5 shrink-0" />
                Falar no WhatsApp
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#planos"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card/70 px-7 py-4 font-semibold text-foreground backdrop-blur-md transition-colors hover:border-primary/60 hover:text-primary"
              >
                Conhecer os planos
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-8 grid max-w-2xl gap-3 text-sm text-foreground/75 sm:grid-cols-3"
              aria-label="Indicadores de confiança"
            >
              {heroBenefits.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-2xl border border-border/70 bg-card/45 px-3 py-2 backdrop-blur-md">
                  <Icon className="h-4 w-4 shrink-0 text-primary" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="relative hidden h-[320px] md:block lg:h-[520px]"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
