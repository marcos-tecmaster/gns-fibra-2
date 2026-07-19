import {
  Github,
  Facebook,
  Instagram,
  Linkedin,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useSiteContent } from "@/content/SiteContentProvider";

const socialClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border text-foreground/75 transition-colors hover:border-primary hover:text-primary";

export function Footer() {
  const { config, navigation } = useSiteContent();
  const logoUrl = `${import.meta.env.BASE_URL}logo-gns.png`;
  const officialSocials = [
    { label: "Instagram da GNS Fibra", href: config.links.instagram, icon: Instagram },
    { label: "Facebook da GNS Fibra", href: config.links.facebook, icon: Facebook },
    { label: "Linktree da GNS Fibra", href: config.links.linktree, icon: Link2 },
  ].filter((item) => Boolean(item.href));

  return (
    <footer className="relative border-t border-border/60 bg-card/45 pb-8 pt-16 backdrop-blur">
      <div className="container mx-auto min-w-0 px-4 sm:px-5">
        <div className="mb-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#inicio" className="mb-5 inline-flex items-center gap-2.5">
              <img src={logoUrl} alt="" width={44} height={44} className="h-11 w-11 rounded-xl object-contain" />
              <div className="leading-tight">
                <div className="font-display font-black tracking-wider">
                  {config.company.name.toUpperCase()}
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                  Fibra Óptica
                </div>
              </div>
            </a>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
              {config.company.description}
            </p>
            <a
              href={config.links.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground/80 transition-colors hover:border-primary hover:text-primary"
            >
              <Link2 className="h-4 w-4" />
              Acessar canais oficiais
            </a>
            {officialSocials.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-3" aria-label="Redes sociais oficiais">
                {officialSocials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={socialClass}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-5 font-display text-sm font-bold uppercase tracking-wider">
              Navegação
            </h2>
            <ul className="grid text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 min-w-11 items-center rounded-lg py-2 text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 font-display text-sm font-bold uppercase tracking-wider">
              Contato
            </h2>
            <ul className="grid gap-4 text-sm text-muted-foreground">
              <li>
                <a
                  href={config.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 transition-colors hover:text-primary"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{config.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.contact.email}`}
                  className="flex min-h-11 items-center gap-3 transition-colors hover:text-primary"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="break-all">{config.contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{config.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-border/70 bg-background/35 p-5">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider">
            Pontos de atendimento
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {config.contact.servicePoints.map((point) => {
              const chipClass =
                "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs text-foreground/80 transition-colors hover:border-primary/60 hover:text-primary";
              const content = (
                <>
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {point.region}
                </>
              );

              return point.mapUrl ? (
                <a
                  key={point.id}
                  href={point.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${chipClass} cursor-pointer`}
                >
                  {content}
                </a>
              ) : (
                <span key={point.id} className={chipClass}>
                  {content}
                </span>
              );
            })}
          </div>
        </div>

        <div className="min-w-0 border-t border-border/60 pt-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-xs leading-relaxed text-muted-foreground">
              <p>© {new Date().getFullYear()} {config.company.name}. Todos os direitos reservados.</p>
              <p className="mt-1">
                Desenvolvido por{" "}
                <a
                  href={config.developer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center font-semibold text-foreground transition-colors hover:text-primary"
                >
                  {config.developer.name}
                </a>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="mr-1 hidden text-xs text-muted-foreground sm:inline">
                Desenvolvedor:
              </span>
              <a href={config.developer.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn do desenvolvedor" className={socialClass}>
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={config.developer.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub do desenvolvedor" className={socialClass}>
                <Github className="h-4 w-4" />
              </a>
              <a href={config.developer.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp do desenvolvedor" className={socialClass}>
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
