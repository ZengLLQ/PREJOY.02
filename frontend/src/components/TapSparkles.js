import { useEffect, useState } from "react";

export const TapSparkles = () => {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const onTap = (e) => {
      const id = Date.now() + Math.random();
      const stars = Array.from({ length: 10 }, (_, i) => ({
        angle: (i / 10) * Math.PI * 2 + Math.random() * 0.6,
        dist: 30 + Math.random() * 55,
        size: 4 + Math.random() * 6,
      }));
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY, stars }]);
      setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 900);
    };
    window.addEventListener("pointerdown", onTap);
    return () => window.removeEventListener("pointerdown", onTap);
  }, []);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none" data-testid="tap-sparkles">
      {bursts.map((b) =>
        b.stars.map((s, i) => (
          <span
            key={`${b.id}-${i}`}
            className="burst-star"
            style={{
              left: b.x,
              top: b.y,
              width: s.size,
              height: s.size,
              "--dx": `${Math.cos(s.angle) * s.dist}px`,
              "--dy": `${Math.sin(s.angle) * s.dist}px`,
            }}
          />
        ))
      )}
    </div>
  );
};
