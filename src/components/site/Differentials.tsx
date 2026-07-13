import { motion } from "framer-motion";
import { Wifi, Zap, Headphones, ShieldCheck, Home } from "lucide-react";
import { useSiteContent } from "@/content/SiteContentProvider";

const ICONS = { wifi: Wifi, zap: Zap, headset: Headphones, shield: ShieldCheck, home: Home };

export function Differentials() {
  const { differentials } = useSiteContent();

  return (
    <section id="diferenciais" className="relative py-24 md:py-28">
      <div className="container mx-auto px-5">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
            Por que GNS Fibra
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-black leading-tight">
            Tecnologia, estabilidade e <span className="text-gradient">gente que resolve</span>.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {differentials.map((d, i) => {
            const Icon = ICONS[d.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-premium group rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 grid place-items-center mb-4 transition-all group-hover:shadow-brand">
                  <Icon className="w-7 h-7 text-primary" strokeWidth={2.2} />
                </div>
                <h3 className="font-display font-bold text-base mb-2 text-foreground uppercase tracking-wide">
                  {d.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
