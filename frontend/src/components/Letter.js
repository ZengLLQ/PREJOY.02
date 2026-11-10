import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";

const paragraphs = [
  "it happens again, it's been twice she's in my dream. the cause tbh ngga aneh\", like before I slept I sempet chat to her that I wanna cerita, but probably she was already asleep. and gosh, in that dream it was so real, she just appeared at my house on sby and we were chattering a lot. I told her the story i wanted to share earlier. and it was absolutely comfortable telling the story to her. i could feel her reaction without any judgement, just listening to me with her supportive n genuine gesture. I..... DON'T EVEN UNDERSTAND why she could appeared to my dream twice, literally twice, since she left to china for college. wow, however, thanks a lot, evn it wasn't real but i can still feel the delight of urs",
];

export const Letter = () => (
  <div className="px-4 max-w-lg mx-auto pb-8 pt-6">
    <GlassCard className="px-7 py-10 sm:px-10 sm:py-14" data-testid="letter-card">
      <div className="space-y-7 text-left">
        {paragraphs.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="font-apple text-[17px] sm:text-lg leading-8 tracking-[-0.01em] text-gray-100/90"
          >
            {p}
          </motion.p>
        ))}
      </div>
    </GlassCard>
  </div>
);
