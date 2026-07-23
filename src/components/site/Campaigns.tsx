import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Megaphone } from "lucide-react";
import { useSiteContent } from "@/content/SiteContentProvider";
const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
function formatCampaignDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return value;
  }
  return dateFormatter.format(new Date(Date.UTC(year, month - 1, day)));
}
function isExternalCampaignUrl(url: string): boolean {
  if (url.startsWith("#")) {
    return false;
  }
  try {
    const parsedUrl = new URL(url, window.location.origin);
    return parsedUrl.origin !== window.location.origin;
  } catch {
    return false;
  }
}
export function Campaigns() {
  const { campaigns } = useSiteContent();
  if (campaigns.length === 0) {
    return null;
  }
  return (
    <section
      id="campanhas"
      className="section-spacing-standard relative overflow-hidden"
      aria-labelledby="campaigns-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"
        aria-hidden="true"
      />
      <div className="container relative mx-auto min-w-0 px-4 sm:px-5">
        <div className="mx-auto mb-9 max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-primary">
            Campanhas GNS Fibra
          </span>
          <h2
            id="campaigns-title"
            className="mt-4 text-3xl font-black leading-tight md:text-5xl"
          >
            Condições especiais para{" "}
            <span className="text-gradient">conectar você.</span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
            Confira as campanhas vigentes e consulte todas as condições antes
            da contratação.
          </p>
        </div>
        <div className="grid gap-6">
          {campaigns.map((campaign, index) => {
            const externalUrl = isExternalCampaignUrl(campaign.ctaUrl);
            return (
              <motion.article
                key={campaign.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className={`overflow-hidden rounded-[2rem] border border-primary/25 bg-card shadow-card ${
                  campaign.image
                    ? "grid lg:grid-cols-[0.9fr_1.1fr]"
                    : ""
                }`}
              >
                {campaign.image ? (
                  <div className="relative aspect-[3/2] overflow-hidden bg-muted lg:aspect-auto lg:min-h-full">
                    <img
                      src={campaign.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className="absolute inset-0 bg-background/15"
                      aria-hidden="true"
                    />
                    <img
                      src={campaign.image}
                      alt={campaign.imageAlt ?? ""}
                      className="relative z-10 h-full w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div className="hidden min-h-56 place-items-center bg-primary/10 lg:grid">
                    <div className="grid h-28 w-28 place-items-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                      <Megaphone className="h-14 w-14" aria-hidden="true" />
                    </div>
                  </div>
                )}
                <div className="flex min-w-0 flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    {campaign.eyebrow && (
                      <span className="rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        {campaign.eyebrow}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground sm:text-sm">
                      <CalendarDays
                        className="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
                      {formatCampaignDate(campaign.startsOn)} até{" "}
                      {formatCampaignDate(campaign.endsOn)}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
                    {campaign.headline}
                  </h3>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                    {campaign.description}
                  </p>
                  {campaign.terms && (
                    <details className="mt-5 rounded-2xl border border-border/70 bg-background/50 p-4">
                      <summary className="cursor-pointer text-sm font-bold text-foreground">
                        Ver condições da campanha
                      </summary>
                      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                        {campaign.terms}
                      </p>
                    </details>
                  )}
                  <div className="mt-6">
                    <a
                      href={campaign.ctaUrl}
                      target={externalUrl ? "_blank" : undefined}
                      rel={externalUrl ? "noopener noreferrer" : undefined}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {campaign.ctaLabel}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}