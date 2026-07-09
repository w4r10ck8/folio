"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";

const DEFAULT_INNER_GRADIENT = "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180,
} as const;

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

interface TiltEngine {
  setImmediate: (x: number, y: number) => void;
  setTarget: (x: number, y: number) => void;
  toCenter: () => void;
  beginInitial: (durationMs: number) => void;
  getCurrent: () => { x: number; y: number; tx: number; ty: number };
  cancel: () => void;
}

interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

function ProfileCardComponent({
  avatarUrl = "",
  iconUrl = "",
  grainUrl = "",
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}: ProfileCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  const tiltEngine = useMemo<TiltEngine | null>(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties: Record<string, string> = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x: number, y: number) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x: number, y: number) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs: number) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      },
    };
  }, [enableTilt]);

  const getOffsets = (evt: PointerEvent, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine],
  );

  const handlePointerEnter = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      shell.classList.add("active");
      shell.classList.add("entering");
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      enterTimerRef.current = setTimeout(() => {
        shell.classList.remove("entering");
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine],
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;

    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove("active");
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, shell.clientWidth);
      const y = clamp(
        centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        0,
        shell.clientHeight,
      );

      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, mobileTiltSensitivity],
  );

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;

    const shell = shellRef.current;
    if (!shell) return;

    shell.addEventListener("pointerenter", handlePointerEnter);
    shell.addEventListener("pointermove", handlePointerMove);
    shell.addEventListener("pointerleave", handlePointerLeave);

    const handleClick = () => {
      if (!enableMobileTilt || location.protocol !== "https:") return;
      const AnyMotion = window.DeviceMotionEvent as typeof DeviceMotionEvent & {
        requestPermission?: () => Promise<PermissionState>;
      };
      if (AnyMotion && typeof AnyMotion.requestPermission === "function") {
        AnyMotion.requestPermission()
          .then((state) => {
            if (state === "granted") {
              window.addEventListener("deviceorientation", handleDeviceOrientation);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      }
    };
    shell.addEventListener("click", handleClick);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener("pointerenter", handlePointerEnter);
      shell.removeEventListener("pointermove", handlePointerMove);
      shell.removeEventListener("pointerleave", handlePointerLeave);
      shell.removeEventListener("click", handleClick);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove("entering");
    };
  }, [
    enableTilt,
    enableMobileTilt,
    tiltEngine,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation,
  ]);

  const cardStyle = useMemo(
    () => ({
      "--icon": iconUrl ? `url(${iconUrl})` : "none",
      "--grain": grainUrl ? `url(${grainUrl})` : "none",
      "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
      "--behind-glow-color": behindGlowColor ?? "rgba(125, 190, 255, 0.67)",
      "--behind-glow-size": behindGlowSize ?? "50%",
    }),
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize],
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div
      ref={wrapRef}
      className={cn(
        "group relative [transform:translate3d(0,0,0.1px)] touch-none perspective-[500px]",
        className,
      )}
      style={cardStyle as React.CSSProperties}
    >
      {behindGlowEnabled && (
        <div className="pc-behind pointer-events-none absolute inset-0 z-0 opacity-0 [filter:blur(50px)_saturate(1.1)] transition-opacity duration-200 ease-in-out group-hover:opacity-80" />
      )}
      <div ref={shellRef} className="pc-card-shell relative z-[1]">
        <section className="pc-card relative grid aspect-[0.718] h-[80svh] max-h-[540px] animate-[glow-bg_12s_linear_infinite] overflow-hidden rounded-[30px] bg-black/90 [background-blend-mode:color-dodge,normal,normal,normal] [backface-visibility:hidden] max-[480px]:h-[60svh] max-[480px]:max-h-[380px] max-[320px]:h-[55svh] max-[320px]:max-h-[320px] max-md:h-[70svh] max-md:max-h-[450px]">
          <div
            className="absolute inset-0 grid rounded-[30px] bg-black/90"
            style={{ backgroundImage: "var(--inner-gradient)" }}
          >
            <div className="pc-shine pointer-events-none grid rounded-[30px] [grid-area:1/-1]" />
            <div className="pc-glare pointer-events-none rounded-[30px] [grid-area:1/-1]" />

            {/* Avatar + user info layer */}
            <div className="pointer-events-none overflow-visible rounded-[30px] mix-blend-luminosity [backface-visibility:hidden] [grid-area:1/-1]">
              {/* eslint-disable-next-line @next/next/no-img-element -- direct CSS transform on img breaks with next/image wrapper */}
              <img
                className="pc-avatar absolute bottom-[-1px] left-1/2 w-full [transform-origin:50%_100%] will-change-transform [backface-visibility:hidden] [transition:transform_120ms_ease-out]"
                src={avatarUrl}
                alt={`${name || "User"} avatar`}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {showUserInfo && (
                <div className="pointer-events-auto absolute right-5 bottom-5 left-5 z-[2] flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-[14px] py-3 backdrop-blur-[30px] max-[480px]:right-3 max-[480px]:bottom-3 max-[480px]:left-3 max-[480px]:px-[10px] max-[480px]:py-2 max-md:right-[15px] max-md:bottom-[15px] max-md:left-[15px] max-md:px-3 max-md:py-[10px]">
                  <div className="flex items-center gap-3 max-[480px]:gap-2 max-md:gap-[10px]">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 max-[480px]:h-6 max-[480px]:w-6 max-[320px]:h-5 max-[320px]:w-5 max-md:h-7 max-md:w-7">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={miniAvatarUrl || avatarUrl}
                        alt={`${name || "User"} mini avatar`}
                        loading="lazy"
                        className="h-full w-full rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.opacity = "0.5";
                          target.src = avatarUrl;
                        }}
                      />
                    </div>
                    <div className="flex flex-col items-start gap-[6px]">
                      <div className="text-sm leading-none font-medium text-white/90 max-[480px]:text-[12px] max-[320px]:text-[11px] max-md:text-[13px]">
                        @{handle}
                      </div>
                      <div className="text-sm leading-none text-white/70 max-[480px]:text-[9px] max-[320px]:text-[8px] max-md:text-[10px]">
                        {status}
                      </div>
                    </div>
                  </div>
                  <button
                    className="pointer-events-auto cursor-pointer rounded-lg border border-white/10 px-4 py-3 text-xs font-semibold text-white/90 backdrop-blur-[10px] transition-all duration-200 hover:-translate-y-px hover:border-white/40 max-[480px]:rounded-full max-[480px]:px-[10px] max-[480px]:py-[5px] max-[480px]:text-[10px] max-[320px]:px-2 max-[320px]:py-1 max-[320px]:text-[9px] max-md:px-3 max-md:py-[6px] max-md:text-[11px]"
                    onClick={handleContactClick}
                    type="button"
                    aria-label={`Contact ${name || "user"}`}
                  >
                    {contactText}
                  </button>
                </div>
              )}
            </div>

            {/* Name + title layer */}
            <div className="pc-details-content pointer-events-none relative z-[5] overflow-hidden rounded-[30px] text-center mix-blend-luminosity [grid-area:1/-1]">
              <div className="absolute top-[3em] flex w-full flex-col max-[480px]:top-[1.5em] max-md:top-[2em]">
                <h3 className="m-0 bg-[image:linear-gradient(to_bottom,#fff,#6f6fbe)] [background-size:1em_1.5em] [background-clip:text] text-[min(5svh,3em)] font-semibold [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] max-[480px]:text-[min(3.5svh,2em)] max-[320px]:text-[min(3svh,1.5em)] max-md:text-[min(4svh,2.5em)]">
                  {name}
                </h3>
                <p className="relative top-[-12px] m-0 mx-auto w-min bg-[image:linear-gradient(to_bottom,#fff,#4a4ac0)] [background-size:1em_1.5em] [background-clip:text] text-base font-semibold whitespace-nowrap [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] max-[480px]:top-[-8px] max-[480px]:text-xs max-[320px]:text-[11px] max-md:text-sm">
                  {title}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export const ProfileCard = React.memo(ProfileCardComponent);
