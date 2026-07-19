import { motion } from "framer-motion";
import { Database, ExternalLink, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import datacenterImg from "@/assets/datacenter.jpg";
import { useSiteContent } from "@/content/SiteContentProvider";
import { whatsappLink } from "@/lib/site-content";

function normalizeCoverageSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

export function Coverage() {
  const { config, coverageAreas, sectionImages } = useSiteContent();
  const coverageImage = sectionImages.coverage || datacenterImg;
  const [query, setQuery] = useState("");

  const filteredAreas = useMemo(() => {
    const normalizedQuery = normalizeCoverageSearch(query);
    if (!normalizedQuery) return coverageAreas;

    return coverageAreas.filter((area) => {
      const searchableContent = normalizeCoverageSearch(
        `${area.region} ${area.description}`,
      );
      return searchableContent.includes(normalizedQuery);
    });
  }, [coverageAreas, query]);

  return (
    <section id="cobertura" className="section-spacing-standard relative">
      <div className="container mx-auto min-w-0 px-4 sm:px-5">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="card-premium relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-square"
          >
            <img
              src={coverageImage}
              alt="Infraestrutura de rede da GNS Fibra"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              width={1280}
              height={1280}
              onError={(event) => {
                if (event.currentTarget.dataset.fallbackApplied !== "true") {
                  event.currentTarget.dataset.fallbackApplied = "true";
                  event.currentTarget.src = datacenterImg;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Expansão contínua
                </span>
              </div>
              <h3 className="max-w-md font-display text-2xl font-bold sm:text-3xl">
                Uma rede construída para chegar cada vez mais longe.
              </h3>
            </div>
          </motion.div>

          <div className="min-w-0">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Área de cobertura
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
              Consulte a fibra disponível{" "}
              <span className="text-gradient">na sua região.</span>
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Consulte nossos pontos de atendimento ou abra o mapa completo para
              verificar a área de cobertura da GNS Fibra.
            </p>

            <label className="relative mt-8 block">
              <span className="sr-only">Pesquisar ponto de atendimento</span>
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                id="coverage-search"
                name="coverage-search"
                type="search"
                placeholder="Pesquise uma cidade ou ponto de atendimento"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-2xl border border-border bg-card py-4 pl-12 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25"
              />
            </label>

            <div className="mt-5 min-h-32 rounded-2xl border border-border/70 bg-card/35 p-4">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <span>{filteredAreas.length} região(ões) encontrada(s)</span>
                <span className="inline-flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-primary" />
                  Dados centralizados
                </span>
              </div>
              <div className="grid max-h-64 gap-2 overflow-y-auto pr-1">
                {filteredAreas.length > 0 ? (
                  filteredAreas.map((area) => {
                    const description = area.description.trim();
                    const itemClass =
                      "group flex min-w-0 items-start gap-3 rounded-xl border border-border bg-background/60 p-3 text-left text-foreground transition-colors";
                    const content = (
                      <>
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <MapPin className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <strong className="block break-words text-sm font-semibold leading-snug">
                            {area.region}
                          </strong>
                          {description ? (
                            <span className="mt-1 block break-words text-xs leading-relaxed text-muted-foreground">
                              {description}
                            </span>
                          ) : null}
                        </span>
                        {area.mapUrl ? (
                          <ExternalLink
                            className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                            aria-hidden="true"
                          />
                        ) : null}
                      </>
                    );

                    return area.mapUrl ? (
                      <a
                        key={area.id}
                        href={area.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${itemClass} cursor-pointer hover:border-primary/60 hover:bg-primary/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={area.id} className={itemClass}>
                        {content}
                      </div>
                    );
                  })
                ) : (
                  <p className="py-4 text-sm text-muted-foreground">
                    Não encontrou sua região? Consulte seu endereço diretamente com nossa equipe.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink(
                  config.contact.whatsappUrl,
                  "Olá! Quero verificar a cobertura da GNS Fibra no meu endereço.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-glow px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-brand"
              >
                Consultar meu endereço
              </a>
              <a
                href={config.links.coverageMap}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                Ver mapa de cobertura
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
