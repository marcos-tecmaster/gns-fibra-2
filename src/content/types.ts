export type IconName =
  | "wifi"
  | "zap"
  | "headset"
  | "shield"
  | "home"
  | "tv"
  | "camera"
  | "credit-card"
  | "router"
  | "network";

export type CoverageArea = {
  id: string;
  region: string;
  description: string;
  mapUrl: string;
};

export type SiteContent = {
  config: {
    company: {
      name: string;
      logoUrl: string;
      yearsActive: number;
      tagline: string;
      heroTitle: string;
      aboutText: string;
      description: string;
    };
    contact: {
      whatsappUrl: string;
      whatsappDisplay: string;
      email: string;
      phone: string;
      address: string;
      servicePoints: CoverageArea[];
    };
    links: {
      customerPortal: string;
      coverageMap: string;
      linktree: string;
      facebook: string;
      instagram: string;
    };
    developer: {
      name: string;
      website: string;
      linkedin: string;
      github: string;
      whatsapp: string;
    };
  };
  navigation: Array<{ label: string; href: string }>;
  support: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    description: string;
    buttonLabel: string;
    whatsappMessage: string;
  };
  cta: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    description: string;
    buttonLabel: string;
    whatsappMessage: string;
  };
  history: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    titleHighlight: string;
    description: string;
    secondaryText: string;
    experienceSuffix: string;
    experienceLabel: string;
    teamTitle: string;
    teamDescription: string;
  };
  banners: Array<{
    id: string;
    image?: string;
  }>;
  sectionImages: {
    coverage?: string;
    ctaBackground?: string;
  };
  differentials: Array<{
    id: string;
    icon: IconName;
    title: string;
    description: string;
    active: boolean;
  }>;
  plans: Array<{
    id: string;
    name: string;
    audience: string;
    speed: string;
    unit: string;
    price: string;
    highlight: boolean;
    badge?: string;
    features: string[];
  }>;
  benefits: Array<{
    id: string;
    icon: IconName;
    title: string;
    description: string;
    ctaLabel?: string;
    ctaHref?: string;
    active: boolean;
  }>;
  technologies: Array<{
    id: string;
    icon: IconName;
    name: string;
    description: string;
    availability: string;
    active: boolean;
  }>;
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
    active: boolean;
  }>;
  coverageAreas: CoverageArea[];
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    text: string;
    rating: number;
  }>;
  stats: Array<{
    id: string;
    value: string;
    label: string;
    active: boolean;
  }>;
  historyGallery: Array<{
    id: string;
    title: string;
    description: string;
    image?: string;
    imageAlt: string;
    active: boolean;
  }>;
};

export interface ContentProvider {
  getContent(): Promise<SiteContent>;
}
