import { useEffect, useState } from "react";
import { ExternalLink, Menu, MessageCircle, UserRound, X } from "lucide-react";
import { useSiteContent } from "@/content/SiteContentProvider";
import { whatsappLink } from "@/lib/site-content";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";

const mobileMenuId = "site-mobile-menu";
const sectionNavigation = [
  { id: "inicio", href: "#inicio" },
  { id: "planos", href: "#planos" },
  { id: "beneficios", href: "#planos" },
  { id: "tecnologias", href: "#planos" },
  { id: "empresarial", href: "#empresarial" },
  { id: "cobertura", href: "#cobertura" },
  { id: "quem-somos", href: "#quem-somos" },
  { id: "depoimentos", href: "#quem-somos" },
  { id: "faq", href: "#faq" },
  { id: "contato", href: "#contato" },
] as const;

export function Header() {
  const { config, navigation } = useSiteContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionNavigation
      .map(({ id, href }) => {
        const element = document.getElementById(id);
        return element ? { element, href } : null;
      })
      .filter((section): section is NonNullable<typeof section> => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (!visibleEntry) return;

        const section = sections.find(({ element }) => element === visibleEntry.target);
        if (section) setActiveHref(section.href);
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      },
    );

    sections.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? "border-border/70 bg-background/92 py-2 shadow-elevated backdrop-blur-xl"
          : "border-transparent bg-gradient-to-b from-background/88 to-background/20 py-3.5"
      }`}
    >
      <div className="container mx-auto flex min-h-14 min-w-0 items-center justify-between gap-2 px-4 sm:gap-4 sm:px-5">
        <a
          href="#inicio"
          className="group flex min-w-0 shrink items-center gap-2.5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          aria-label={`${config.company.name} - Início`}
        >
          <BrandLogo
            src={config.company.logoUrl}
            alt={`${config.company.name} - Logo`}
            width={60}
            height={60}
            className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12 lg:h-14 lg:w-14"
            loading="eager"
            fetchPriority="high"
          />
          <div className="hidden min-w-0 leading-tight min-[360px]:block">
            <div className="truncate font-display text-sm font-black tracking-normal text-foreground sm:text-base">
              {config.company.name.toUpperCase()}
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-normal text-primary sm:text-[11px]">
              Fibra óptica
            </div>
          </div>
        </a>

        <nav
          className="hidden items-center gap-0.5 rounded-full border border-border/70 bg-card/50 p-1 shadow-card backdrop-blur-xl xl:flex"
          aria-label="Navegação principal"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeHref === item.href ? "location" : undefined}
              className={`rounded-full px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-offset-0 ${
                activeHref === item.href
                  ? "bg-primary text-primary-foreground shadow-brand hover:bg-primary hover:text-primary-foreground"
                  : "text-foreground/75 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={config.links.customerPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-full border border-border bg-card/65 px-4 py-2 text-xs font-bold text-foreground transition-colors hover:border-primary/60 hover:text-primary lg:inline-flex"
          >
            <UserRound className="h-4 w-4" />
            Central do Assinante
          </a>
          <a
            href={whatsappLink(config.contact.whatsappUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-4 py-2 text-xs font-bold text-primary-foreground shadow-brand transition-transform hover:scale-[1.03] md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            Falar no WhatsApp
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card/80 text-foreground transition-colors hover:border-primary/60 hover:text-primary xl:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls={mobileMenuId}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id={mobileMenuId}
          className="mx-4 mt-3 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-border bg-card/98 p-4 shadow-elevated backdrop-blur-xl xl:hidden"
        >
          <nav className="grid gap-1" aria-label="Navegação mobile">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={activeHref === item.href ? "location" : undefined}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  activeHref === item.href
                    ? "bg-primary text-primary-foreground shadow-brand hover:bg-primary hover:text-primary-foreground"
                    : "text-foreground/90 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 grid gap-2 border-t border-border pt-4 sm:grid-cols-2">
            <a
              href={config.links.customerPortal}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-bold transition-colors hover:border-primary/60 hover:text-primary"
            >
              <UserRound className="h-4 w-4" />
              Central do Assinante
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
            <a
              href={whatsappLink(config.contact.whatsappUrl)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-4 py-3 text-sm font-bold text-primary-foreground shadow-brand"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
