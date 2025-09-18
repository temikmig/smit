import {
  useState,
  useRef,
  useEffect,
  type RefObject,
  type ReactNode,
} from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  anchorRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  offsetX?: number;
  offsetY?: number;
  fullWidth?: boolean;
}

export const Dropdown = ({
  anchorRef,
  children,
  open,
  onClose,
  offsetX = 0,
  offsetY = 8,
  fullWidth = false,
}: DropdownProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      cancelAnimationFrame(animationRef.current!);
      requestAnimationFrame(() => {
        if (dropdownRef.current) {
          dropdownRef.current.style.transition =
            "opacity 0.3s ease, transform 0.3s ease";
          dropdownRef.current.style.opacity = "1";
          dropdownRef.current.style.transform = "translateY(0)";
        }
      });
    } else if (isMounted) {
      if (dropdownRef.current) {
        dropdownRef.current.style.opacity = "0";
        dropdownRef.current.style.transform = "translateY(-10px)";
      }
      animationRef.current = requestAnimationFrame(() => {
        setTimeout(() => setIsMounted(false), 150);
      });
    }
    return () => cancelAnimationFrame(animationRef.current!);
  }, [open, isMounted]);

  const updatePosition = () => {
    if (!dropdownRef.current || !anchorRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const menuRect = dropdownRef.current.getBoundingClientRect();

    let top = anchorRect.bottom + offsetY;
    let left = anchorRect.left + offsetX;

    if (anchorRect.bottom + menuRect.height > window.innerHeight) {
      top = anchorRect.top - menuRect.height - offsetY;
    }

    if (anchorRect.left + menuRect.width > window.innerWidth) {
      left = window.innerWidth - menuRect.width - 21;
    }

    if (left < 10) left = 10;
    if (top < 10) top = 10;

    dropdownRef.current.style.top = `${top}px`;
    dropdownRef.current.style.left = `${left}px`;

    if (fullWidth) {
      dropdownRef.current.style.width = `${anchorRect.width}px`;
    }
  };

  useEffect(() => {
    if (!isMounted) return;
    updatePosition();

    const handleUpdate = () => {
      if (isMounted) updatePosition();
    };

    window.addEventListener("resize", handleUpdate);
    window.addEventListener("scroll", handleUpdate, true);
    return () => {
      window.removeEventListener("resize", handleUpdate);
      window.removeEventListener("scroll", handleUpdate, true);
    };
  }, [isMounted, anchorRef, fullWidth]);

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

  return (
    <div
      ref={dropdownRef}
      className={styles.dropdownCont}
      style={{
        position: "fixed",
        zIndex: 1000,
        opacity: 0,
        transform: "translateY(-10px)",
      }}
    >
      <div className={styles.dropdownWrapper}>{children}</div>
    </div>
  );
};
