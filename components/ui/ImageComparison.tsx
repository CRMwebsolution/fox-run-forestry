"use client";

import { KeyboardEvent, PointerEvent, useCallback, useRef, useState } from "react";

type ImageComparisonProps = {
  beforeImage: string;
  afterImage: string;
  altBefore: string;
  altAfter: string;
};

export function ImageComparison({
  beforeImage,
  afterImage,
  altBefore,
  altAfter,
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();
    const nextPosition = ((clientX - bounds.left) / bounds.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, nextPosition)));
  }, []);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    updatePosition(event.clientX);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (isDragging) updatePosition(event.clientX);
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 10 : 2;

    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setSliderPosition((position) => Math.max(0, position - step));
    }

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setSliderPosition((position) => Math.min(100, position + step));
    }

    if (event.key === "Home") {
      event.preventDefault();
      setSliderPosition(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setSliderPosition(100);
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full cursor-ew-resize touch-none select-none overflow-hidden bg-brand-dark sm:aspect-[3/2]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      <img
        src={beforeImage}
        alt={altBefore}
        className="absolute inset-0 size-full object-cover"
        draggable={false}
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={afterImage}
          alt={altAfter}
          className="absolute inset-0 size-full object-cover"
          draggable={false}
        />
      </div>

      <span className="absolute left-3 top-3 rounded-full bg-brand-dark/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-cream sm:left-4 sm:top-4">
        After
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-brand-dark/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-cream sm:right-4 sm:top-4">
        Before
      </span>

      <button
        type="button"
        role="slider"
        aria-label="Before and after image comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuetext={`${Math.round(sliderPosition)} percent after image visible`}
        onKeyDown={handleKeyDown}
        className="group absolute inset-y-0 z-10 w-0.5 bg-brand-cream/90 outline-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <span
          className={`absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-brand-dark bg-brand-cream text-brand-dark shadow-xl transition group-focus-visible:ring-2 group-focus-visible:ring-brand-orange group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-brand-dark sm:size-12 ${
            isDragging ? "scale-110" : ""
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </button>
    </div>
  );
}
