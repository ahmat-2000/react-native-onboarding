# @ahmat-2000/react-native-onboarding

[![npm version](https://img.shields.io/npm/v/@ahmat-2000/react-native-onboarding.svg)](https://www.npmjs.com/package/@ahmat-2000/react-native-onboarding)
[![npm downloads](https://img.shields.io/npm/dm/@ahmat-2000/react-native-onboarding.svg)](https://www.npmjs.com/package/@ahmat-2000/react-native-onboarding)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight and flexible onboarding flow for React Native powered by **Reanimated**.

Built around a **headless core**:

* horizontal paging
* animated background interpolation
* onboarding state & hooks
* safe area support
* fully custom UI support

Optional helper components are included for rapid setup.

---

# Features

* Horizontal onboarding pager
* Reanimated-powered scroll tracking
* Background color interpolation between slides
* Headless architecture
* Compound API
* Safe area support
* Shared onboarding context
* Per-slide progress hooks
* Optional helper UI components
* TypeScript support
* Expo compatible
* React Native New Architecture compatible

---

# Installation
    npm install @ahmat-2000/react-native-onboarding


Install peer dependencies:

```bash
npm install react-native-reanimated react-native-safe-area-context react-native-worklets
```

---

# Peer dependencies

| Package                        | Version |
| ------------------------------ | ------- |
| react                          | >= 19   |
| react-native                   | >= 0.83 |
| react-native-reanimated        | >= 4    |
| react-native-safe-area-context | >= 5    |
| react-native-worklets          | >= 0.7  |

---

# Reanimated setup

Add the Reanimated plugin inside your Babel config.

```js
module.exports = {
  presets: ["babel-preset-expo"],
  plugins: ["react-native-reanimated/plugin"],
};
```

Wrap your app with:

```tsx
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <Root />
    </SafeAreaProvider>
  );
}
```

---

# Quick Start

```tsx
import { Text, View } from "react-native";
import { Onboarding } from "@ahmat-2000/react-native-onboarding";

export default function App() {
  return (
    <Onboarding onDone={() => console.log("done")}>
      <Onboarding.Slide backgroundColor="#dbeafe">
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Welcome</Text>
        </View>
      </Onboarding.Slide>

      <Onboarding.Slide backgroundColor="#fce7f3">
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Features</Text>
        </View>
      </Onboarding.Slide>

      <Onboarding.Bottom>
        <Onboarding.SkipButton />
        <Onboarding.Dots />
        <Onboarding.NextButton />
      </Onboarding.Bottom>
    </Onboarding>
  );
}
```

---

# Philosophy

This library separates:

* onboarding behavior
* onboarding UI

The core handles:

* paging
* navigation
* scroll state
* progress interpolation
* slide state

Helpers are optional.

You can build a completely custom onboarding experience using hooks and React Native primitives.

---

# Core Architecture

```txt
core/
├── OnboardingRoot.tsx
├── Slide.tsx
├── context.ts
├── hooks.ts
└── types.ts
```

## Core responsibilities

### OnboardingRoot

* horizontal pager
* onboarding state
* animated scroll handling
* context provider
* background interpolation
* navigation methods

### Slide

* slide container
* per-slide context
* slide progress integration

### Hooks

* useOnboarding()
* useSlide()
* useSlideProgress()

---

# Helpers

```txt
helper/
├── Bottom.tsx
├── Dots.tsx
├── NextButton.tsx
└── SkipButton.tsx
```

Helpers are intentionally lightweight and replaceable.

They exist for convenience, not to impose a design system.

---

# Compound API

```tsx
<Onboarding>
  <Onboarding.Slide />

  <Onboarding.Bottom>
    <Onboarding.SkipButton />
    <Onboarding.Dots />
    <Onboarding.NextButton />
  </Onboarding.Bottom>
</Onboarding>
```

---

# Fully Custom UI

You are not required to use helpers.

```tsx
import {
  OnboardingRoot,
  Slide,
  useOnboarding,
} from "@ahmat-2000/react-native-onboarding";

function Footer() {
  const { index, count, goNext, isLast, onDone } =
    useOnboarding();

  return (
    <View>
      <Text>
        {index + 1} / {count}
      </Text>

      <Button
        title={isLast ? "Done" : "Next"}
        onPress={() => {
          if (isLast) {
            onDone();
          } else {
            goNext();
          }
        }}
      />
    </View>
  );
}

export default function App() {
  return (
    <OnboardingRoot onDone={() => {}}>
      <Slide backgroundColor="#dbeafe">
        <View />
      </Slide>

      <Slide backgroundColor="#fce7f3">
        <View />
      </Slide>

      <Footer />
    </OnboardingRoot>
  );
}
```

---

# Hooks

## useOnboarding()

Access onboarding state and navigation.

```tsx
const {
  index,
  count,
  isFirst,
  isLast,
  goNext,
  goPrev,
  goTo,
} = useOnboarding();
```

---

## useSlide()

Access current slide metadata.

```tsx
const { index } = useSlide();
```

---

## useSlideProgress()

Returns a Reanimated derived value normalized between:

```txt
-1 → previous
 0 → centered
+1 → next
```

Perfect for:

* parallax
* opacity
* scale
* translate animations

---

# API

## Onboarding / OnboardingRoot

| Prop                  | Type            | Description                      |
| --------------------- | --------------- | -------------------------------- |
| onDone                | () => void      | Called when onboarding completes |
| onSkip                | () => void      | Optional skip callback           |
| style                 | ViewStyle       | Root style                       |
| contentContainerStyle | ViewStyle       | Root container style             |
| scrollViewProps       | ScrollViewProps | Additional scroll props          |
| testID                | string          | Test identifier                  |

---

## Slide

| Prop            | Type      |
| --------------- | --------- |
| backgroundColor | string    |
| animated        | boolean   |
| style           | ViewStyle |

---

# TypeScript

TypeScript definitions are bundled with the package.

No additional typings required.

---

# Expo compatibility

Compatible with:

* Expo
* Expo Router
* Expo Dev Client
* React Native CLI

---

# Design goals

* Headless first
* UI optional
* Minimal API surface
* Strong TypeScript support
* Predictable behavior
* Easy customization
* Production-ready defaults

---

# Contributing

Issues and PRs are welcome.

GitHub:

* [https://github.com/ahmat-2000/react-native-onboarding](https://github.com/ahmat-2000/react-native-onboarding)

---

# License

MIT © Ahmat Mahamat
