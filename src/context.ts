import { createContext, useContext } from "react";
import {
  Extrapolation,
  interpolate,
  useDerivedValue,
  type SharedValue,
} from "react-native-reanimated";

/** Value provided by `<Onboarding>` to compound children and hooks. */
type OnboardingCtx = {
  index: number;
  count: number;
  scrollX: SharedValue<number>;
  slideWidth: number;
  goNext: () => void;
  goPrev: () => void;
  goTo: (i: number) => void;
  isFirst: boolean;
  isLast: boolean;
  onSkip?: () => void;
  onDone: () => void;
};

/** Per-slide value from `<Onboarding.Slide>`. */
type SlideCtx = { index: number };

const OnboardingContext = createContext<OnboardingCtx | null>(null);
const SlideContext = createContext<SlideCtx | null>(null);

function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error(
      "Onboarding sub-components must be used inside <Onboarding>",
    );
  }
  return ctx;
}

function useSlide() {
  const ctx = useContext(SlideContext);
  if (!ctx) {
    throw new Error(
      "Slide sub-components must be used inside <Onboarding.Slide>",
    );
  }
  return ctx;
}

/**
 * Normalized progress for the current slide: `0` when centered, `-1` / `+1`
 * toward previous / next. Useful for parallax, fade, scale, etc.
 */
function useSlideProgress() {
  const { scrollX, slideWidth } = useOnboarding();
  const { index } = useSlide();
  return useDerivedValue(() =>
    interpolate(
      scrollX.value,
      [(index - 1) * slideWidth, index * slideWidth, (index + 1) * slideWidth],
      [-1, 0, 1],
      Extrapolation.CLAMP,
    ),
  );
}

export {
  OnboardingContext,
  SlideContext,
  useOnboarding,
  useSlide,
  useSlideProgress,
};

export type { OnboardingCtx, SlideCtx };