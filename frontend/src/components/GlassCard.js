import { motion, useMotionValue, useSpring } from "framer-motion";

export const GlassCard = ({ children, className = "", ...props }) => {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 18 });
  const sry = useSpring(ry, { stiffness: 140, damping: 18 });

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100 }}
      className={`relative rounded-[2.5rem] bg-white/[0.08] backdrop-blur-[32px] backdrop-saturate-[180%] border border-white/[0.18] shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden ${className}`}
      {...props}
    >
      <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none" style={{ boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.35), inset 0 -1px 1px rgba(255,255,255,0.08), inset 0 0 80px rgba(196,181,253,0.08)" }} />
      <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 35%, transparent 60%)" }} />
      <div className="relative">{children}</div>
    </motion.div>
  );
};
