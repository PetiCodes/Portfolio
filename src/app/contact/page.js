import ContactNavbar from "../components/ContactNavbar";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import { AnimationProvider } from "../context/AnimationContext";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <AnimationProvider>
        <ContactNavbar />
        <div className="container mt-16 mx-auto px-12 py-4 flex-grow">
          <ContactSection />
        </div>
        <Footer />
      </AnimationProvider>
    </main>
  );
} 