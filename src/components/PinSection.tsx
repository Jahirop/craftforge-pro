import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface PinCardProps {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: React.ReactNode;
}

function PinCard({ progress, index, total, children }: PinCardProps) {
  const segLen = 1 / total;
  const start = index * segLen;
  const end = start + segLen * 0.8;
  const startX =
    typeof window !== "undefined" ? -window.innerWidth * 1.1 : -1600;
  const x = useTransform(progress, [start, Math.min(end, 1)], [startX, 0]);
  const opacity = useTransform(
    progress,
    [start, Math.min(start + segLen * 0.2, 1)],
    [0, 1]
  );
  return (
    <motion.div style={{ x, opacity }} className="min-w-0 w-full">
      {children}
    </motion.div>
  );
}

interface PinSectionProps {
  cards: React.ReactNode[];
  header?: React.ReactNode;
  vhPerCard?: number;
  cols?: 2 | 3 | 4;
}

export default function PinSection({
  cards,
  header,
  vhPerCard = 40,
  cols = 2,
}: PinSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const colClass =
    cols === 4
      ? "grid-cols-2 md:grid-cols-4"
      : cols === 3
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2";

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${cards.length * vhPerCard + 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-14 px-6 md:px-12">
        {header && (
          <div className="relative z-10 max-w-6xl w-full mx-auto mb-8 flex-shrink-0 text-center">
            {header}
          </div>
        )}
        <div className="relative z-10 max-w-6xl w-full mx-auto overflow-hidden">
          <div className={`grid ${colClass} gap-4`}>
            {cards.map((card, i) => (
              <PinCard
                key={i}
                progress={scrollYProgress}
                index={i}
                total={cards.length}
              >
                {card}
              </PinCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
