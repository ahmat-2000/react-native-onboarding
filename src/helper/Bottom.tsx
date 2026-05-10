import React, { Children, type ReactNode } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";

export type BottomProps = {
  children: ReactNode;
  style?: ViewStyle;
};

/** Three-column footer row. */
export function Bottom({ children, style }: BottomProps) {
  const items = Children.toArray(children);
  const leading = items[0];
  const center = items[1];
  const trailing = items[2];

  return (
    <View style={[styles.bottomBar, style]}>
      <View style={styles.leading}>{leading}</View>
      <View style={styles.center}>{center}</View>
      <View style={styles.trailing}>{trailing}</View>
    </View>
  );
}

Bottom.displayName = "Onboarding.Bottom";

const styles = StyleSheet.create({
  bottomBar: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  leading: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  center: {
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  trailing: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
