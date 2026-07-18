import { motion } from "framer-motion";
import { Camera, Clock3, UsersRound } from "lucide-react";
import { useSiteContent } from "@/content/SiteContentProvider";

export function History() {
  const { config, history, historyGallery } = useSiteContent();
  const visibleGallery = historyGallery.filter((item) => item.active !== false);

  if (!history.enabled) {
    return null;
  }

  return (
    <section id="quem-somos" className="section-spacing-standard relative">
      <div className="container mx-auto px-5">
        <div
          className={`grid gap-12 lg:items-end ${
            visibleGallery.length > 0
              ? "lg:grid-cols-[0.8fr_1.2fr]"
              : "mx-auto max-w-3xl"
          }`}
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {history.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
              {history.title} <span className="text-gradient">{history.titleHighlight}</span>
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              {history.description}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {history.secondaryText}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border bg-card/50 p-4">
                <Clock3 className="h-5 w-5 text-primary" />
                <strong className="mt-3 block font-display text-xl">
                  {config.company.yearsActive}{history.experienceSuffix}
                </strong>
                <span className="text-xs text-muted-foreground">{history.experienceLabel}</span>
              </div>
              <div className="rounded-2xl border border-border bg-card/50 p-4">
                <UsersRound className="h-5 w-5 text-primary" />
                <strong className="mt-3 block font-display text-xl">{history.teamTitle}</strong>
                <span className="text-xs text-muted-foreground">{history.teamDescription}</span>
              </div>
            </div>
          </div>

          {visibleGallery.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {visibleGallery.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08 }}
                className={`group relative min-h-64 overflow-hidden rounded-3xl border border-border bg-card ${
                  index === 0 && visibleGallery.length > 1 ? "sm:col-span-2 sm:min-h-80" : ""
                }`}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width={1280}
                    height={1280}
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-card to-background">
                    <Camera className="h-12 w-12 text-primary/30" aria-hidden="true" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-foreground/70">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
