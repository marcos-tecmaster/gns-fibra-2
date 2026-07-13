import { useEffect, useState } from "react";
import { ExternalLink, Menu, MessageCircle, UserRound, X } from "lucide-react";
import { useSiteContent } from "@/content/SiteContentProvider";
import { whatsappLink } from "@/lib/site-content";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { config, navigation } = useSiteContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const logoUrl = `${import.meta.env.BASE_URL}logo-gns.png`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? "border-border/60 bg-background/95 py-2.5 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "border-transparent bg-gradient-to-b from-background/85 to-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex min-w-0 items-center justify-between gap-2 px-4 sm:gap-4 sm:px-5">
        <a href="#inicio" className="group flex min-w-0 shrink items-center gap-2.5" aria-label="GNS Fibra">
          <img
            src={logoUrl}
            alt="GNS Fibra"
            width={60}
            height={60}
            className="h-12 w-12 shrink-0 object-contain lg:h-15 lg:w-15"
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-xs font-black tracking-wider text-foreground min-[370px]:text-sm sm:text-base">
              {config.company.name.toUpperCase()}
            </div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-[10px]">
              Fibra Óptica 
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-2 text-xs font-semibold text-foreground/75 transition-colors hover:text-primary"
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
            className="hidden items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2.5 text-xs font-bold text-foreground transition-colors hover:border-primary/60 hover:text-primary lg:inline-flex"
          >
            <UserRound className="h-4 w-4" />
            Central do Assinante
          </a>
          <a
            href={whatsappLink(config.contact.whatsappUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-brand transition-transform hover:scale-[1.03] md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card/80 text-foreground xl:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-4 mt-3 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-border bg-card p-4 shadow-2xl xl:hidden">
          <nav className="grid gap-1" aria-label="Navegação mobile">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground/90 hover:bg-primary/10 hover:text-primary"
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
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-bold"
            >
              <UserRound className="h-4 w-4" />
              Central do Assinante
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
            <a
              href={whatsappLink(config.contact.whatsappUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-4 py-3 text-sm font-bold text-primary-foreground"
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
