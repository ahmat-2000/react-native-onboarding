import type { FC } from "react";
import { OnboardingRoot } from "./core/OnboardingRoot";
import { Slide } from "./core/Slide";
import { Bottom } from "./helper/Bottom";
import { Dots } from "./helper/Dots";
import { NextButton } from "./helper/NextButton";
import { SkipButton } from "./helper/SkipButton";
import type { OnboardingProps } from "./core/types";

type OnboardingSubcomponents = {
  Slide: typeof Slide;
  Bottom: typeof Bottom;
  Dots: typeof Dots;
  NextButton: typeof NextButton;
  SkipButton: typeof SkipButton;
};

export type OnboardingCompound = FC<OnboardingProps> & OnboardingSubcomponents;

export const Onboarding = Object.assign(OnboardingRoot, {
  Slide,
  Bottom,
  Dots,
  NextButton,
  SkipButton,
}) as OnboardingCompound;
