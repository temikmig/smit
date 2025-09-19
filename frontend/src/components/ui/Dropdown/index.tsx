import {
  useState,
  useRef,
  useEffect,
  type RefObject,
  type ReactNode,
} from "react";
import styles from "./Dropdown.module.css";
import clsx from "clsx";

export type Placement =
  | "top start"
  | "top center"
  | "top end"
  | "bottom start"
  | "bottom center"
  | "bottom end"
  | "left start"
  | "left center"
  | "left end"
  | "right start"
  | "right center"
  | "right end"
  | "center";

interface DropdownProps {
  anchorRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  offsetX?: number;
  offsetY?: number;
  fullWidth?: boolean;
  placement?: Placement;
  withShadow?: boolean;
  className?: string;
  overlay?: boolean;
}

export const Dropdown = ({
  anchorRef,
  children,
  open,
  onClose,
  offsetX = 0,
  offsetY = 0,
  fullWidth = false,
  placement = "bottom start",
  withShadow = false,
  className,
  overlay = false,
}: DropdownProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentPlacement, setCurrentPlacement] =
    useState<Placement>(placement);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (open) {
      setIsMounted(true);

      // Ждём, пока элемент отрендерится
      const frame = requestAnimationFrame(() => {
        updatePosition(); // вычисляем top/left

        if (dropdownRef.current) {
          dropdownRef.current.style.transition =
            "opacity 0.25s ease, transform 0.25s ease";
          dropdownRef.current.style.opacity = "1";
          dropdownRef.current.style.transform = "translate(0,0)";
        }
      });

      return () => cancelAnimationFrame(frame);
    } else if (isMounted) {
      if (dropdownRef.current) {
        const [direction] = currentPlacement.split(" ");
        const offset =
          direction === "bottom"
            ? -10
            : direction === "top"
            ? 10
            : direction === "left"
            ? 10
            : -10;

        const transform =
          placement === "center"
            ? `scale(0.95)`
            : direction === "left" || direction === "right"
            ? `translateX(${offset}px)`
            : `translateY(${offset}px)`;

        dropdownRef.current.style.opacity = "0";
        dropdownRef.current.style.transform = transform;
      }

      animationRef.current = requestAnimationFrame(() => {
        setTimeout(() => setIsMounted(false), 150);
      });
    }
  }, [open, isMounted, currentPlacement]);

  const updatePosition = () => {
    if (!dropdownRef.current || !anchorRef.current) return;

    const dropdown = dropdownRef.current;
    const anchorRect = anchorRef.current.getBoundingClientRect();
    const menuRect = dropdown.getBoundingClientRect();

    const [direction, align] = placement.split(" ") as [
      "top" | "bottom" | "left" | "right",
      "start" | "center" | "end"
    ];

    let top = 0;
    let left = 0;
    let newDirection: typeof direction = direction;

    if (direction === "bottom") {
      top = anchorRect.bottom + offsetY;
      left =
        align === "start"
          ? anchorRect.left + offsetX
          : align === "center"
          ? anchorRect.left + (anchorRect.width - menuRect.width) / 2 + offsetX
          : anchorRect.right - menuRect.width + offsetX;

      if (top + menuRect.height > window.innerHeight) {
        newDirection = "top";
        top = anchorRect.top - menuRect.height - offsetY;
      }
    }

    if (direction === "top") {
      top = anchorRect.top - menuRect.height - offsetY;
      left =
        align === "start"
          ? anchorRect.left + offsetX
          : align === "center"
          ? anchorRect.left + (anchorRect.width - menuRect.width) / 2 + offsetX
          : anchorRect.right - menuRect.width + offsetX;

      if (top < 0) {
        newDirection = "bottom";
        top = anchorRect.bottom + offsetY;
      }
    }

    if (direction === "left") {
      left = anchorRect.left - menuRect.width - offsetX;
      top =
        align === "start"
          ? anchorRect.top + offsetY
          : align === "center"
          ? anchorRect.top + (anchorRect.height - menuRect.height) / 2 + offsetY
          : anchorRect.bottom - menuRect.height + offsetY;

      if (left < 0) {
        newDirection = "right";
        left = anchorRect.right + offsetX;
      }
    }

    if (direction === "right") {
      left = anchorRect.right + offsetX;
      top =
        align === "start"
          ? anchorRect.top + offsetY
          : align === "center"
          ? anchorRect.top + (anchorRect.height - menuRect.height) / 2 + offsetY
          : anchorRect.bottom - menuRect.height + offsetY;

      if (left + menuRect.width > window.innerWidth) {
        newDirection = "left";
        left = anchorRect.left - menuRect.width - offsetX;
      }
    }

    if (left < 10) left = 10;
    if (top < 10) top = 10;

    dropdown.style.top = `${top}px`;
    dropdown.style.left = `${left}px`;

    if (fullWidth) dropdown.style.width = `${anchorRect.width}px`;

    setCurrentPlacement(`${newDirection} ${align}` as Placement);
  };

  useEffect(() => {
    if (!isMounted) return;

    updatePosition();
    const handleUpdate = () => updatePosition();

    window.addEventListener("resize", handleUpdate);
    window.addEventListener("scroll", handleUpdate, true);
    return () => {
      window.removeEventListener("resize", handleUpdate);
      window.removeEventListener("scroll", handleUpdate, true);
    };
  }, [isMounted, anchorRef, fullWidth, placement]);

  useEffect(() => {
    if (!isMounted) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMounted, onClose, anchorRef]);

  if (!isMounted) return null;

  const [direction] = currentPlacement.split(" ");
  const initialTransform =
    placement === "center"
      ? "scale(0.95)"
      : direction === "bottom"
      ? "translateY(-10px)"
      : direction === "top"
      ? "translateY(10px)"
      : direction === "left"
      ? "translateX(10px)"
      : "translateX(-10px)";

  const content = (
    <div
      ref={dropdownRef}
      className={clsx(styles.dropdownCont, withShadow && "shadow-container")}
      style={{
        position: "fixed",
        zIndex: 1000,
        opacity: 0,
        transform: initialTransform,
      }}
    >
      <div className={clsx(styles.dropdownWrapper, className)}>{children}</div>
    </div>
  );

  if (overlay)
    return (
      <div className={clsx(styles.overlayCont, open && styles.show)}>
        {content}
      </div>
    );
  return content;
};
