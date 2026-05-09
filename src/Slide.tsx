import React, { type ReactNode } from "react";
import { Image, StyleSheet, type ViewStyle, type ImageProps } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSlideProgress } from "./context";

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
        styles.slide,
        backgroundColor != null ? { backgroundColor } : null,
        animStyle,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

Slide.displayName = "Onboarding.Slide";

export type SlideImageProps = ImageProps;

export function SlideImage({ style, ...props }: SlideImageProps) {
  return (
    <Image {...props} resizeMode="contain" style={[styles.image, style]} />
  );
}

SlideImage.displayName = "Onboarding.Image";

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    paddingHorizontal: 24,
  },
  image: { width: "80%", height: 280 },
});
