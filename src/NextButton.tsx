import React, { type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { useOnboarding } from "./context";

export type NextProps = PressableProps & {
  /** Label shown on intermediate slides. */
  label?: string;
  /** Label shown on the last slide (triggers `onDone`). */
  doneLabel?: string;
  children?: ReactNode;
  textStyle?: TextStyle;
  style?: ViewStyle;
};

export function NextButton({
  label = "Next",
  doneLabel = "Get started",
  style,
  textStyle,
  children,
  ...rest
}: NextProps) {
  const { goNext, isLast } = useOnboarding();
  return (
    <Pressable
      onPress={goNext}
      hitSlop={12}
      {...rest}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed, style]}
    >
      {children ?? (
        <Text style={[styles.label, textStyle]}>
          {isLast ? doneLabel : label}
        </Text>
      )}
    </Pressable>
  );
}

NextButton.displayName = "Onboarding.Next";

const styles = StyleSheet.create({
  pressable: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: 16,
  },
});
