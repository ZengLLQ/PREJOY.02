import { motion } from "framer-motion";

export const Signature = () => (
  <section className="min-h-[70svh] flex flex-col items-center justify-center px-6 text-center">
    <motion.span
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 360 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="text-purple-300 text-2xl mb-8"
    >
      ✦
    </motion.span>
    <motion.p
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2 }}
      className="font-apple text-base sm:text-lg text-gray-200/90 mb-10 max-w-sm leading-relaxed"
    >
      ✧ &nbsp; ☾ &nbsp; ✧
    </motion.p>
    <motion.p
      data-testid="signature"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.45 }}
      className="font-signature text-5xl sm:text-6xl text-purple-300"
      style={{ textShadow: "0 0 40px rgba(192,132,252,0.45)" }}
    >
      — jaycee
    </motion.p>
  </section>
);
