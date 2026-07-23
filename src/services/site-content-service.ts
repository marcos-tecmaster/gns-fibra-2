import { siteContent } from "@/lib/site-content";
import type {
  ContentProvider,
  CoverageArea,
  IconName,
  SiteContent,
} from "@/content/types";

type ApiSettings = Partial<Record<
  | "company_name"
  | "company_logo_path"
  | "whatsapp"
  | "email"
  | "address"
  | "customer_portal_url"
  | "linktree_url"
  | "facebook_url"
  | "instagram_url"
  | "coverage_map_url"
  | "coverage_image_path"
  | "hero_title"
  | "about_text"
  | "years_in_market"
  | "support_enabled"
  | "support_eyebrow"
  | "support_title"
  | "support_description"
  | "support_button_label"
  | "support_whatsapp_message"
  | "cta_enabled"
  | "cta_eyebrow"
  | "cta_title"
  | "cta_description"
  | "cta_button_label"
  | "cta_whatsapp_message"
  | "cta_background_image_path"
  | "history_enabled"
  | "history_eyebrow"
  | "history_title"
  | "history_title_highlight"
  | "history_description"
  | "history_secondary_text"
  | "history_experience_suffix"
  | "history_experience_label"
  | "history_team_title"
  | "history_team_description",
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

type ApiStat = {
  id: number;
  slug: string;
  value: string;
  label: string;
  active?: boolean;
  display_order?: number;
};

type ApiDifferential = {
  id: number;
  slug: string;
  icon: string;
  title: string;
  description: string;
  active?: boolean;
  display_order?: number;
};

type ApiHistoryGalleryItem = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image_path?: string | null;
  image_alt: string;
  active?: boolean;
  display_order?: number;
};

type ApiBanner = {
  id: number;
  image_path?: string | null;
  display_order?: number;
};

type ApiCampaign = {
  id: number;
  slug: string;
  eyebrow: string;
  headline: string;
  description: string;
  terms?: string | null;
  image_path?: string | null;
  image_alt: string;
  cta_label: string;
  cta_url: string;
  starts_on: string;
  ends_on: string;
};

type ApiBenefit = {
  id: number;
  slug: string;
  icon: string;
  title: string;
  description: string;
  cta_label?: string | null;
  cta_href?: string | null;
  active?: boolean;
  display_order?: number;
};

type ApiTechnology = {
  id: number;
  slug: string;
  icon: string;
  name: string;
  description: string;
  availability: string;
  active?: boolean;
  display_order?: number;
};

type SiteContentApiResponse = {
  settings?: ApiSettings;
  plans?: ApiPlan[];
  stats?: ApiStat[];
  differentials?: ApiDifferential[];
  history_gallery?: ApiHistoryGalleryItem[];
  banners?: ApiBanner[];
  campaigns?: ApiCampaign[];
  coverage?: ApiCoverage[];
  testimonials?: ApiTestimonial[];
  benefits?: ApiBenefit[];
  technologies?: ApiTechnology[];
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

function parseBooleanSetting(
  value: string | undefined,
  fallback: boolean,
): boolean {
  const normalizedValue = String(value ?? "").trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalizedValue)) {
    return true;
  }
  if (["0", "false", "no", "off"].includes(normalizedValue)) {
    return false;
  }

  return fallback;
}

