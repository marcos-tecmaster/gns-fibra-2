import { motion } from "framer-motion";
import { ArrowRight, Building2, CheckCircle2, Wifi } from "lucide-react";
import heroFiber from "@/assets/hero-fiber.jpg";
import { useSiteContent } from "@/content/SiteContentProvider";
import { whatsappLink } from "@/lib/site-content";

const heroBenefits = [
  { icon: CheckCircle2, label: "Instalação profissional" },
  { icon: Wifi, label: "Wi-Fi de alta performance" },
  { icon: Building2, label: "Residencial e empresarial" },
];

export function Hero() {
  const { config } = useSiteContent();
  const titleWords = config.company.heroTitle.trim().split(/\s+/);
  const highlightedTitle = titleWords.splice(-2).join(" ");
  const titleStart = titleWords.join(" ");

  return (
    <section
      id="inicio"
      className="relative flex min-h-[720px] min-w-0 items-center overflow-hidden pb-16 pt-28 sm:min-h-[760px] sm:pb-20 sm:pt-32 md:min-h-screen md:pt-36"
    >
      <div className="absolute inset-0">
        <img
          src={heroFiber}
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover object-center opacity-65"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/55 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-background/30" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-hero-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-hero-grid) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        }}
      />

      <div className="container relative mx-auto min-w-0 px-4 sm:px-5">
        <div className="min-w-0 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-6 flex max-w-full items-start gap-2 rounded-2xl border border-primary/45 bg-primary/10 px-3 py-2 backdrop-blur-md sm:inline-flex sm:items-center sm:rounded-full sm:px-4"
          >
            <Wifi className="h-4 w-4 text-primary" />
            <span className="min-w-0 break-words text-[11px] font-bold uppercase leading-relaxed tracking-[0.12em] text-primary sm:text-sm sm:tracking-[0.16em]">
              Há mais de {config.company.yearsActive} anos conectando famílias e empresas
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="max-w-4xl break-words text-3xl font-black leading-[1.08] min-[390px]:text-4xl sm:text-5xl md:text-7xl"
          >
            {titleStart}{" "}
            <span className="text-gradient">{highlightedTitle}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/75 sm:text-lg md:text-xl"
          >
            Fibra óptica de alta performance, rede estável e atendimento humano
            para sua casa ou empresa permanecer sempre conectada.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={whatsappLink(
                config.contact.whatsappUrl,
                "Olá! Quero consultar os planos disponíveis para meu endereço.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex max-w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-primary-glow px-5 py-4 text-center text-sm font-bold text-primary-foreground shadow-brand transition-all hover:-translate-y-0.5 hover:brightness-110 sm:px-7 sm:text-base"
            >
              Consultar disponibilidade
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#planos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/65 px-7 py-4 font-semibold text-foreground backdrop-blur-md transition-colors hover:border-primary/60"
            >
              Conhecer os planos
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 grid max-w-2xl gap-3 text-sm text-foreground/75 sm:grid-cols-3"
          >
            {heroBenefits.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
