import { motion } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  CreditCard,
  Headphones,
  LucideIcon,
  Tv,
  Wifi,
} from "lucide-react";
import { useSiteContent } from "@/content/SiteContentProvider";
import type { IconName } from "@/content/types";

const ICONS: Partial<Record<IconName, LucideIcon>> = {
  camera: Camera,
  "credit-card": CreditCard,
  headset: Headphones,
  tv: Tv,
  wifi: Wifi,
};

export function Benefits() {
  const { benefits, plans } = useSiteContent();
  const hasCameraBenefit = plans.some((plan) =>
    plan.features.some((feature) => /c[aâ]mera/i.test(feature)),
  );
  const activeBenefits = benefits.filter(
    (benefit) =>
      benefit.active && (benefit.id !== "camera-seguranca" || hasCameraBenefit),
  );

  if (activeBenefits.length === 0) {
    return null;
  }

  return (
    <section id="beneficios" className="section-spacing-standard relative overflow-hidden">
      <div className="container mx-auto min-w-0 px-4 sm:px-5">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-primary">
              Benefícios
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
              Benefícios que completam{" "}
              <span className="text-gradient">sua conexão.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              Mais praticidade, suporte próximo e recursos que tornam sua
              experiência com a internet ainda melhor.
            </p>
          </div>

          <div className="rounded-3xl border border-border/70 bg-card/60 p-5 shadow-card sm:p-6">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/12 text-primary">
                <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-black">Escolha com tranquilidade</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Nossa equipe ajuda você a entender as opções e encontrar o
                  plano mais adequado para sua rotina.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {activeBenefits.map((benefit, index) => {
            const Icon = ICONS[benefit.icon] ?? CheckCircle2;

            return (
              <motion.article
                key={benefit.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="benefit-card"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-black leading-snug">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {benefit.description}
                </p>

                {benefit.ctaLabel && benefit.ctaHref && (
                  <a
                    href={benefit.ctaHref}
                    className="mt-5 inline-flex min-h-11 items-center rounded-full text-sm font-bold text-primary underline-offset-4 hover:underline"
                  >
                    {benefit.ctaLabel}
                  </a>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
