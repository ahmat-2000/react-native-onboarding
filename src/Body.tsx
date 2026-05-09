import React, { type ReactNode } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";

export type BodyProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function Body({ children, style }: BodyProps) {
  return <View style={[styles.body, style]}>{children}</View>;
}

Body.displayName = "Onboarding.Body";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingVertical: 32,
  },
});
