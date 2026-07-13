import installImage from "@/assets/install.jpg";
import type { SiteContent } from "@/content/types";

const generalCoverageMapUrl =
  "https://www.google.com/maps/d/viewer?mid=1L4SkzBboOM7GZyEKCoVC-qvy9J7QU1g&ll=-29.579942443027925%2C-50.71552340517935&z=13";

const coverageAreas = [
  {
    id: "alvorada-viamao",
    region: "Alvorada/Viamão",
    description: "Ponto de atendimento e cobertura regional.",
    mapUrl: generalCoverageMapUrl,
  },
  {
    id: "canoas-cachoeirinha",
    region: "Canoas/Cachoeirinha",
    description: "Ponto de atendimento e cobertura regional.",
    mapUrl: generalCoverageMapUrl,
  },
  {
    id: "bage",
    region: "Bagé",
    description: "Ponto de atendimento e cobertura regional.",
    mapUrl: generalCoverageMapUrl,
  },
  {
    id: "igrejinha",
    region: "Igrejinha",
    description: "Sede e ponto de atendimento principal.",
    mapUrl: generalCoverageMapUrl,
  },
];

/**
 * Conteúdo local usado na primeira renderização e como fallback quando a API
 * PHP estiver indisponível.
 */
export const siteContent: SiteContent = {
  config: {
    company: {
      name: "GNS Fibra",
      yearsActive: 14,
      tagline: "Conectando você ao que realmente importa",
      heroTitle: "Internet que acompanha o ritmo da sua vida.",
      aboutText:
        "Há mais de 14 anos conectando famílias e empresas com fibra óptica, estabilidade e atendimento humano.",
      description:
        "Internet de fibra óptica com velocidade, estabilidade e atendimento humano para residências e empresas.",
    },
    contact: {
      whatsappUrl: "https://wa.me/5508008008080",
      whatsappDisplay: "0800 800 8080",
      email: "atendimento@giganetsul.com.br",
      phone: "0800 800 8080",
      address:
        "R. João Lourenço Schaefer, 439 - Centro, Igrejinha - RS, 95650-000, Brasil",
      servicePoints: coverageAreas,
    },
    links: {
      customerPortal:
        "https://app.giganetsul.com.br/central_assinante_web/login",
      coverageMap: generalCoverageMapUrl,
      linktree: "https://linktr.ee/gnsfibra_",
      facebook: "",
      instagram: "",
    },
    developer: {
      name: "Marcos-TecMaster",
      website: "https://marcostecmaster.com.br",
      linkedin: "https://www.linkedin.com/in/marcostecmaster",
      github: "https://github.com/marcos-tecmaster",
      whatsapp: "https://wa.me/5551981621938",
    },
  },
  navigation: [
    { label: "Início", href: "#inicio" },
    { label: "Planos", href: "#planos" },
    { label: "Empresarial", href: "#empresarial" },
    { label: "Cobertura", href: "#cobertura" },
    { label: "Quem Somos", href: "#quem-somos" },
    { label: "Contato", href: "#contato" },
  ],
  differentials: [
    {
      icon: "wifi",
      title: "Fibra de ponta a ponta",
      description: "Mais velocidade e estabilidade para todos os seus dispositivos.",
    },
    {
      icon: "zap",
      title: "Alta performance",
      description: "Conexão preparada para streaming, games, trabalho e estudo.",
    },
    {
      icon: "headset",
      title: "Suporte humanizado",
      description: "Atendimento próximo, rápido e focado em resolver.",
    },
    {
      icon: "shield",
      title: "Rede confiável",
      description: "Infraestrutura monitorada para manter sua rotina conectada.",
    },
    {
      icon: "home",
      title: "Casa e empresa",
      description: "Soluções adequadas para cada perfil de consumo.",
    },
  ],
  plans: [
    {
      id: "start-95",
      name: "Start",
      audience: "Conexão essencial para o dia a dia",
      speed: "95",
      unit: "MEGA",
      price: "59,90",
      highlight: false,
      features: [
        "1 ponto Wi-Fi",
        "Atendimento humano e digital",
        "Pagamento por boleto ou PIX",
      ],
    },
    {
      id: "premium-300",
      name: "Premium",
      audience: "Mais velocidade para sua rotina",
      speed: "300",
      unit: "MEGA",
      price: "79,90",
      highlight: false,
      features: [
        "1 ponto Wi-Fi 5",
        "Atendimento humano e digital",
        "Pagamento por boleto ou PIX",
      ],
    },
    {
      id: "ultra-600",
      name: "Ultra",
      audience: "Alta performance para toda a família",
      speed: "600",
      unit: "MEGA",
      price: "99,90",
      highlight: true,
      badge: "Mais contratado",
      features: [
        "1 ponto Wi-Fi 5",
        "Atendimento humano e digital",
        "Pagamento por boleto ou PIX",
      ],
    },
    {
      id: "security-700",
      name: "Security",
      audience: "Internet e segurança em um só plano",
      speed: "700",
      unit: "MEGA",
      price: "119,90",
      highlight: false,
      features: [
        "1 ponto Wi-Fi 5",
        "1 câmera de segurança",
        "Atendimento humano e digital",
        "Pagamento por boleto ou PIX",
      ],
    },
    {
      id: "evolution-800",
      name: "Evolution",
      audience: "Performance para uso intenso",
      speed: "800",
      unit: "MEGA",
      price: "129,90",
      highlight: false,
      features: [
        "1 ponto Wi-Fi 5",
        "Atendimento humano e digital",
        "Cartão de crédito ou débito em conta",
      ],
    },
    {
      id: "extreme-1000",
      name: "Extreme",
      audience: "Velocidade máxima para sua conexão",
      speed: "1000",
      unit: "MEGA",
      price: "149,90",
      highlight: false,
      features: [
        "1 ponto Wi-Fi 5",
        "Atendimento humano e digital",
        "Cartão de crédito ou débito em conta",
      ],
    },
    {
      id: "extreme-combo-1000",
      name: "Extreme Combo",
      audience: "O combo completo da GNS Fibra",
      speed: "1000",
      unit: "MEGA",
      price: "199,90",
      highlight: false,
      features: [
        "1 ponto Wi-Fi 5",
        "Atendimento humano e digital",
        "Cartão de crédito ou débito em conta",
      ],
    },
  ],
  coverageAreas,
  testimonials: [
    {
      id: "carlos-mendes",
      name: "Carlos Mendes",
      role: "Empresário",
      text: "Migrei minha empresa para a GNS Fibra e a diferença foi imediata. Estabilidade e suporte sempre disponíveis.",
      rating: 5,
    },
    {
      id: "juliana-ribeiro",
      name: "Juliana Ribeiro",
      role: "Designer freelancer",
      text: "Trabalho de casa há anos. Desde que assinei a GNS, minhas reuniões e entregas ficaram muito mais tranquilas.",
      rating: 5,
    },
    {
      id: "roberto-almeida",
      name: "Roberto Almeida",
      role: "Cliente residencial",
      text: "A família inteira usa a internet ao mesmo tempo e a conexão continua estável. Foi uma mudança excelente.",
      rating: 5,
    },
    {
      id: "patricia-souza",
      name: "Patrícia Souza",
      role: "Gerente comercial",
      text: "Atendimento humanizado de verdade. Quando preciso, falo com uma equipe que entende e resolve.",
      rating: 5,
    },
  ],
  stats: [
    { value: "14+", label: "Anos de mercado" },
    { value: "100%", label: "Rede em fibra óptica" },
    { value: "24/H", label: "Rede monitorada" },
    { value: "Humanizado", label: "Atendimento próximo" },
  ],
  historyGallery: [
    {
      id: "estrutura",
      title: "Estrutura",
      description: "Infraestrutura e equipamentos que sustentam nossa operação.",
      image: installImage,
    },
    {
      id: "equipe",
      title: "Nossa equipe",
      description: "Espaço preparado para fotos dos profissionais da GNS Fibra.",
    },
    {
      id: "frota",
      title: "Nossa frota",
      description: "Espaço preparado para fotos dos veículos de atendimento.",
    },
  ],
};

export const whatsappLink = (
  baseUrl: string,
  message = "Olá! Tenho interesse nos planos GNS Fibra.",
) => `${baseUrl}?text=${encodeURIComponent(message)}`;
