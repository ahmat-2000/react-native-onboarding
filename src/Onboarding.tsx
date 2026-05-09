import type { FC } from "react";
import { OnboardingRoot, type OnboardingProps } from "./OnboardingRoot";
import { Slide, SlideImage } from "./Slide";
import { Body } from "./Body";
import { Bottom } from "./Bottom";
import { Title, Subtitle } from "./Title";
import { Dots } from "./Dots";
import { NextButton } from "./NextButton";
import { SkipButton } from "./SkipButton";

type OnboardingSubcomponents = {
  Slide: typeof Slide;
  Body: typeof Body;
  Bottom: typeof Bottom;
  Title: typeof Title;
  Subtitle: typeof Subtitle;
  Image: typeof SlideImage;
  Dots: typeof Dots;
  Next: typeof NextButton;
  Skip: typeof SkipButton;
};

export type OnboardingCompound = FC<OnboardingProps> & OnboardingSubcomponents;

export const Onboarding = Object.assign(OnboardingRoot, {
  Slide,
  Body,
  Bottom,
  Title,
  Subtitle,
  Image: SlideImage,
  Dots,
  Next: NextButton,
  Skip: SkipButton,
}) as OnboardingCompound;
