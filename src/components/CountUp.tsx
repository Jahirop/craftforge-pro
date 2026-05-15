import { useState, useEffect, useRef } from "react";

interface Props {
  end: string;
  label: string;
}

export default function CountUp({ end, label }: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const endNum = parseInt(end.replace(/[^0-9]/g, ""));
          const duration = endNum > 500 ? 2500 : 2000;
          let start: number | null = null;
          const animate = (now: number) => {
            if (!start) start = now;
            const p = Math.min((now - start) / duration, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 4)) * endNum));
            if (p < 1) requestAnimationFrame(animate);
            else setCount(endNum);
          };
          requestAnimationFrame(animate);
        } else {
          setCount(0);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="text-4xl md:text-6xl font-poppins font-bold text-gradient">
        {count}{end.replace(/[0-9]/g, "")}
      </div>
      <div className="text-sm md:text-base text-brand-grey font-medium text-center">{label}</div>
    </div>
  );
}