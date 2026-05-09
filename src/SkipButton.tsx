import React, { type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { useOnboarding } from "./context";

export type SkipProps = PressableProps & {
  label?: string;
  /** When true (default), the button collapses to a placeholder on the last slide. */
  hideOnLast?: boolean;
  children?: ReactNode;
  textStyle?: TextStyle;
};

export function SkipButton({
  label = "Skip",
  hideOnLast = true,
  style,
  textStyle,
  children,
  ...rest
}: SkipProps) {
  const { onSkip, onDone, isLast } = useOnboarding();
  if (hideOnLast && isLast) {
    return <View style={styles.placeholder} />;
  }
  return (
    <Pressable
      onPress={onSkip ?? onDone}
      hitSlop={12}
      {...rest}
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressed,
        style as ViewStyle,
      ]}
    >
      {children ?? <Text style={[styles.label, textStyle]}>{label}</Text>}
    </Pressable>
  );
}

SkipButton.displayName = "Onboarding.Skip";

const styles = StyleSheet.create({
  pressable: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  placeholder: {
    minWidth: 1,
    minHeight: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
  },
});
