import { motion } from "framer-motion";
import { Camera, Clock3, UsersRound } from "lucide-react";
import { useSiteContent } from "@/content/SiteContentProvider";

export function History() {
  const { config, historyGallery } = useSiteContent();

  return (
    <section id="quem-somos" className="relative py-24 md:py-32">
      <div className="container mx-auto px-5">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Quem somos
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
              Nossa <span className="text-gradient">História</span>
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              {config.company.aboutText}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Nossa trajetória é construída diariamente por uma equipe que conhece
              a região, investe em infraestrutura e entende que conexão de qualidade
              também depende de atendimento humano.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border bg-card/50 p-4">
                <Clock3 className="h-5 w-5 text-primary" />
                <strong className="mt-3 block font-display text-xl">
                  {config.company.yearsActive}+ anos
                </strong>
                <span className="text-xs text-muted-foreground">de experiência</span>
              </div>
              <div className="rounded-2xl border border-border bg-card/50 p-4">
                <UsersRound className="h-5 w-5 text-primary" />
                <strong className="mt-3 block font-display text-xl">Equipe local</strong>
                <span className="text-xs text-muted-foreground">próxima do cliente</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {historyGallery.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08 }}
                className={`group relative min-h-64 overflow-hidden rounded-3xl border border-border bg-card ${
                  index === 0 ? "sm:col-span-2 sm:min-h-80" : ""
                }`}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width={1280}
                    height={1280}
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-card to-background">
                    <Camera className="h-12 w-12 text-primary/30" />
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
        </div>
      </div>
    </section>
  );
}
