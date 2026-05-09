import React, {
  Children,
  isValidElement,
  useCallback,
  useMemo,
  useRef,
  useState,
  type FC,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  type ScrollViewProps,
  type ViewStyle,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import { OnboardingContext, SlideContext } from "./context";
import { Slide, type SlideProps } from "./Slide";

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

function isSlideElement(
  child: ReactNode,
): child is ReactElement<SlideProps> {
  return isValidElement(child) && child.type === Slide;
}

export const OnboardingRoot: FC<OnboardingProps> = ({
  children,
  onDone,
  onSkip,
  style,
  contentContainerStyle,
  scrollViewProps,
  testID,
}) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<Animated.ScrollView>(null);
  const scrollX = useSharedValue(0);
  const [index, setIndex] = useState(0);

  const { slides, extras } = useMemo(() => {
    const s: ReactElement[] = [];
    const e: ReactNode[] = [];
    Children.forEach(children, (child) => {
      if (isSlideElement(child)) s.push(child);
      else if (child != null && child !== false) e.push(child);
    });
    return { slides: s, extras: e };
  }, [children]);

  const count = slides.length;

  const backgrounds = useMemo(
    () =>
      slides.map((s) => {
        const bg = (s.props as SlideProps).backgroundColor;
        return typeof bg === "string" ? bg : "transparent";
      }),
    [slides],
  );

  const rootBgStyle = useAnimatedStyle(() => {
    if (backgrounds.length === 0) return {};
    if (backgrounds.length === 1) return { backgroundColor: backgrounds[0] };
    const inputs = backgrounds.map((_, i) => i * width);
    return {
      backgroundColor: interpolateColor(scrollX.value, inputs, backgrounds),
    };
  }, [backgrounds, width]);

  const goTo = useCallback(
    (i: number) => {
      const target = Math.max(0, Math.min(count - 1, i));
      scrollRef.current?.scrollTo({ x: target * width, animated: true });
    },
    [count, width],
  );

  const goNext = useCallback(() => {
    if (index >= count - 1) return onDone();
    goTo(index + 1);
  }, [index, count, goTo, onDone]);

  const goPrev = useCallback(() => goTo(index - 1), [index, goTo]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      const i = Math.round(e.contentOffset.x / width);
      scheduleOnRN(setIndex, i);
    },
  });

  const ctxValue = useMemo(
    () => ({
      index,
      count,
      scrollX,
      slideWidth: width,
      goNext,
      goPrev,
      goTo,
      isFirst: index === 0,
      isLast: index === count - 1,
      onSkip,
      onDone,
    }),
    [index, count, scrollX, width, goNext, goPrev, goTo, onSkip, onDone],
  );

  return (
    <OnboardingContext.Provider value={ctxValue}>
      <Animated.View
        testID={testID}
        style={[
          styles.root,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
          rootBgStyle,
          contentContainerStyle,
          style,
        ]}
      >
        <Animated.ScrollView
          ref={scrollRef}
          style={styles.scroll}
          {...scrollViewProps}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {slides.map((child, i) => (
            <SlideContext.Provider
              key={child.key != null ? child.key : `onboarding-slide-${i}`}
              value={{ index: i }}
            >
              <View style={{ width }}>{child}</View>
            </SlideContext.Provider>
          ))}
        </Animated.ScrollView>

        {extras}
      </Animated.View>
    </OnboardingContext.Provider>
  );
};

OnboardingRoot.displayName = "Onboarding";

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
});
