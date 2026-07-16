import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import faqMascot from "@/assets/mascote/v2/faq-pensando.png";
import { useSiteContent } from "@/content/SiteContentProvider";
import { whatsappLink } from "@/lib/site-content";

const FAQ_JSON_LD_ID = "gns-faq-json-ld";

function normalizeJsonLdText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function FAQ() {
  const { config, faqs } = useSiteContent();
  const [openId, setOpenId] = useState<string | null>(null);
  const activeFaqs = useMemo(() => faqs.filter((faq) => faq.active), [faqs]);

  useEffect(() => {
    const existingScript = document.getElementById(FAQ_JSON_LD_ID);

    if (activeFaqs.length === 0) {
      existingScript?.remove();
      return;
    }

    if (existingScript && !(existingScript instanceof HTMLScriptElement)) {
      existingScript.remove();
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: activeFaqs.map((faq) => ({
        "@type": "Question",
        name: normalizeJsonLdText(faq.question),
        acceptedAnswer: {
          "@type": "Answer",
          text: normalizeJsonLdText(faq.answer),
        },
      })),
    };

    const script =
      existingScript instanceof HTMLScriptElement
        ? existingScript
        : document.createElement("script");
    script.id = FAQ_JSON_LD_ID;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema).replace(/</g, "\\u003c");

    if (!existingScript) {
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(FAQ_JSON_LD_ID)?.remove();
    };
  }, [activeFaqs]);

  if (activeFaqs.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="section-spacing-standard relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      </div>

      <div className="container mx-auto min-w-0 px-4 sm:px-5">
        <div className="grid gap-10 lg:grid-cols-[minmax(14rem,0.42fr)_minmax(0,0.58fr)] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="min-w-0"
          >
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-primary">
              Perguntas frequentes
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
              Dúvidas antes de se conectar?{" "}
              <span className="text-gradient">A gente ajuda a esclarecer.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              Reunimos respostas objetivas para orientar sua contratação,
              atendimento e acesso aos canais da GNS Fibra.
            </p>

            <motion.figure
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="faq-mascot-stage"
              aria-hidden="true"
            >
              <img
                src={faqMascot}
                alt=""
                width={515}
                height={840}
                loading="lazy"
                decoding="async"
                className="faq-mascot-image pointer-events-none"
              />
            </motion.figure>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="min-w-0"
          >
            <div className="space-y-3">
              {activeFaqs.map((faq) => {
                const isOpen = openId === faq.id;
                const buttonId = `faq-button-${faq.id}`;
                const panelId = `faq-panel-${faq.id}`;

                return (
                  <article key={faq.id} className="faq-item">
                    <h3 className="font-sans text-base font-bold">
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenId(isOpen ? null : faq.id)}
                        className="flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-foreground transition-colors hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        <span className="min-w-0 leading-snug">{faq.question}</span>
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-card/65 text-primary">
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      aria-hidden={!isOpen}
                      className={`grid transition-[grid-template-rows,opacity] duration-200 ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="px-5 pb-5 pt-1 text-sm leading-7 text-muted-foreground">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 rounded-3xl border border-primary/25 bg-primary/10 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-brand">
                    <HelpCircle className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold">
                      Precisa de ajuda com outra dúvida?
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Fale com a equipe e informe seu endereço ou serviço atual.
                    </p>
                  </div>
                </div>
                <a
                  href={whatsappLink(
                    config.contact.whatsappUrl,
                    "Olá! Tenho uma dúvida sobre a GNS Fibra.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-primary/40 bg-card/70 px-5 py-3 text-center text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Tirar dúvida pelo WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
