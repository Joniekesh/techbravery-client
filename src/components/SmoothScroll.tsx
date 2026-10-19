import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Adds Metamask-style buttery smooth scrolling to the whole app.
 *
 * Modals, popovers, dropdowns, sheets, drawers, command palettes, selects
 * and any element marked with `data-lenis-prevent` keep their native scroll
 * behavior — Lenis won't hijack the wheel inside them.
 */
const SmoothScroll = () => {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    // Auto-tag Radix / Vaul overlays so Lenis ignores wheel inside them.
    const OVERLAY_SELECTORS = [
      "[role='dialog']",
      "[role='alertdialog']",
      "[role='menu']",
      "[role='listbox']",
      "[data-radix-popper-content-wrapper]",
      "[data-radix-scroll-area-viewport]",
      "[vaul-drawer]",
      ".sonner-toast",
    ].join(",");

    const tag = (root: ParentNode) => {
      root.querySelectorAll(OVERLAY_SELECTORS).forEach((el) => {
        if (!el.hasAttribute("data-lenis-prevent")) {
          el.setAttribute("data-lenis-prevent", "");
        }
      });
    };

    tag(document);
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.matches?.(OVERLAY_SELECTORS)) {
              node.setAttribute("data-lenis-prevent", "");
            }
            tag(node);
          }
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
