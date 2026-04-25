"use client";
import { useState, useEffect } from "react";

export type PerformanceTier = "low" | "mid" | "high";

interface PerformanceState {
  tier: PerformanceTier;
  isLowEnd: boolean;
  isMidTier: boolean;
  prefersReduced: boolean;
  isHydrated: boolean;
}

/**
 * Detects device performance tier to enable progressive degradation of effects.
 *
 * Tier detection logic:
 *  - "low"  → hardwareConcurrency <= 2 OR prefers-reduced-motion
 *  - "mid"  → hardwareConcurrency <= 4
 *  - "high" → everything else
 */
export function usePerformance(): PerformanceState {
  const [state, setState] = useState<PerformanceState>({
    tier: "high",
    isLowEnd: false,
    isMidTier: false,
    prefersReduced: false,
    isHydrated: false,
  });

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let tier: PerformanceTier = "high";
    if (prefersReduced || cores <= 2) {
      tier = "low";
    } else if (cores <= 4) {
      tier = "mid";
    }

    setState({
      tier,
      isLowEnd: tier === "low",
      isMidTier: tier === "mid",
      prefersReduced,
      isHydrated: true,
    });
  }, []);

  return state;
}
