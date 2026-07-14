import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Gauge,
  MessageCircle,
  Router,
  Sparkles,
  Star,
} from "lucide-react";
import { useSiteContent } from "@/content/SiteContentProvider";
import type { SiteContent } from "@/content/types";
import { whatsappLink } from "@/lib/site-content";

type Plan = SiteContent["plans"][number];

const PLAN_FEATURE_LIMIT = 3;

function normalizedText(value: string) {
  return value.toLocaleLowerCase("pt-BR");
}

function getPlanBenefit(plan: Plan) {
  return plan.features.find((feature) => feature.trim().length > 0) ?? plan.audience;
}

function getWifiTechnology(plan: Plan) {
  return plan.features.find((feature) => normalizedText(feature).includes("wi-fi"));
}

function hasPublishedPrice(plan: Plan) {
  return plan.price.trim().length > 0 && plan.price !== "0,00";
}

function getPlanMessage(plan: Plan) {
  const speed = [plan.speed, plan.unit].filter(Boolean).join(" ");
  const planLabel = [plan.name, speed ? `(${speed})` : ""].filter(Boolean).join(" ");

  return `Olá! Quero saber mais sobre o plano ${planLabel}.`;
}

export function Plans() {
  const { config, plans } = useSiteContent();

  return (
    <section id="planos" className="section-spacing-wide relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[12%] top-[12%] h-64 w-64 rounded-full bg-primary/10 blur-[110px]" />
        <div className="absolute bottom-[8%] right-[8%] h-80 w-80 rounded-full bg-primary/12 blur-[130px]" />
      </div>

      <div className="container mx-auto min-w-0 px-4 sm:px-5">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-primary">
            Planos residenciais
          </span>
          <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
            Compare rápido e escolha a{" "}
            <span className="text-gradient">velocidade certa.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Encontre uma opção para sua rotina e conte com atendimento próximo
            para confirmar todos os detalhes da contratação.
          </p>
        </div>

        <div className="plans-grid mx-auto max-w-7xl">
          {plans.map((plan, index) => {
            const mainBenefit = getPlanBenefit(plan);
            const wifiTechnology = getWifiTechnology(plan);
            const visibleFeatures = plan.features
              .filter((feature) => feature.trim().length > 0)
              .slice(0, PLAN_FEATURE_LIMIT);
            const featuredLabel = plan.badge || "Recomendado";
            const priceAvailable = hasPublishedPrice(plan);

            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.05 }}
                className={`plan-card group ${plan.highlight ? "plan-card-featured" : ""}`}
              >
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary">
                      {plan.audience || "Plano GNS Fibra"}
                    </span>
                    <h3 className="mt-3 text-xl font-black uppercase leading-tight">
                      {plan.name || "Plano"}
                    </h3>
                  </div>

                  {plan.highlight && (
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-wide text-primary-foreground">
                      <Star className="h-3.5 w-3.5" aria-hidden="true" />
                      {featuredLabel}
                    </span>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-[auto_1fr] items-end gap-x-3 gap-y-2 rounded-2xl border border-border/70 bg-background/35 p-4">
                  <Gauge className="mb-1 h-6 w-6 text-primary" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="flex min-w-0 flex-wrap items-end gap-2">
                      <span className="font-display text-5xl font-black leading-none text-gradient">
                        {plan.speed || "-"}
                      </span>
                      <span className="pb-1 text-base font-black text-primary">
                        {plan.unit || "MEGA"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Velocidade do plano
                    </p>
                  </div>
                </div>

                <div className="mt-5 min-h-[4.5rem] border-b border-border/70 pb-5">
                  {priceAvailable ? (
                    <div className="flex min-w-0 flex-wrap items-end gap-1">
                      <span className="pb-1 text-sm font-bold text-muted-foreground">R$</span>
                      <span className="font-display text-4xl font-black leading-none">
                        {plan.price}
                      </span>
                      <span className="pb-1 text-sm font-semibold text-muted-foreground">
                        /mês
                      </span>
                    </div>
                  ) : (
                    <p className="text-2xl font-black">Sob consulta</p>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    Condições confirmadas no atendimento.
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl bg-primary/10 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      Benefício principal
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6">{mainBenefit}</p>
                  </div>

                  {wifiTechnology && (
                    <div className="flex items-center gap-3 rounded-2xl border border-border/70 px-4 py-3 text-sm">
                      <Router className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                      <span className="font-semibold">{wifiTechnology}</span>
                    </div>
                  )}
                </div>

                <ul className="mt-5 flex-1 space-y-3">
                  {visibleFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-foreground/82">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/12">
                        <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappLink(config.contact.whatsappUrl, getPlanMessage(plan))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-black transition-all ${
                    plan.highlight
                      ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-brand hover:scale-[1.015]"
                      : "border border-primary/55 text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Quero este plano
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </motion.article>
            );
          })}
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-border/70 bg-card/60 p-4 text-sm leading-6 text-muted-foreground">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p>
            Cobertura, instalação, equipamentos e condições comerciais são
            confirmados durante o atendimento.
          </p>
        </div>
      </div>
    </section>
  );
}
