import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";
import { AnimationProvider } from "./context/AnimationContext";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <AnimationProvider>
        <Navbar />
        <div className="container mt-24 mx-auto px-12 py-4">
          <HeroSection />
          <AboutSection />
          <AchievementsSection />
          <ProjectsSection />
        </div>
        <Footer />
      </AnimationProvider>
    </main>
  );
}
