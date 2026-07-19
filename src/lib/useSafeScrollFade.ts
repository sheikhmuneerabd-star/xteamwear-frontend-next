import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade-in-on-scroll jo kabhi "stuck at opacity:0" nahi hota.
 * Elements jo already viewport mein hain unke liye ScrollTrigger ka
 * onEnter fire nahi hota — is liye 1 second baad forced visible fallback hai.
 */
export function useSafeScrollFade(selector: string, deps: unknown[] = []) {
  useGSAP(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(selector, {
        start: "top 90%",
        once: true,
        onEnter: (elements) => {
          gsap.from(elements, { y: 80, opacity: 0, duration: 0.8, stagger: 0.15 });
        },
      });
      ScrollTrigger.refresh();
    });

    const fallback = setTimeout(() => {
      gsap.set(selector, { opacity: 1, y: 0, clearProps: "opacity,transform" });
    }, 1000);

    return () => {
      ctx.revert();
      clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}