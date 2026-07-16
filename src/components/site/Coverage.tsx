import { motion } from "framer-motion";
import { Database, ExternalLink, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import datacenterImg from "@/assets/datacenter.jpg";
import { useSiteContent } from "@/content/SiteContentProvider";
import { whatsappLink } from "@/lib/site-content";

export function Coverage() {
  const { config, coverageAreas } = useSiteContent();
  const [query, setQuery] = useState("");

  const filteredAreas = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    if (!normalizedQuery) return coverageAreas;

    return coverageAreas.filter((area) =>
      area.region.toLocaleLowerCase("pt-BR").includes(normalizedQuery),
    );
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
              src={datacenterImg}
              alt="Infraestrutura de rede da GNS Fibra"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              width={1280}
              height={1280}
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
              <div className="flex max-h-44 flex-wrap gap-2 overflow-y-auto">
                {filteredAreas.length > 0 ? (
                  filteredAreas.map((area) => {
                    const chipClass =
                      "inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-2 text-xs font-medium text-foreground/85 transition-colors hover:border-primary/60 hover:text-primary";
                    const content = (
                      <>
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {area.region}
                      </>
                    );

                    return area.mapUrl ? (
                      <a
                        key={area.id}
                        href={area.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${chipClass} cursor-pointer`}
                      >
                        {content}
                      </a>
                    ) : (
                      <span key={area.id} className={chipClass}>
                        {content}
                      </span>
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
