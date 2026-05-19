'use client';

type HoverWrapperProps = {
  children: React.ReactNode;
  tooltip: string;
};

export default function HoverWrapper({ children, tooltip }: HoverWrapperProps) {
  return (
    <div className="relative inline-block group">
      {children}

      <div
        className="
        pointer-events-none
        absolute left-1/2 top-full z-50
        mt-1 -translate-x-1/2
        whitespace-nowrap
        rounded bg-black px-2 py-1
        text-xs text-white
        opacity-0
        transition
        group-hover:opacity-100
      "
      >
        {tooltip}
      </div>
    </div>
  );
}
