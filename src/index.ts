export { Onboarding, type OnboardingCompound } from "./Onboarding";
export {
  OnboardingRoot,
} from "./core/OnboardingRoot";
export { Slide, type SlideProps } from "./core/Slide";
export { Bottom, type BottomProps } from "./helper/Bottom";
export { Dots, type DotsProps } from "./helper/Dots";
export { NextButton, type NextProps } from "./helper/NextButton";
export { SkipButton, type SkipProps } from "./helper/SkipButton";

export {
  OnboardingContext,
  SlideContext,
} from "./core/context";
export type { OnboardingCtx, SlideCtx, OnboardingScrollViewProps, OnboardingProps } from "./core/types";
export { useOnboarding, useSlide, useSlideProgress } from "./core/hooks";
