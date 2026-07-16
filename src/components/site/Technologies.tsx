import { motion } from "framer-motion";
import {
  Headphones,
  LucideIcon,
  Network,
  Router,
  ShieldCheck,
  Signal,
  Wifi,
  Zap,
} from "lucide-react";
import wifiTurboMascot from "@/assets/mascote/v2/wifi-turbo.png";
import { useSiteContent } from "@/content/SiteContentProvider";
import type { IconName } from "@/content/types";

const ICONS: Partial<Record<IconName, LucideIcon>> = {
  headset: Headphones,
  network: Network,
  router: Router,
  shield: ShieldCheck,
  wifi: Wifi,
  zap: Zap,
};

export function Technologies() {
  const { technologies } = useSiteContent();
  const activeTechnologies = technologies.filter((technology) => technology.active);

  if (activeTechnologies.length === 0) {
    return null;
  }

  return (
    <section id="tecnologias" className="section-spacing-standard relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="container mx-auto min-w-0 px-4 sm:px-5">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-primary">
            Tecnologias
          </span>
          <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
            Tecnologia para uma conexão{" "}
            <span className="text-gradient">mais estável.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Infraestrutura de fibra óptica, equipamentos modernos e uma rede
            preparada para acompanhar sua rotina.
          </p>
        </div>

        <div className="technology-showcase">
          <div className="technology-panel">
            <div className="technology-radar" aria-hidden="true">
              <Signal className="h-10 w-10 text-primary" />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {activeTechnologies.map((technology, index) => {
                const Icon = ICONS[technology.icon] ?? Network;

                return (
                  <motion.article
                    key={technology.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.42, delay: index * 0.05 }}
                    className="technology-card"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-brand">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <h3 className="text-lg font-black leading-snug">{technology.name}</h3>
                        <span className="rounded-full border border-border/80 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-muted-foreground">
                          {technology.availability}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {technology.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="technology-mascot"
            aria-hidden="true"
          >
            <img
              src={wifiTurboMascot}
              alt=""
              width={596}
              height={840}
              loading="lazy"
              decoding="async"
              className="technology-mascot-image"
            />
          </motion.figure>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-6 text-muted-foreground sm:text-sm">
          Tecnologias e equipamentos podem variar conforme o plano e a
          disponibilidade técnica.
        </p>
      </div>
    </section>
  );
}
