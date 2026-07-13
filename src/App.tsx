import { Coverage } from "@/components/site/Coverage";
import { CTASection } from "@/components/site/CTASection";
import { Differentials } from "@/components/site/Differentials";
import { Business } from "@/components/site/Business";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { History } from "@/components/site/History";
import { Plans } from "@/components/site/Plans";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { SiteContentProvider } from "@/content/SiteContentProvider";

export default function App() {
  return (
    <SiteContentProvider>
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <Stats />
          <Differentials />
          <Plans />
          <Business />
          <Coverage />
          <History />
          <Testimonials />
          <CTASection />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </SiteContentProvider>
  );
}
