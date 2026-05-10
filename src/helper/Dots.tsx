import React from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";
import { useOnboarding } from "../core/hooks";

export type DotsProps = {
  /** Inactive dot color (also used as endpoints when `activeColor` is set). */
  color?: string;
  /**
   * When set, color interpolates toward this value on the active page;
   * otherwise opacity is animated.
   */
  activeColor?: string;
  /** Dot diameter in px. */
  size?: number;
  /** Half of the horizontal gap between dot centers (margin on each side). */
  spacing?: number;
  inactiveOpacity?: number;
  activeOpacity?: number;
  style?: ViewStyle;
};

export function Dots({
  color = "rgba(15, 23, 42, 0.75)",
  activeColor,
  size = 8,
  spacing = 3,
  inactiveOpacity = 0.4,
  activeOpacity = 1,
  style,
}: DotsProps) {
  const { count, scrollX, slideWidth } = useOnboarding();
  return (
    <View style={[styles.row, style]}>
      {Array.from({ length: count }).map((_, i) => (
        <Dot
          key={i}
          index={i}
          scrollX={scrollX}
          width={slideWidth}
          color={color}
          activeColor={activeColor}
          size={size}
          spacing={spacing}
          inactiveOpacity={inactiveOpacity}
          activeOpacity={activeOpacity}
        />
      ))}
    </View>
  );
}

Dots.displayName = "Onboarding.Dots";

type DotProps = {
  index: number;
  scrollX: SharedValue<number>;
  width: number;
  color: string;
  activeColor?: string;
  size: number;
  spacing: number;
  inactiveOpacity: number;
  activeOpacity: number;
};

function Dot({
  index,
  scrollX,
  width,
  color,
  activeColor,
  size,
  spacing,
  inactiveOpacity,
  activeOpacity,
}: DotProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const input = [(index - 1) * width, index * width, (index + 1) * width];

    if (activeColor != null) {
      return {
        backgroundColor: interpolateColor(scrollX.value, input, [
          color,
          activeColor,
          color,
        ]),
      };
    }

    return {
      opacity: interpolate(
        scrollX.value,
        input,
        [inactiveOpacity, activeOpacity, inactiveOpacity],
        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          marginHorizontal: spacing,
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
