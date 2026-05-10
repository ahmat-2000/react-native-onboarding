import React, { type ReactNode } from "react";
import { View, type ViewStyle } from "react-native";

export type BodyProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function Body({ children, style }: BodyProps) {
  return <View style={style}>{children}</View>;
}

Body.displayName = "Onboarding.Body";