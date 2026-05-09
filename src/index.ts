export { Onboarding, type OnboardingCompound } from "./Onboarding";
export {
  OnboardingRoot,
  type OnboardingProps,
  type OnboardingScrollViewProps,
} from "./OnboardingRoot";
export { Slide, SlideImage, type SlideProps, type SlideImageProps } from "./Slide";
export { Body, type BodyProps } from "./Body";
export { Bottom, type BottomProps } from "./Bottom";
export { Title, Subtitle, type TitleProps } from "./Title";
export { Dots, type DotsProps } from "./Dots";
export { NextButton, type NextProps } from "./NextButton";
export { SkipButton, type SkipProps } from "./SkipButton";

export {
  OnboardingContext,
  SlideContext,
  useOnboarding,
  useSlide,
  useSlideProgress,
} from "./context";
export type { OnboardingCtx, SlideCtx } from "./context";
