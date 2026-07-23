import React, { useEffect, useState } from 'react';

interface CoffeeCursorProps {
  enabled: boolean;
}

export const CoffeeCursor: React.FC<CoffeeCursorProps> = ({ enabled }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.onclick !== null ||
          target.getAttribute('role') === 'button' ||
          target.closest('button') !== null ||
          target.closest('a') !== null;
        setIsPointer(isClickable);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out hidden lg:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${isPointer ? 1.4 : 1})`,
      }}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4B2E2B]/80 text-amber-100 border border-amber-200/40 shadow-lg backdrop-blur-sm">
        ☕
      </div>
    </div>
  );
};
