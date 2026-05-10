import type { FC } from "react";
import { OnboardingRoot, type OnboardingProps } from "./OnboardingRoot";
import { Slide } from "./Slide";
import { Bottom } from "./Bottom";
import { Dots } from "./Dots";
import { NextButton } from "./NextButton";
import { SkipButton } from "./SkipButton";

type OnboardingSubcomponents = {
  Slide: typeof Slide;
  Bottom: typeof Bottom;
  Dots: typeof Dots;
  Next: typeof NextButton;
  Skip: typeof SkipButton;
};

export type OnboardingCompound = FC<OnboardingProps> & OnboardingSubcomponents;

export const Onboarding = Object.assign(OnboardingRoot, {
  Slide,
  Bottom,
  Dots,
  Next: NextButton,
  Skip: SkipButton,
}) as OnboardingCompound;
