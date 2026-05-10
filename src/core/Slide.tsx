import React, { type ReactNode } from "react";
import { type ViewStyle } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSlideProgress } from "./hooks";

export type SlideProps = {
  children: ReactNode;
  /** Used by the root for background interpolation between slides. */
  backgroundColor?: string;
  style?: ViewStyle;
  /** When true, children fade and translate slightly based on pager position. */
  animated?: boolean;
};

export function Slide({
  children,
  backgroundColor,
  style,
  animated = false,
}: SlideProps) {
  const progress = useSlideProgress();

  const animStyle = useAnimatedStyle(() => {
    if (!animated) return {};
    const opacity = interpolate(
      progress.value,
      [-1, 0, 1],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    const translateX = interpolate(progress.value, [-1, 0, 1], [-30, 0, 30]);
    return { opacity, transform: [{ translateX }] };
  });

  return (
    <Animated.View
      style={[
        backgroundColor && { backgroundColor },
        animStyle,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

Slide.displayName = "Onboarding.Slide";