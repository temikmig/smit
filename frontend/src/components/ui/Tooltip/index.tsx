import { useRef, useState, type ReactNode } from "react";
import { Dropdown, type Placement } from "../Dropdown";
import styles from "./Tooltip.module.css";
import clsx from "clsx";

interface TooltipProps {
  text: ReactNode;
  children: ReactNode;
  placement?: Placement;
  offsetX?: number;
  offsetY?: number;
  delay?: number;
  withArrow?: boolean;
}

export const Tooltip = ({
  text,
  children,
  placement = "top start",
  offsetX = 0,
  offsetY = 0,
  withArrow,
}: TooltipProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  const [direction] = placement.split(" ") as [
    "top" | "bottom" | "left" | "right",
    "start" | "center" | "end"
  ];

  const [open, setOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    hideTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-flex" }}
    >
      <div style={{ display: "inline-flex" }} ref={anchorRef}>
        {children}
      </div>

      <Dropdown
        anchorRef={anchorRef}
        open={open}
        onClose={() => setOpen(false)}
        placement={placement}
        offsetX={offsetX}
        offsetY={offsetY}
      >
        <div
          className={clsx(styles.tooltip, withArrow && styles.withArrow)}
          data-placement={direction}
        >
          {text}
        </div>
      </Dropdown>
    </div>
  );
};
