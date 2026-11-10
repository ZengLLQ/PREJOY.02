import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import "@/App.css";
import { AuroraBackground } from "@/components/AuroraBackground";
import { TapSparkles } from "@/components/TapSparkles";
import { Hero } from "@/components/Hero";
import { Letter } from "@/components/Letter";
import { Signature } from "@/components/Signature";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="relative min-h-screen text-white" data-testid="app-root">
      <AuroraBackground />
      <TapSparkles />
      <motion.div
        data-testid="scroll-progress"
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-300"
        style={{ scaleX }}
      />
      <div className="grain-overlay" aria-hidden="true" />
      <main className="relative z-10">
        <Hero />
        <Letter />
        <Signature />
      </main>
    </div>
  );
}

export default App;
