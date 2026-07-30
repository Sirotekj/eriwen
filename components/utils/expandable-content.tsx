'use client';

import { useLayoutEffect, useRef, useState } from 'react';

type ExpandableContentProps = {
  children: React.ReactNode;
  /** Max. výška ve sbaleném stavu (Tailwind třída) */
  collapsedMaxHeight?: string;
  /** Volitelný strop výšky po rozbalení v px (bez hodnoty = bez limitu) */
  expandedMaxHeightPx?: number;
  className?: string;
  buttonClassName?: string;
  readMoreLabel?: string;
  readLessLabel?: string;
  /** Skrýt tlačítko, pokud je obsah kratší než collapsedMaxHeight */
  hideButtonWhenFits?: boolean;
};

type ExpandToggleButtonProps = {
  expanded: boolean;
  onToggle: () => void;
  className: string;
  label: string;
};

function ExpandToggleButton({
  expanded,
  onToggle,
  className,
  label,
}: ExpandToggleButtonProps) {
  if (expanded) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className={className}
        aria-expanded="true"
      >
        [{label}]
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={className}
      aria-expanded="false"
    >
      [{label}]
    </button>
  );
}

export default function ExpandableContent({
  children,
  collapsedMaxHeight = 'max-h-156',
  expandedMaxHeightPx,
  className = '',
  buttonClassName = 'absolute cursor-pointer right-0 -bottom-[2em] z-10 px-4 py-2 text-sm uppercase',
  readMoreLabel = ' číst více ',
  readLessLabel = ' méně ',
  hideButtonWhenFits = true,
}: ExpandableContentProps) {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(() => !hideButtonWhenFits);
  const [maxHeightPx, setMaxHeightPx] = useState<number | undefined>(undefined);

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef(false);
  const collapsedCapRef = useRef(0);

  useLayoutEffect(() => {
    expandedRef.current = expanded;
  }, [expanded]);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const update = () => {
      const fullHeight = inner.scrollHeight;

      // Změříme sbalený limit jednou (z Tailwind třídy `collapsedMaxHeight`),
      // aby se po přepnutí expand/collapse nepřepsal hodnotou z inline `maxHeight`.
      if (collapsedCapRef.current === 0) {
        const computedMax = getComputedStyle(outer).maxHeight;
        const parsed = computedMax !== 'none' ? parseFloat(computedMax) : NaN;
        collapsedCapRef.current = Number.isFinite(parsed)
          ? parsed
          : outer.clientHeight;
      }

      const collapsedCap = collapsedCapRef.current;
      const expandedHeight =
        expandedMaxHeightPx !== undefined
          ? Math.min(fullHeight, expandedMaxHeightPx)
          : fullHeight;

      const isOverflowing = fullHeight > collapsedCap + 1;

      if (hideButtonWhenFits) {
        setShowButton(isOverflowing);
      }

      // Pokud obsah nepřetéká, nepoužívej inline max-height:
      // necháme Tailwind (`max-h-156`) nebo přirozenou výšku bez animace.
      if (hideButtonWhenFits && !isOverflowing) {
        setMaxHeightPx(undefined);
        return;
      }

      setMaxHeightPx(expandedRef.current ? expandedHeight : collapsedCap);
    };

    const observer = new ResizeObserver(update);
    observer.observe(inner);

    return () => observer.disconnect();
  }, [
    children,
    collapsedMaxHeight,
    expandedMaxHeightPx,
    hideButtonWhenFits,
    expanded,
  ]);

  const toggle = () => setExpanded((value) => !value);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={outerRef}
        style={
          maxHeightPx !== undefined ? { maxHeight: maxHeightPx } : undefined
        }
        className={`
          overflow-hidden transition-[max-height] duration-500 ease-in-out
          ${maxHeightPx === undefined && !expanded ? collapsedMaxHeight : ''}
          ${!expanded && showButton ? 'mask-[linear-gradient(to_bottom,black_90%,transparent)]' : ''}
        `}
      >
        <div ref={innerRef}>{children}</div>
      </div>

      {showButton && (
        <ExpandToggleButton
          expanded={expanded}
          onToggle={toggle}
          className={buttonClassName}
          label={expanded ? readLessLabel : readMoreLabel}
        />
      )}
    </div>
  );
}