function normalizeSettingText(
  value: string | undefined,
  fallback: string,
): string {
  const normalizedValue = String(value ?? "").trim();
  return normalizedValue !== "" ? normalizedValue : fallback;
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

function normalizeStats(items: ApiStat[]): SiteContent["stats"] {
  return items
    .map((item) => {
      const slug = String(item.slug ?? "").trim();
      const value = String(item.value ?? "").trim();
      const label = String(item.label ?? "").trim();

      return {
        id: slug,
        value,
        label,
        active: true,
      };
    })
    .filter((stat) => stat.id !== "" && stat.value !== "" && stat.label !== "");
}

const DIFFERENTIAL_ICONS = new Set<IconName>([
  "wifi",
  "zap",
  "headset",
  "shield",
  "home",
]);
const DIFFERENTIAL_ICON_FALLBACK: IconName = "wifi";

function normalizeDifferentialIcon(icon: string): IconName {
  const normalizedIcon = String(icon ?? "").trim() as IconName;
  return DIFFERENTIAL_ICONS.has(normalizedIcon)
    ? normalizedIcon
    : DIFFERENTIAL_ICON_FALLBACK;
}

function normalizeDifferentials(
  items: ApiDifferential[],
): SiteContent["differentials"] {
  return items
    .map((item) => {
      const slug = String(item.slug ?? "").trim();
      const title = String(item.title ?? "").trim();
      const description = String(item.description ?? "").trim();

      return {
        id: slug,
        icon: normalizeDifferentialIcon(item.icon),
        title,
        description,
        active: true,
      };
    })
    .filter(
      (differential) =>
        differential.id !== "" &&
        differential.title !== "" &&
        differential.description !== "",
    );
}

type PublicAssetPathOptions = {
  allowRemote?: boolean;
  allowedDirectories?: readonly string[];
};

function normalizePublicAssetPath(
  path: string | null | undefined,
  options: PublicAssetPathOptions = {},
): string | undefined {
  const normalizedPath = String(path ?? "").trim().replace(/\\/g, "/");
  if (
    normalizedPath === "" ||
    ["undefined", "null"].includes(normalizedPath.toLowerCase()) ||
    normalizedPath.includes("\0") ||
    normalizedPath.startsWith("//") ||
    normalizedPath.startsWith("../") ||
    normalizedPath.includes("/../")
  ) {
    return undefined;
  }

  try {
    const parsedUrl = new URL(normalizedPath);
    return options.allowRemote !== false && ["http:", "https:"].includes(parsedUrl.protocol)
      ? parsedUrl.toString()
      : undefined;
  } catch {
    const relativePath = normalizedPath.replace(/^\/+/, "");
    const pathMatch = /^uploads\/([A-Za-z0-9_-]+)\/[A-Za-z0-9._-]+\.(?:jpe?g|png|webp)$/i.exec(relativePath);
    if (
      pathMatch === null ||
      (options.allowedDirectories !== undefined &&
        !options.allowedDirectories.includes(pathMatch[1]))
    ) {
      return undefined;
    }
    const apiUrl = new URL(API_URL, document.baseURI);
    const apiBaseUrl = apiUrl.pathname.includes("/api/")
      ? new URL("../", apiUrl)
      : new URL(document.baseURI);
    return new URL(relativePath, apiBaseUrl).toString();
  }
}

function normalizeHistoryGallery(
  items: ApiHistoryGalleryItem[],
): SiteContent["historyGallery"] {
  return items
    .map((item) => {
      const slug = String(item.slug ?? "").trim();
      const title = String(item.title ?? "").trim();
      const description = String(item.description ?? "").trim();
      const imageAlt = String(item.image_alt ?? "").trim();
      const image = normalizePublicAssetPath(item.image_path);

      return {
        id: slug,
        title,
        description,
        image,
        imageAlt,
        active: true,
      };
    })
    .filter(
      (item) =>
        item.id !== "" &&
        item.title !== "" &&
        item.description !== "" &&
        item.imageAlt !== "",
    );
}

function normalizeBanners(items: ApiBanner[]): SiteContent["banners"] {
  return items
    .map((item) => ({
      id: Number.isInteger(item.id) && item.id > 0 ? String(item.id) : "",
      image: normalizePublicAssetPath(item.image_path),
    }))
    .filter((item) => item.id !== "");
}

function normalizeCampaigns(
  items: ApiCampaign[],
): SiteContent["campaigns"] {
  const campaigns: SiteContent["campaigns"] = [];
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  for (const item of items) {
    const id = String(item.slug ?? "").trim();
    const eyebrow = String(item.eyebrow ?? "").trim();
    const headline = String(item.headline ?? "").trim();
    const description = String(item.description ?? "").trim();
    const terms = String(item.terms ?? "").trim();
    const image = normalizePublicAssetPath(item.image_path, {
      allowRemote: false,
      allowedDirectories: ["campaigns"],
    });
    const imageAlt = String(item.image_alt ?? "").trim();
    const ctaLabel = String(item.cta_label ?? "").trim();
    const ctaUrl = String(item.cta_url ?? "").trim();
    const startsOn = String(item.starts_on ?? "").trim();
    const endsOn = String(item.ends_on ?? "").trim();
    const hasValidPeriod =
      datePattern.test(startsOn) &&
      datePattern.test(endsOn) &&
      endsOn >= startsOn;
    if (
      id === "" ||
      headline === "" ||
      description === "" ||
      ctaLabel === "" ||
      !isSafeBenefitHref(ctaUrl) ||
      !hasValidPeriod ||
      (image !== undefined && imageAlt === "")
    ) {
      continue;
    }
    campaigns.push({
      id,
      eyebrow,
      headline,
      description,
      terms: terms !== "" ? terms : undefined,
      image,
      imageAlt: image !== undefined ? imageAlt : undefined,
      ctaLabel,
      ctaUrl,
      startsOn,
      endsOn,
    });
  }
  return campaigns;
}

const BENEFIT_ICONS = new Set<IconName>([
  "wifi",
  "headset",
  "credit-card",
  "camera",
  "tv",
]);
const BENEFIT_ICON_FALLBACK: IconName = "wifi";

function normalizeBenefitIcon(icon: string): IconName {
  const normalizedIcon = String(icon ?? "").trim() as IconName;
  return BENEFIT_ICONS.has(normalizedIcon)
    ? normalizedIcon
    : BENEFIT_ICON_FALLBACK;
}

function isLocalHttpUrl(url: URL): boolean {
  return (
    url.hostname === "localhost" ||
    url.hostname === "127.0.0.1" ||
    url.hostname === "::1" ||
    url.hostname.endsWith(".localhost") ||
    url.hostname.endsWith(".test")
  );
}

function isSafeBenefitHref(href: string): boolean {
  if (/^#[A-Za-z0-9_-]+$/.test(href)) {
    return true;
  }

  try {
    const url = new URL(href, window.location.origin);
    if (url.protocol === "https:" || url.protocol === "mailto:" || url.protocol === "tel:") {
      return true;
    }
    return url.protocol === "http:" && isLocalHttpUrl(url);
  } catch {
    return false;
  }
}

function normalizeBenefits(items: ApiBenefit[]): SiteContent["benefits"] {
  return items
    .map((item) => {
      const slug = String(item.slug ?? "").trim();
      const title = String(item.title ?? "").trim();
      const description = String(item.description ?? "").trim();
      const ctaLabel = String(item.cta_label ?? "").trim();
      const ctaHref = String(item.cta_href ?? "").trim();
      const hasSafeCta = ctaLabel !== "" && ctaHref !== "" && isSafeBenefitHref(ctaHref);

      return {
        id: slug,
        icon: normalizeBenefitIcon(item.icon),
        title,
        description,
        ctaLabel: hasSafeCta ? ctaLabel : undefined,
        ctaHref: hasSafeCta ? ctaHref : undefined,
        active: true,
      };
    })
    .filter(
      (benefit) =>
        benefit.id !== "" &&
        benefit.title !== "" &&
        benefit.description !== "",
    );
}

const TECHNOLOGY_ICONS = new Set<IconName>([
  "network",
  "wifi",
  "shield",
  "home",
  "router",
  "zap",
  "headset",
]);
const TECHNOLOGY_ICON_FALLBACK: IconName = "network";

function normalizeTechnologyIcon(icon: string): IconName {
  const normalizedIcon = String(icon ?? "").trim() as IconName;
  return TECHNOLOGY_ICONS.has(normalizedIcon)
    ? normalizedIcon
    : TECHNOLOGY_ICON_FALLBACK;
}

function normalizeTechnologies(
  items: ApiTechnology[],
): SiteContent["technologies"] {
  return items
    .map((item) => {
      const slug = String(item.slug ?? "").trim();
      const name = String(item.name ?? "").trim();
      const description = String(item.description ?? "").trim();
      const availability = String(item.availability ?? "").trim();

      return {
        id: slug,
        icon: normalizeTechnologyIcon(item.icon),
        name,
        description,
        availability,
        active: true,
      };
    })
    .filter(
      (technology) =>
        technology.id !== "" &&
        technology.name !== "" &&
        technology.description !== "" &&
        technology.availability !== "",
    );
}

function normalizeContent(response: SiteContentApiResponse): SiteContent {
  const settings = response.settings ?? {};
  const coverage = Array.isArray(response.coverage) ? response.coverage : null;
  const normalizedCoverage =
    coverage !== null ? normalizeCoverage(coverage) : siteContent.coverageAreas;
  const remotePlans = Array.isArray(response.plans) ? response.plans : null;
  const remoteStats = Array.isArray(response.stats) ? response.stats : null;
  const remoteDifferentials = Array.isArray(response.differentials)
    ? response.differentials
    : null;
  const remoteHistoryGallery = Array.isArray(response.history_gallery)
    ? response.history_gallery
    : null;
  const remoteBanners = Array.isArray(response.banners) ? response.banners : null;
  const remoteCampaigns = Array.isArray(response.campaigns)
    ? response.campaigns
    : null;
  const remoteTestimonials = Array.isArray(response.testimonials)
    ? response.testimonials
    : null;
  const remoteBenefits = Array.isArray(response.benefits)
    ? response.benefits
    : null;
  const remoteTechnologies = Array.isArray(response.technologies)
    ? response.technologies
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
        logoUrl:
          normalizePublicAssetPath(settings.company_logo_path, {
            allowRemote: false,
            allowedDirectories: ["branding"],
          }) ?? siteContent.config.company.logoUrl,
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
    support: {
      enabled: parseBooleanSetting(
        settings.support_enabled,
        siteContent.support.enabled,
      ),
      eyebrow: normalizeSettingText(
        settings.support_eyebrow,
        siteContent.support.eyebrow,
      ),
      title: normalizeSettingText(
        settings.support_title,
        siteContent.support.title,
      ),
      description: normalizeSettingText(
        settings.support_description,
        siteContent.support.description,
      ),
      buttonLabel: normalizeSettingText(
        settings.support_button_label,
        siteContent.support.buttonLabel,
      ),
      whatsappMessage: normalizeSettingText(
        settings.support_whatsapp_message,
        siteContent.support.whatsappMessage,
      ),
    },
    cta: {
      enabled: parseBooleanSetting(settings.cta_enabled, siteContent.cta.enabled),
      eyebrow: normalizeSettingText(settings.cta_eyebrow, siteContent.cta.eyebrow),
      title: normalizeSettingText(settings.cta_title, siteContent.cta.title),
      description: normalizeSettingText(
        settings.cta_description,
        siteContent.cta.description,
      ),
      buttonLabel: normalizeSettingText(
        settings.cta_button_label,
        siteContent.cta.buttonLabel,
      ),
      whatsappMessage: normalizeSettingText(
        settings.cta_whatsapp_message,
        siteContent.cta.whatsappMessage,
      ),
    },
    history: {
      enabled: parseBooleanSetting(
        settings.history_enabled,
        siteContent.history.enabled,
      ),
      eyebrow: normalizeSettingText(
        settings.history_eyebrow,
        siteContent.history.eyebrow,
      ),
      title: normalizeSettingText(
        settings.history_title,
        siteContent.history.title,
      ),
      titleHighlight: normalizeSettingText(
        settings.history_title_highlight,
        siteContent.history.titleHighlight,
      ),
      description: normalizeSettingText(
        settings.history_description,
        siteContent.history.description,
      ),
      secondaryText: normalizeSettingText(
        settings.history_secondary_text,
        siteContent.history.secondaryText,
      ),
      experienceSuffix: normalizeSettingText(
        settings.history_experience_suffix,
        siteContent.history.experienceSuffix,
      ),
      experienceLabel: normalizeSettingText(
        settings.history_experience_label,
        siteContent.history.experienceLabel,
      ),
      teamTitle: normalizeSettingText(
        settings.history_team_title,
        siteContent.history.teamTitle,
      ),
      teamDescription: normalizeSettingText(
        settings.history_team_description,
        siteContent.history.teamDescription,
      ),
    },
    banners: remoteBanners !== null ? normalizeBanners(remoteBanners) : siteContent.banners,
    campaigns:
      remoteCampaigns !== null
        ? normalizeCampaigns(remoteCampaigns)
        : siteContent.campaigns,
    sectionImages: {
      coverage: normalizePublicAssetPath(settings.coverage_image_path),
      ctaBackground: normalizePublicAssetPath(settings.cta_background_image_path),
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
    stats:
      remoteStats !== null ? normalizeStats(remoteStats) : siteContent.stats,
    differentials:
      remoteDifferentials !== null
        ? normalizeDifferentials(remoteDifferentials)
        : siteContent.differentials,
    historyGallery:
      remoteHistoryGallery !== null
        ? normalizeHistoryGallery(remoteHistoryGallery)
        : siteContent.historyGallery,
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
    benefits:
      remoteBenefits !== null
        ? normalizeBenefits(remoteBenefits)
        : siteContent.benefits,
    technologies:
      remoteTechnologies !== null
        ? normalizeTechnologies(remoteTechnologies)
        : siteContent.technologies,
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
