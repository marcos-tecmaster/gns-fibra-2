import { motion } from "framer-motion";
import { Building2, CheckCircle2, Headphones, Network, ShieldCheck } from "lucide-react";
import businessMascot from "@/assets/mascote/v2/empresarial-notebook.png";
import { useSiteContent } from "@/content/SiteContentProvider";
import { whatsappLink } from "@/lib/site-content";

const benefits = [
  { icon: Network, text: "Conectividade preparada para operações críticas" },
  { icon: ShieldCheck, text: "Rede monitorada e infraestrutura confiável" },
  { icon: Headphones, text: "Atendimento próximo para sua empresa" },
];

export function Business() {
  const { config } = useSiteContent();

  return (
    <section id="empresarial" className="section-spacing-standard relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-card/70 via-background to-primary/5" />
      <div className="container mx-auto px-5">
        <div className="grid items-center gap-10 rounded-[2rem] border border-border bg-card/55 p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              GNS Empresarial
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
              Conectividade para sua empresa{" "}
              <span className="text-gradient">crescer sem limites.</span>
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
              Soluções de fibra óptica para escritórios, comércios e operações que
              precisam de estabilidade, produtividade e suporte especializado.
            </p>
            <a
              href={whatsappLink(
                config.contact.whatsappUrl,
                "Olá! Quero conhecer as soluções empresariais da GNS Fibra.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-6 py-3.5 text-sm font-bold text-primary-foreground"
            >
              Falar com um consultor
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="business-mascot-column"
          >
            <div className="business-mascot-stage" aria-hidden="true">
              <img
                src={businessMascot}
                alt=""
                width={647}
                height={840}
                loading="lazy"
                decoding="async"
                className="business-mascot-image"
              />
            </div>

            <div className="relative min-w-0">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-primary/30 bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold">Internet empresarial</h3>
              </div>
              <div className="mt-6 space-y-4">
                {benefits.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                      <Icon className="h-4 w-4 text-primary/80" />
                      {text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
