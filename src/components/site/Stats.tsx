import { motion } from "framer-motion";
import { useSiteContent } from "@/content/SiteContentProvider";

export function Stats() {
  const { stats } = useSiteContent();

  return (
    <section className="relative border-y border-border/50 bg-card/35 py-14 backdrop-blur-sm">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-2 gap-7 md:grid-cols-4 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mb-2 font-display text-3xl font-black text-gradient sm:text-4xl md:text-5xl">
                {s.value}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground md:text-xs">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
