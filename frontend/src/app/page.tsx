import AboutSection from "@/components/home/AboutSection";
import CommitteeSection from "@/components/home/CommitteeSection";
import ContactSection from "@/components/home/ContactSection";
import EventSchedule from "@/components/home/EventSchedule";
import GalleryPreview from "@/components/home/GalleryPreview";
import HeroSection from "@/components/home/HeroSection";
import SponsorsSection from "@/components/home/SponsorsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <GalleryPreview />
      <EventSchedule />
      <CommitteeSection />
      <SponsorsSection />
      <ContactSection />
    </main>
  );
}
