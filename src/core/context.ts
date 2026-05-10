import { createContext } from "react";
import type { OnboardingCtx, SlideCtx } from "./types";

export const OnboardingContext = createContext<OnboardingCtx | null>(null);

export const SlideContext = createContext<SlideCtx | null>(null);