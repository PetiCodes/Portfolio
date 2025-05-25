import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import InProgressSection from "./components/InProgressSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";
import { AnimationProvider } from "./context/AnimationContext";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] overflow-x-hidden">
      <AnimationProvider>
        <Navbar />
        <div className="container mt-24 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 max-w-full">
          <HeroSection />
          <AboutSection />
          <AchievementsSection />
          <ProjectsSection />
          <InProgressSection />
        </div>
        <Footer />
      </AnimationProvider>
    </main>
  );
}
