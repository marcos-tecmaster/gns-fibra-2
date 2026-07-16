import { siteContent } from "@/lib/site-content";
import type { ContentProvider, CoverageArea, SiteContent } from "@/content/types";

type ApiSettings = Partial<Record<
  | "company_name"
  | "whatsapp"
  | "email"
  | "address"
  | "customer_portal_url"
  | "linktree_url"
  | "facebook_url"
  | "instagram_url"
  | "coverage_map_url"
  | "hero_title"
  | "about_text"
  | "years_in_market",
  string
>>;

type ApiPlan = {
  id: number;
  name: string;
  speed: string;
  unit: string;
  price: number;
  audience: string;
  benefits: string[];
  payment_method: string;
  featured: boolean;
};

type ApiCoverage = {
  id: number;
  region: string;
  description: string;
  map_url?: string;
  link_mapa?: string;
};

type ApiTestimonial = {
  id: number;
  customer_name: string;
  testimonial_text: string;
  city: string;
};

type ApiFaq = {
  id: number;
  question: string;
  answer: string;
  active?: boolean;
  display_order?: number;
};

type SiteContentApiResponse = {
  settings?: ApiSettings;
  plans?: ApiPlan[];
  coverage?: ApiCoverage[];
  testimonials?: ApiTestimonial[];
  faqs?: ApiFaq[];
  error?: string;
};

const API_URL =
  import.meta.env.VITE_SITE_CONTENT_API ??
  new URL("api/site-content.php", document.baseURI).toString();
const REQUEST_TIMEOUT_MS = 5000;

function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function formatWhatsappDisplay(url: string, fallback: string): string {
  const digits = url.replace(/\D/g, "").replace(/^55/, "");
  if (/^0800\d{7}$/.test(digits)) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return fallback;
}

function normalizeCoverage(items: ApiCoverage[]): CoverageArea[] {
  return items
    .filter((item) => Boolean(item.region))
    .map((item) => ({
      id: String(item.id),
      region: item.region,
      description: item.description || "",
      mapUrl: item.map_url || item.link_mapa || "",
    }));
}

function normalizeFaqs(items: ApiFaq[]): SiteContent["faqs"] {
  return items
    .map((item) => ({
      id: String(item.id),
      question: String(item.question ?? "").trim(),
      answer: String(item.answer ?? "").trim(),
      active: true,
    }))
    .filter((item) => item.question !== "" && item.answer !== "");
}

function normalizeContent(response: SiteContentApiResponse): SiteContent {
  const settings = response.settings ?? {};
  const coverage = Array.isArray(response.coverage) ? response.coverage : null;
  const normalizedCoverage =
    coverage !== null ? normalizeCoverage(coverage) : siteContent.coverageAreas;
  const remotePlans = Array.isArray(response.plans) ? response.plans : null;
  const remoteTestimonials = Array.isArray(response.testimonials)
    ? response.testimonials
    : null;
  const remoteFaqs = Array.isArray(response.faqs) ? response.faqs : null;
  const whatsappUrl = settings.whatsapp || siteContent.config.contact.whatsappUrl;

  return {
    ...siteContent,
    config: {
      ...siteContent.config,
      company: {
        ...siteContent.config.company,
        name: settings.company_name || siteContent.config.company.name,
        yearsActive:
          Number.parseInt(settings.years_in_market ?? "", 10) ||
          siteContent.config.company.yearsActive,
        heroTitle: settings.hero_title || siteContent.config.company.heroTitle,
        aboutText: settings.about_text || siteContent.config.company.aboutText,
        description: settings.about_text || siteContent.config.company.description,
      },
      contact: {
        ...siteContent.config.contact,
        whatsappUrl,
        whatsappDisplay: formatWhatsappDisplay(
          whatsappUrl,
          siteContent.config.contact.whatsappDisplay,
        ),
        phone: formatWhatsappDisplay(
          whatsappUrl,
          siteContent.config.contact.phone,
        ),
        email: settings.email || siteContent.config.contact.email,
        address: settings.address || siteContent.config.contact.address,
        servicePoints: normalizedCoverage,
      },
      links: {
        ...siteContent.config.links,
        customerPortal:
          settings.customer_portal_url || siteContent.config.links.customerPortal,
        coverageMap:
          settings.coverage_map_url ||
          normalizedCoverage.find((item) => item.mapUrl)?.mapUrl ||
          siteContent.config.links.coverageMap,
        linktree: settings.linktree_url || siteContent.config.links.linktree,
        facebook: settings.facebook_url || siteContent.config.links.facebook,
        instagram: settings.instagram_url || siteContent.config.links.instagram,
      },
    },
    plans:
      remotePlans !== null
        ? remotePlans.map((plan) => ({
            id: String(plan.id),
            name: plan.name,
            audience: plan.audience,
            speed: plan.speed,
            unit: plan.unit,
            price: formatPrice(Number(plan.price)),
            highlight: Boolean(plan.featured),
            badge: plan.featured ? "Mais contratado" : undefined,
            features: [
              ...(Array.isArray(plan.benefits) ? plan.benefits : []),
              ...(
                plan.payment_method &&
                !plan.benefits?.some((benefit) =>
                  benefit.toLocaleLowerCase("pt-BR").includes(
                    plan.payment_method.toLocaleLowerCase("pt-BR"),
                  ),
                )
                  ? [`Pagamento: ${plan.payment_method}`]
                  : []
              ),
            ],
          }))
        : siteContent.plans,
    coverageAreas: normalizedCoverage,
    testimonials:
      remoteTestimonials !== null
        ? remoteTestimonials.map((testimonial) => ({
            id: String(testimonial.id),
            name: testimonial.customer_name,
            role: testimonial.city || "Cliente GNS Fibra",
            text: testimonial.testimonial_text,
            rating: 5,
          }))
        : siteContent.testimonials,
    faqs: remoteFaqs !== null ? normalizeFaqs(remoteFaqs) : siteContent.faqs,
  };
}

async function fetchSiteContent(): Promise<SiteContent> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(API_URL, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Site content request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as SiteContentApiResponse;
    if (payload.error) {
      throw new Error(payload.error);
    }

    return normalizeContent(payload);
  } finally {
    window.clearTimeout(timeout);
  }
}

export const apiContentProvider: ContentProvider = {
  async getContent() {
    try {
      return await fetchSiteContent();
    } catch (error) {
      console.warn("API de conteúdo indisponível; usando conteúdo local.", error);
      return siteContent;
    }
  },
};
