# @ahmat-2000/react-native-onboarding

[![npm version](https://img.shields.io/npm/v/@ahmat-2000/react-native-onboarding.svg)](https://www.npmjs.com/package/@ahmat-2000/react-native-onboarding)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Composable onboarding for React Native: a horizontal pager with dots, skip/next, and safe-area handling—without forcing a single visual design. Build slides from data (`.map` over an array) or by hand; put **`Onboarding.Bottom` once** after your slides for a shared footer, or place a bottom bar inside each **`Onboarding.Slide`** if you need per-page chrome.

## Install

```sh
npm install @ahmat-2000/react-native-onboarding
```

```sh
yarn add @ahmat-2000/react-native-onboarding
```

```sh
pnpm add @ahmat-2000/react-native-onboarding
```

Peer dependencies (install in your app; versions are minimums):

| Package | Version |
| -------- | ------- |
| `react` | ≥ 19.2.0 |
| `react-native` | ≥ 0.83.6 |
| `react-native-reanimated` | ≥ 4.2.1 |
| `react-native-safe-area-context` | ≥ 5.6.2 |
| `react-native-worklets` | ≥ 0.7.4 |

```sh
npm install react react-native react-native-reanimated react-native-safe-area-context react-native-worklets
```

**Setup:** follow [Reanimated’s installation](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/) for your toolchain. Provide **`SafeAreaProvider`** once at the app root (e.g. next to your router); you do not need to wrap every onboarding screen separately.

**Node:** library development targets Node ≥ 20 (`engines` in `package.json`).

## Usage

**Data-driven slides + one shared footer** (common pattern: map your copy/assets, single bar for Skip / Dots / Next):

```tsx
import { useCallback } from "react";
import {
  Onboarding,
} from "@ahmat-2000/react-native-onboarding";
import {
  type ImageSourcePropType,
  StyleSheet,
} from "react-native";

type SlideData = {
  key: string;
  backgroundColor: string;
  title: string;
  subtitle: string;
  image?: ImageSourcePropType;
};

const SLIDES: SlideData[] = [
  {
    key: "one",
    backgroundColor: "#A6E4D0",
    image: require("./assets/slide1.png"),
    title: "First title",
    subtitle: "First subtitle.",
  },
  {
    key: "two",
    backgroundColor: "#FDEB93",
    image: require("./assets/slide2.png"),
    title: "Second title",
    subtitle: "Second subtitle.",
  },
];

export function OnboardingScreen({ onFinished }: { onFinished: () => void }) {
  const finish = useCallback(() => {
    onFinished();
  }, [onFinished]);

  return (
    <Onboarding onDone={finish}>
      {SLIDES.map((slide) => (
        <Onboarding.Slide
          key={slide.key}
          backgroundColor={slide.backgroundColor}
          animated
        >
          <Onboarding.Body>
            {slide.image != null && (
              <Onboarding.Image source={slide.image} />
            )}
            <Onboarding.Title style={styles.title}>{slide.title}</Onboarding.Title>
            <Onboarding.Subtitle style={styles.subtitle}>
              {slide.subtitle}
            </Onboarding.Subtitle>
          </Onboarding.Body>
        </Onboarding.Slide>
      ))}

      <Onboarding.Bottom style={styles.bottomBar}>
        <Onboarding.Skip textStyle={styles.barText} />
        <Onboarding.Dots />
        <Onboarding.Next
          label="Next"
          doneLabel="Get started"
          textStyle={styles.barText}
        />
      </Onboarding.Bottom>
    </Onboarding>
  );
}

const styles = StyleSheet.create({
  title: { textAlign: "center" },
  subtitle: { textAlign: "center" },
  bottomBar: { paddingHorizontal: 16 },
  barText: { fontSize: 16, fontWeight: "600" },
});
```

Use **`label`** / **`doneLabel`** / **`Skip`**’s **`label`** for localization.

Only **`Onboarding.Slide`** children are pager pages. Anything else (here, **`Onboarding.Bottom`**) is rendered **after** the horizontal scroller as shared chrome. Slides are detected by component type.

**Alternative — footer inside each slide** if you need different actions or layout per page:

```tsx
<Onboarding onDone={onFinished}>
  <Onboarding.Slide backgroundColor="#1a1a2e">
    <Onboarding.Body>...</Onboarding.Body>
    <Onboarding.Bottom>
      <Onboarding.Skip />
      <Onboarding.Dots />
      <Onboarding.Next />
    </Onboarding.Bottom>
  </Onboarding.Slide>
</Onboarding>
```

## API

### `Onboarding` / `OnboardingRoot`

**Required**

- **`onDone`** — Called when the user completes the flow from the last slide (e.g. `Next` on the final page).

**Optional**

- **`onSkip`** — Skip handler. `Skip` uses `onSkip` when provided, otherwise **`onDone`**.
- **`style`** — Root container style.
- **`contentContainerStyle`** — Merged into the animated root wrapper (safe area + interpolated background).
- **`scrollViewProps`** — Extra props for the inner horizontal `Animated.ScrollView`. `horizontal`, `pagingEnabled`, `onScroll`, and related pager props are controlled by the library.
- **`testID`** — Passed to the root for testing.

Export **`Onboarding`** is **`OnboardingRoot`** with subcomponents attached (`Onboarding.Slide`, `Onboarding.Body`, …).

### `Onboarding.Slide`

- **`children`** — Slide content (often **`Body` only** when the footer is a single sibling **`Onboarding.Bottom`**; or **`Body` + `Bottom`** per slide).
- **`backgroundColor`** — Optional string. The root interpolates between slide backgrounds while scrolling.
- **`animated`** — When `true`, children get a subtle fade/translate based on scroll position.
- **`style`** — View style for the slide.

### `Onboarding.Body`

- **`children`**, **`style`** — Main content area (`flex: 1`, centered).

### `Onboarding.Bottom`

Footer row with up to **three** children: **leading · center · trailing** (e.g. `Skip` · `Dots` · `Next`).

- **`children`**, **`style`**

### `Onboarding.Title` / `Onboarding.Subtitle`

Text helpers; they accept React Native **`Text`** props.

### `Onboarding.Image`

Alias for **`SlideImage`**: React Native **`Image`** props, default **`resizeMode="contain"`**.

### `Onboarding.Dots`

- **`color`**, **`activeColor`**, **`size`**, **`spacing`**, **`inactiveOpacity`**, **`activeOpacity`**, **`style`**

### `Onboarding.Next`

- **`label`** — Middle slides (default `"Next"`).
- **`doneLabel`** — Last slide (default `"Get started"`); pressing completes via **`onDone`**.
- Plus **`Pressable`** props and **`textStyle`**, **`children`**.

### `Onboarding.Skip`

- **`label`** (default `"Skip"`), **`hideOnLast`** (default `true`: placeholder on last slide), **`textStyle`**, **`children`**, plus **`Pressable`** props.

## Hooks and context

Use these inside the matching tree or they throw.

| Hook | Where | Notes |
| ---- | ----- | ----- |
| **`useOnboarding()`** | Under **`Onboarding`** | `index`, `count`, `scrollX`, `slideWidth`, `goNext`, `goPrev`, `goTo`, `isFirst`, `isLast`, `onSkip`, `onDone` |
| **`useSlide()`** | Under **`Onboarding.Slide`** | `{ index }` |
| **`useSlideProgress()`** | Under **`Onboarding.Slide`** | Reanimated derived value in **[-1, 0, 1]** for custom motion |

**`OnboardingContext`** and **`SlideContext`** are exported for advanced use.

Types include **`OnboardingProps`**, **`OnboardingScrollViewProps`**, **`SlideProps`**, **`SlideImageProps`**, **`OnboardingCtx`**, **`SlideCtx`**, and compound typing **`OnboardingCompound`**.

## Resetting when the screen regains focus

With React Navigation, you can jump back to the first slide when the user returns to the screen:

```tsx
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Onboarding, useOnboarding } from "@ahmat-2000/react-native-onboarding";

function OnboardingWithReset(props: { onDone: () => void }) {
  return (
    <Onboarding {...props}>
      <ResetOnFocus />
      {/* slides ... */}
    </Onboarding>
  );
}

function ResetOnFocus() {
  const { goTo } = useOnboarding();
  useFocusEffect(
    useCallback(() => {
      goTo(0);
    }, [goTo]),
  );
  return null;
}
```

(Adjust if your navigator does not use `useFocusEffect`.)

## TypeScript

Declaration files are shipped with the package. You do not need a separate `@types` package.

## Contributing

Questions, bugs, and ideas: [GitHub Issues](https://github.com/ahmat-2000/react-native-onboarding/issues). Pull requests are welcome.

## License

[MIT](LICENSE) © Ahmat Mahamat

## Links

- [Repository](https://github.com/ahmat-2000/react-native-onboarding)
- [npm](https://www.npmjs.com/package/@ahmat-2000/react-native-onboarding)
