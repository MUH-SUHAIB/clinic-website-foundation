"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { ContactAction } from "./contact-action";

export function FloatingContactControls({ label, whatsappLabel, callLabel }: {
  label: string;
  whatsappLabel: string;
  callLabel: string;
}) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const controlsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls || !("IntersectionObserver" in window)) return;
    const visible = new Set<Element>();
    const collisions = new Set<Element>();
    const updateVisibility = () => {
      // Never remove a keyboard user's focused contact link.
      setHidden((visible.size > 0 || collisions.size > 0) && !controls.contains(document.activeElement));
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      updateVisibility();
    });

    // Avoid duplicating or obscuring the page's existing contact actions.
    document.querySelectorAll('#contact, [aria-labelledby="services-contact-title"], footer')
      .forEach((element) => observer.observe(element));

    // On narrower screens, yield whenever text or another action enters the
    // small bottom-right contact zone. Browser observers avoid scroll handlers
    // and preserve the original full-width page design.
    let collisionObserver: IntersectionObserver | undefined;
    const observeContactZone = () => {
      collisionObserver?.disconnect();
      collisions.clear();
      if (window.innerWidth >= 1440) return;
      const style = getComputedStyle(controls);
      const button = controls.querySelector("a");
      if (!button) return;
      const size = parseFloat(getComputedStyle(button).width);
      const height = size * 2 + parseFloat(style.gap);
      const right = parseFloat(style.right);
      const bottom = parseFloat(style.bottom);
      collisionObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRect.width > 0 && entry.intersectionRect.height > 0) collisions.add(entry.target);
          else collisions.delete(entry.target);
        }
        updateVisibility();
      }, {
        rootMargin: `-${Math.max(0, window.innerHeight - bottom - height - 6)}px -${right}px -${bottom}px -${Math.max(0, window.innerWidth - right - size - 6)}px`,
      });
      document.querySelectorAll("main p, main h1, main h2, main h3, main h4, main blockquote, main a, main button")
        .forEach((element) => collisionObserver?.observe(element));
    };
    const onResize = () => { observeContactZone(); updateVisibility(); };
    const onFocusOut = () => queueMicrotask(updateVisibility);
    observeContactZone();
    window.addEventListener("resize", onResize);
    controls.addEventListener("focusout", onFocusOut);
    return () => {
      observer.disconnect();
      collisionObserver?.disconnect();
      window.removeEventListener("resize", onResize);
      controls.removeEventListener("focusout", onFocusOut);
    };
  }, [pathname]);

  return (
    <aside ref={controlsRef} aria-label={label} className="floating-contact" hidden={hidden}>
      <ContactAction kind="whatsapp" appearance="floating">{whatsappLabel}</ContactAction>
      <ContactAction kind="call" appearance="floating">{callLabel}</ContactAction>
    </aside>
  );
}
