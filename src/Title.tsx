import React from "react";
import { StyleSheet, Text, type TextProps } from "react-native";

export type TitleProps = TextProps;

export function Title({ style, ...props }: TitleProps) {
  return <Text {...props} style={[styles.title, style]} />;
}

Title.displayName = "Onboarding.Title";

export function Subtitle({ style, ...props }: TextProps) {
  return <Text {...props} style={[styles.subtitle, style]} />;
}

Subtitle.displayName = "Onboarding.Subtitle";

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  subtitle: { fontSize: 16, textAlign: "center", lineHeight: 22 },
});
