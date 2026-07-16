import { Coverage } from "@/components/site/Coverage";
import { CTASection } from "@/components/site/CTASection";
import { Differentials } from "@/components/site/Differentials";
import { Benefits } from "@/components/site/Benefits";
import { Business } from "@/components/site/Business";
import { Footer } from "@/components/site/Footer";
import { FAQ } from "@/components/site/FAQ";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { History } from "@/components/site/History";
import { Plans } from "@/components/site/Plans";
import { Stats } from "@/components/site/Stats";
import { Support } from "@/components/site/Support";
import { Technologies } from "@/components/site/Technologies";
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
          <Benefits />
          <Technologies />
          <Business />
          <Coverage />
          <History />
          <Support />
          <Testimonials />
          <FAQ />
          <CTASection />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </SiteContentProvider>
  );
}
