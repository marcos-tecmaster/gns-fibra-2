import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useSiteContent } from "@/content/SiteContentProvider";

export function Testimonials() {
  const { testimonials } = useSiteContent();

  return (
    <section id="depoimentos" className="section-spacing-standard relative overflow-hidden">
      <div className="container mx-auto px-5">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Experiência dos clientes
          </span>
          <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
            Confiança construída em{" "}
            <span className="text-gradient">cada conexão.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Veja como a conexão e o atendimento da GNS Fibra fazem parte da
            rotina dos nossos clientes.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              className="card-premium group relative flex min-h-72 flex-col rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1"
            >
              <Quote className="absolute right-5 top-5 h-10 w-10 text-primary/12 transition-colors group-hover:text-primary/20" />
              <div
                className="mb-5 flex gap-1"
                aria-label={`${testimonial.rating} de 5 estrelas`}
              >
                {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="h-4 w-4 fill-primary text-primary"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground/80">
                “{testimonial.text}”
              </blockquote>
              <div className="mt-6 border-t border-border/60 pt-5">
                <div className="font-bold">{testimonial.name}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {testimonial.role}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
