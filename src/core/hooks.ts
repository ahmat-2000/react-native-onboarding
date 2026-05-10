import { useContext } from "react";
import {
  Extrapolation,
  interpolate,
  useDerivedValue,
} from "react-native-reanimated";

import { OnboardingContext, SlideContext } from "./context";

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);

  if (!ctx) {
    throw new Error(
      "Onboarding sub-components must be used inside <Onboarding>",
    );
  }

  return ctx;
}

export function useSlide() {
  const ctx = useContext(SlideContext);

  if (!ctx) {
    throw new Error(
      "Slide sub-components must be used inside <Onboarding.Slide>",
    );
  }

  return ctx;
}

/**
 * Normalized progress for the current slide:
 * `0` when centered, `-1` / `+1` toward previous / next.
 *
 * Useful for parallax, fade, scale, etc.
 */
export function useSlideProgress() {
  const { scrollX, slideWidth } = useOnboarding();
  const { index } = useSlide();

  return useDerivedValue(() =>
    interpolate(
      scrollX.value,
      [
        (index - 1) * slideWidth,
        index * slideWidth,
        (index + 1) * slideWidth,
      ],
      [-1, 0, 1],
      Extrapolation.CLAMP,
    ),
  );
}