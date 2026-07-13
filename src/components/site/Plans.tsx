import { motion } from "framer-motion";
import { Check, MessageCircle, Sparkles } from "lucide-react";
import { useSiteContent } from "@/content/SiteContentProvider";
import { whatsappLink } from "@/lib/site-content";

export function Plans() {
  const { config, plans } = useSiteContent();

  return (
    <section id="planos" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      </div>

      <div className="container mx-auto min-w-0 px-4 sm:px-5">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Planos residenciais
          </span>
          <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
            Escolha a velocidade ideal para{" "}
            <span className="text-gradient">sua rotina.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Fibra óptica, Wi-Fi e suporte especializado em todos os planos.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3 xl:items-stretch">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`relative min-w-0 flex flex-col overflow-hidden rounded-3xl p-5 transition-all duration-500 min-[390px]:p-7 sm:p-8 ${
                plan.highlight
                  ? "border-2 border-primary bg-gradient-to-b from-primary/18 via-card to-card shadow-brand xl:-translate-y-3"
                  : "card-premium hover:-translate-y-1 hover:border-primary/50"
              }`}
            >
              {plan.highlight && (
                <div className="absolute inset-x-0 top-0 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-glow py-2 text-xs font-black uppercase tracking-[0.14em] text-primary-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  {plan.badge}
                </div>
              )}

              <div className={plan.highlight ? "pt-7" : ""}>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {plan.audience}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-wider">
                  {plan.name}
                </h3>
                <div className="mt-7 flex min-w-0 flex-wrap items-end gap-2">
                  <span className="break-all font-display text-5xl font-black leading-none text-gradient sm:text-6xl">
                    {plan.speed}
                  </span>
                  <span className="pb-1 text-lg font-black text-primary">{plan.unit}</span>
                </div>
                <div className="mt-6 flex min-w-0 flex-wrap items-end gap-1 border-b border-border/70 pb-7">
                  <span className="pb-1 text-sm font-bold">R$</span>
                  <span className="font-display text-4xl font-black">{plan.price}</span>
                  <span className="pb-1 text-sm text-muted-foreground">/mês</span>
                </div>
              </div>

              <ul className="flex-1 space-y-3 py-7">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/12">
                      <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={whatsappLink(
                  config.contact.whatsappUrl,
                  `Olá! Quero assinar o plano ${plan.name} (${plan.speed} ${plan.unit}).`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all ${
                  plan.highlight
                    ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-brand hover:scale-[1.02]"
                    : "border border-primary/55 text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                Quero este plano
              </a>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Consulte cobertura, condições comerciais e disponibilidade para o seu endereço.
        </p>
      </div>
    </section>
  );
}
