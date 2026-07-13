export type IconName = "wifi" | "zap" | "headset" | "shield" | "home";

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
  differentials: Array<{
    icon: IconName;
    title: string;
    description: string;
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
  coverageAreas: CoverageArea[];
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    text: string;
    rating: number;
  }>;
  stats: Array<{ value: string; label: string }>;
  historyGallery: Array<{
    id: string;
    title: string;
    description: string;
    image?: string;
  }>;
};

export interface ContentProvider {
  getContent(): Promise<SiteContent>;
}
