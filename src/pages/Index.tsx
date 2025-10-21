import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TrackRecordSection from '@/components/TrackRecordSection';
import ContactSection from '@/components/ContactSection';

export default function Index() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <TrackRecordSection />
      <ContactSection />
    </div>
  );
}