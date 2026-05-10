import type { ReactNode } from "react";
import { ScrollViewProps, ViewStyle } from "react-native";
import type { SharedValue } from "react-native-reanimated";

export type OnboardingCtx = {
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

export type SlideCtx = {
  index: number;
};

/**
 * Extra props forwarded to the inner horizontal `Animated.ScrollView`.
 * Scroll position is driven by Reanimated — `onScroll` is intentionally omitted.
 */
export type OnboardingScrollViewProps = Omit<
  ScrollViewProps,
  | "horizontal"
  | "pagingEnabled"
  | "children"
  | "onScroll"
  | "scrollEventThrottle"
  | "ref"
>;

export type OnboardingProps = {
  children: ReactNode;
  /** Called when the user finishes the last slide. */
  onDone: () => void;
  /** Optional skip handler; `Skip` falls back to `onDone` when omitted. */
  onSkip?: () => void;
  style?: ViewStyle;
  /** Merged into the root `Animated.View` (safe-area + interpolated background). */
  contentContainerStyle?: ViewStyle;
  /** Passed through to the horizontal pager `ScrollView` (fixed pager props win). */
  scrollViewProps?: OnboardingScrollViewProps;
  testID?: string;
};