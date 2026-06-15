import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { brandConfig } from '../data/brandConfig';
import DoneDealLogo from './DoneDealLogo';

/**
 * SplashScreen — GSAP-powered cinematic intro.
 *
 * Sequence:
 *  1. Left and right diagonal panels form a solid black screen.
 *  2. Red and blue emblem slants scale in and fade in.
 *  3. "DONE" slides in from the left, "DEAL" slides in from the right.
 *  4. "JETT LAU" text inside the red slant flickers on like a neon sign.
 *  5. Hold on the finished logo.
 *  6. Logo fades out, and the diagonal panels slide away in opposite diagonal directions
 *     to reveal the live site.
 */
const SplashScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const logoWrapRef = useRef(null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Preload the hero image for a seamless transition
    const preload = new Image();
    preload.fetchPriority = 'high';
    preload.src = brandConfig.images.heroBackground;

    let active = true;
    let tl;

    const ctx = gsap.context(() => {
      // Create and initialize the timeline immediately so initial styles apply instantly
      tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          setRemoved(true);
          onComplete();
        },
      });

      // Initial setup for logo parts (runs immediately)
      tl.set('.logo-red-slant, .logo-blue-slant', { transformOrigin: 'center', scaleY: 0, opacity: 0 });
      tl.set('.logo-done-text', { x: -60, opacity: 0 });
      tl.set('.logo-deal-text', { x: 60, opacity: 0 });
      tl.set('.logo-jett-lau-text', { opacity: 0 });

      // ── Phase 1: Emblem slants scale and fade in ──
      tl.to('.logo-red-slant, .logo-blue-slant', {
        scaleY: 1,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.2,
      });

      // ── Phase 2: DONE & DEAL slide in from left & right ──
      tl.to('.logo-done-text', {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.5)',
      }, '-=0.4');

      tl.to('.logo-deal-text', {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.5)',
      }, '-=0.7');

      // ── Phase 3: Neon power-on flicker for JETT LAU ──
      tl.to('.logo-jett-lau-text', { opacity: 0.3, duration: 0.05, yoyo: true, repeat: 4 });
      tl.to('.logo-jett-lau-text', { opacity: 0.1, duration: 0.1 });
      tl.to('.logo-jett-lau-text', { opacity: 1, duration: 0.2 });

      // ── Phase 4: Hold on finished logo ──
      tl.to({}, { duration: 0.8 });

      // ── Phase 5: Fade out logo ──
      tl.to(logoWrapRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      });

      // ── Phase 6: Shutter Reveal (Diagonal panels slide away) ──
      tl.to(curtainLeftRef.current, {
        xPercent: -100,
        yPercent: 100,
        duration: 1.3,
        ease: 'power4.inOut',
      }, '-=0.1');

      tl.to(curtainRightRef.current, {
        xPercent: 100,
        yPercent: -100,
        duration: 1.3,
        ease: 'power4.inOut',
      }, '-=1.3');

      // Fade out whole container at the end of the shutter split
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      }, '-=0.4');
    }, containerRef);

    const startAnimation = () => {
      if (active && tl) {
        tl.play();
      }
    };

    // Trigger timeline once image preload has finished loading
    if (preload.complete) {
      requestAnimationFrame(startAnimation);
    } else {
      preload.onload = () => requestAnimationFrame(startAnimation);
      preload.onerror = () => requestAnimationFrame(startAnimation);
    }

    return () => {
      active = false;
      ctx.revert(); // clean up all GSAP timelines/tweens
    };
  }, [onComplete]);

  if (removed) return null;

  return (
    <div ref={containerRef} className="splash-screen">
      {/* Diagonal sliding panels */}
      <div ref={curtainLeftRef} className="splash-panel-left" />
      <div ref={curtainRightRef} className="splash-panel-right" />

      {/* Done Deal Logo Wrap */}
      <div ref={logoWrapRef} className="position-relative z-2" style={{ width: 'min(90vw, 420px)' }}>
        <DoneDealLogo className="w-100 h-auto" textLight={true} animated={true} />
      </div>
    </div>
  );
};

export default SplashScreen;
