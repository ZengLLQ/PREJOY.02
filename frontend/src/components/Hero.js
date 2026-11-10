import { motion, useScroll, useTransform } from "framer-motion";
import { GlassCard } from "./GlassCard";

const lines = ["PRE-JOY.02", "i can barely", "think"];

const MaskedLine = ({ text, delay, className }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {text}
    </motion.div>
  </div>
);

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -80]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  return (
    <section className="min-h-[100svh] flex items-center justify-center px-4 py-10">
      <motion.div style={{ y, opacity }} className="w-full max-w-lg">
        <GlassCard className="px-7 py-12 sm:px-10 sm:py-16" data-testid="hero-card">
          <h1 data-testid="hero-heading" className="font-heading font-semibold tracking-tight text-white leading-[1.05] mb-10 sm:mb-14">
            {lines.map((line, i) => (
              <MaskedLine key={line} text={line} delay={0.45 + i * 0.18} className="text-5xl sm:text-6xl lg:text-7xl" />
            ))}
            <MaskedLine text="right now" delay={1.0} className="text-5xl sm:text-6xl lg:text-7xl text-purple-300" />
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.7 }}
            className="flex items-center justify-between"
          >
            <p data-testid="hero-name" className="font-heading text-sm sm:text-base text-purple-100/80 tracking-wide">@黃美仙</p>
            <div data-testid="scroll-hint" className="flex items-center gap-2 text-purple-200/70">
              <span className="font-heading text-[10px] tracking-[0.3em] uppercase">scroll</span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="text-sm"
              >
                ↓
              </motion.span>
            </div>
          </motion.div>
        </GlassCard>
      </motion.div>
    </section>
  );
};
