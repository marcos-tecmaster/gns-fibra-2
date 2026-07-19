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
    { label: "FAQ", href: "#faq" },
    { label: "Contato", href: "#contato" },
  ],
  support: {
    enabled: true,
    eyebrow: "ATENDIMENTO GNS FIBRA",
    title: "Atendimento humano para ajudar você de verdade.",
    description:
      "Seja para conhecer os planos, verificar sua conexão ou acessar os serviços de cliente, nossa equipe está pronta para orientar você.",
    buttonLabel: "Conhecer planos pelo WhatsApp",
    whatsappMessage: "Olá! Quero conhecer os planos da GNS Fibra.",
  },
  cta: {
    enabled: true,
    eyebrow: "VAMOS CONECTAR VOCÊ",
    title: "Pronto para falar com a GNS Fibra?",
    description:
      "Conte onde você mora ou trabalha e nossa equipe ajuda a verificar a cobertura e encontrar a opção adequada.",
    buttonLabel: "Falar pelo WhatsApp",
    whatsappMessage:
      "Olá! Quero verificar a cobertura e conhecer os planos da GNS Fibra.",
  },
  history: {
    enabled: true,
    eyebrow: "Quem somos",
    title: "Nossa",
    titleHighlight: "História",
    description:
      "Há mais de 14 anos conectando famílias e empresas com fibra óptica, estabilidade e atendimento humano.",
    secondaryText:
      "Nossa trajetória é construída diariamente por uma equipe que conhece a região, investe em infraestrutura e entende que conexão de qualidade também depende de atendimento humano.",
    experienceSuffix: "+ anos",
    experienceLabel: "de experiência",
    teamTitle: "Equipe local",
    teamDescription: "próxima do cliente",
  },
  banners: [],
  sectionImages: {},
  differentials: [
    {
      id: "fibra-ponta-a-ponta",
      icon: "wifi",
      title: "Fibra de ponta a ponta",
      description: "Mais velocidade e estabilidade para todos os seus dispositivos.",
      active: true,
    },
    {
      id: "alta-performance",
      icon: "zap",
      title: "Alta performance",
      description: "Conexão preparada para streaming, games, trabalho e estudo.",
      active: true,
    },
    {
      id: "suporte-humanizado",
      icon: "headset",
      title: "Suporte humanizado",
      description: "Atendimento próximo, rápido e focado em resolver.",
      active: true,
    },
    {
      id: "rede-confiavel",
      icon: "shield",
      title: "Rede confiável",
      description: "Infraestrutura monitorada para manter sua rotina conectada.",
      active: true,
    },
    {
      id: "casa-empresa",
      icon: "home",
      title: "Casa e empresa",
      description: "Soluções adequadas para cada perfil de consumo.",
      active: true,
    },
  ],
  benefits: [
    {
      id: "wifi-incluso",
      icon: "wifi",
      title: "Wi-Fi para conectar seus dispositivos",
      description:
        "Equipamentos e recursos definidos conforme o plano contratado e a viabilidade técnica.",
      active: true,
    },
    {
      id: "atendimento-humano",
      icon: "headset",
      title: "Atendimento próximo e humanizado",
      description:
        "Uma equipe preparada para orientar você na contratação, instalação e uso dos serviços.",
      active: true,
    },
    {
      id: "pagamento-flexivel",
      icon: "credit-card",
      title: "Pagamento com praticidade",
      description:
        "Consulte as formas de pagamento disponíveis para o plano escolhido.",
      active: true,
    },
    {
      id: "camera-seguranca",
      icon: "camera",
      title: "Mais segurança para sua rotina",
      description:
        "Alguns planos podem incluir recursos adicionais de segurança. Consulte as condições disponíveis.",
      active: true,
    },
  ],
  technologies: [
    {
      id: "fibra-optica",
      icon: "network",
      name: "Fibra óptica",
      description:
        "Conexão de alta capacidade para residências e empresas.",
      availability: "Conforme cobertura",
      active: true,
    },
    {
      id: "wifi",
      icon: "wifi",
      name: "Wi-Fi",
      description:
        "Recursos definidos de acordo com o plano, equipamento e viabilidade técnica.",
      availability: "Conforme o plano",
      active: true,
    },
    {
      id: "rede-monitorada",
      icon: "shield",
      name: "Rede monitorada",
      description:
        "Infraestrutura acompanhada para oferecer mais estabilidade e confiabilidade.",
      availability: "Rede GNS Fibra",
      active: true,
    },
    {
      id: "casa-empresa",
      icon: "home",
      name: "Casa e empresa",
      description:
        "Soluções adaptadas para diferentes perfis de uso.",
      availability: "Para cada rotina",
      active: true,
    },
  ],
  faqs: [
    {
      id: "contratar-plano",
      question: "Como contratar um plano da GNS Fibra?",
      answer:
        "Entre em contato pelo WhatsApp. A equipe verifica a disponibilidade no endereço e orienta sobre os planos adequados para sua rotina.",
      active: true,
    },
    {
      id: "verificar-cobertura",
      question: "Como verifico a cobertura no meu endereço?",
      answer:
        "Use a área de cobertura do site ou envie seu endereço pelo WhatsApp para a equipe verificar a disponibilidade técnica.",
      active: true,
    },
    {
      id: "atendimento-empresas",
      question: "A GNS Fibra possui atendimento para empresas?",
      answer:
        "Sim. A GNS Fibra oferece soluções para residências e empresas. Entre em contato para avaliar a necessidade e a disponibilidade no local.",
      active: true,
    },
    {
      id: "central-assinante",
      question: "Onde acesso a Central do Assinante?",
      answer:
        "A Central do Assinante pode ser acessada pelo botão disponível no menu e nas áreas de atendimento do site.",
      active: true,
    },
    {
      id: "cliente-atendimento",
      question: "Como solicito atendimento sendo cliente?",
      answer:
        "Use o WhatsApp, telefone ou Central do Assinante apresentados no site para entrar em contato com a equipe.",
      active: true,
    },
    {
      id: "analise-tecnica",
      question: "A instalação depende de análise técnica?",
      answer:
        "Sim. A contratação e a instalação dependem da cobertura e da viabilidade técnica no endereço informado.",
      active: true,
    },
    {
      id: "formas-pagamento",
      question: "Quais são as formas de pagamento?",
      answer:
        "As formas disponíveis podem variar conforme o plano e a condição comercial. Consulte a equipe antes da contratação.",
      active: true,
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
    { id: "anos-de-mercado", value: "14+", label: "Anos de mercado", active: true },
    { id: "rede-fibra-optica", value: "100%", label: "Rede em fibra óptica", active: true },
    { id: "rede-monitorada", value: "24/H", label: "Rede monitorada", active: true },
    { id: "atendimento-proximo", value: "Humanizado", label: "Atendimento próximo", active: true },
  ],
  historyGallery: [
    {
      id: "estrutura",
      title: "Estrutura",
      description: "Infraestrutura e equipamentos que sustentam nossa operação.",
      image: installImage,
      imageAlt: "Estrutura",
      active: true,
    },
    {
      id: "equipe",
      title: "Nossa equipe",
      description: "Profissionais próximos, preparados para orientar e atender você.",
      imageAlt: "Nossa equipe",
      active: true,
    },
    {
      id: "frota",
      title: "Nossa frota",
      description: "Estrutura de atendimento para acompanhar nossa área de cobertura.",
      imageAlt: "Nossa frota",
      active: true,
    },
  ],
};

export const whatsappLink = (
  baseUrl: string,
  message = "Olá! Tenho interesse nos planos GNS Fibra.",
) => `${baseUrl}?text=${encodeURIComponent(message)}`;
