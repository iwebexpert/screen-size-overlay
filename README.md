# Screen Size Overlay

<p>
<img src="docs/images/dark.png" alt="Dark Overlay" />
</p>
<p>
<img src="docs/images/custom.png" alt="Custom Overlay" />
</p>
<p>
<img src="docs/images/light.png" alt="Light Overlay" />
</p>

**Screen Size Overlay** is a lightweight React component that displays the **current screen width and height**, shows distances to the previous and next breakpoints, and supports presets (`Tailwind`, `Bootstrap`, `Foundation`, `Bulma`, `MUI`) or fully custom configurations. Perfect for rapid debugging and ensuring responsive layouts.

Easy to integrate into any `React` or `Next.js` project.

<p>
  <img src="docs/images/demo.gif" alt="Overlay Demo" />
</p>

## 🚀 Key Features

- **Lightweight**: The library is less than **3KB** (gzip). No dependencies.
- **Framework-Independent**: Pure CSS approach—no specific CSS framework required.
- **Real-Time Screen Dimensions**: Instantly displays current screen width and height.
- **Multiple Presets**: Built-in support for Tailwind CSS, Bootstrap (4/5), Foundation, Bulma and MUI breakpoints.
- **Dark Mode Support**: Adapts automatically to dark mode when applicable.
- **Customizable**: Easily supply your own custom breakpoints or pass a custom theme object.
- **Responsive Testing Made Easy**: Ideal for developers fine-tuning adaptive and responsive designs.
- **New in 1.4.0**:
  - **Additional Themes**: `'green'`, `'indigo'`, and `'orange'`.
  - **containerStyles & overlayStyles**: Override container positioning, `z-index`, and overlay styling.

## 📦 Installation

Install the package using your preferred package manager:

```bash
# Using npm
npm install screen-size-overlay

# Using yarn
yarn add screen-size-overlay

# Using pnpm
pnpm add screen-size-overlay

# Using bun
bun add screen-size-overlay
```

## 💻 Usage

### Example with React.js

A simple approach to adding `ScreenSizeOverlay` in a React application:

```tsx
import React from 'react'
import { ScreenSizeOverlay } from 'screen-size-overlay'

export default function App() {
  return (
    <div>
      <h1>Welcome to my App</h1>
      {/* Overlay visible only in development */}
      <ScreenSizeOverlay enable={process.env.NODE_ENV === 'development'} />
      {/* Or conditionally */}
      {process.env.NODE_ENV === 'development' && <ScreenSizeOverlay />}
    </div>
  )
}
```

### Example with React.lazy

If you want to load the component lazily in a standard React app, you can use `React.lazy`:

```tsx
import React, { lazy, Suspense } from 'react'

// Lazy-load the overlay component
const ScreenSizeOverlay = lazy(() =>
  import('screen-size-overlay').then((module) => ({
    default: module.ScreenSizeOverlay,
  }))
)

export default function App() {
  return (
    <div>
      <h1>My React App</h1>
      <Suspense fallback={<div>Loading overlay...</div>}>
        {process.env.NODE_ENV === 'development' && <ScreenSizeOverlay />}
      </Suspense>
    </div>
  )
}
```

**Note:** Make sure to wrap the lazy-loaded component in a `<Suspense>` boundary to handle the fallback UI while the overlay is being loaded.

### Example with Next.js

In a `Next.js` project, you can dynamically load the overlay and display it only in development mode:

```tsx
import React from 'react'
import dynamic from 'next/dynamic'

const ScreenSizeOverlay = dynamic(() =>
  import('screen-size-overlay').then((module) => module.ScreenSizeOverlay)
)

export default function App() {
  return (
    <>
      <h1>Your Application</h1>
      {process.env.NODE_ENV === 'development' && <ScreenSizeOverlay />}
    </>
  )
}
```

## 🧩 Props

| **Prop**             | **Type**                                                                                                                            | **Default**      | **Description**                                                                                                                                                                                                                        |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enable`             | `boolean`                                                                                                                           | `true`           | Controls whether the overlay is rendered. Useful for only showing the overlay during development.                                                                                                                                      |
| `breakpoints`        | `'tailwind'` \| `'bootstrap'` \| `'bootstrap4'` \| `'bootstrap5'` \| `'foundation'` \| `'bulma'` \| `'mui'` \| _Custom Breakpoints_ | `'tailwind'`     | Determines how breakpoints are calculated. You can use one of the presets: `'tailwind'`, `'bootstrap'`, `'bootstrap4'`, `'bootstrap5'`, `'foundation'`, `'bulma'`, or `'mui'`, or provide a custom breakpoints object.                 |
| `position`           | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'relative'`                                                        | `'bottom-right'` | Defines the placement of the overlay on the screen. If set to `'relative'`, the overlay is positioned according to its parent element.                                                                                                 |
| `size`               | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                                                                                             | `'lg'`           | Determines the overlay’s overall scale (font size, padding, etc.).                                                                                                                                                                     |
| `showPrevBreakpoint` | `boolean`                                                                                                                           | `true`           | If `true`, shows the distance (in pixels) to the previous breakpoint.                                                                                                                                                                  |
| `showNextBreakpoint` | `boolean`                                                                                                                           | `true`           | If `true`, shows the distance (in pixels) to the next breakpoint.                                                                                                                                                                      |
| `showCloseButton`    | `boolean`                                                                                                                           | `true`           | Toggles the close button’s visibility in the overlay.                                                                                                                                                                                  |
| `transparency`       | `number`                                                                                                                            | `1`              | Sets the overlay’s opacity, ranging from `0` (fully transparent) to `1` (fully opaque).                                                                                                                                                |
| `containerStyles`    | `React.CSSProperties`                                                                                                               | `{}`             | Custom inline styles applied to the **outer container** of the overlay. Use this to override default positioning (e.g., `zIndex`) or add margins. By default, `zIndex` is set to `1000`.                                               |
| `overlayStyles`      | `React.CSSProperties`                                                                                                               | `{}`             | Custom inline styles for the **inner overlay** element, allowing you to customize (e.g., `fontSize`, `padding`, etc.).                                                                                                                 |
| `theme`              | `'light' \| 'dark' \| 'scheme' \| 'class' \| 'green' \| 'indigo' \| 'orange' \| CustomTheme`                                        | `'scheme'`       | The color scheme for the overlay. Presets include `'light'`, `'dark'`, `'scheme'`, `'class'`, `'green'`, `'indigo'`, and `'orange'`. You can also pass a custom theme object with properties like `backgroundColor`, `textColor`, etc. |

## 🛠️ Full Customization

Below is a more detailed example demonstrating the various props:

```tsx
<ScreenSizeOverlay
  // Controls whether the overlay is visible (default: true).
  // Useful if you only want the overlay active in development mode.
  enable={process.env.NODE_ENV === 'development'}
  // Breakpoints used to determine the current responsive behavior.
  // By default, Tailwind CSS breakpoints are used.
  // You can use one of the presets: 'tailwind', 'bootstrap', 'bootstrap4', 'bootstrap5', 'foundation', 'bulma', 'mui'
  // or provide custom breakpoints as an object.
  breakpoints="tailwind"
  // Example of custom breakpoints:
  // breakpoints={{
  //   XS: [0, 639],
  //   SM: [640, 767],
  //   MD: [768, 1023],
  //   LG: [1024, 1279],
  //   XL: [1280, 1535],
  //   '2XL': [1536, Infinity],
  // }}

  // Position of the overlay on the screen: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'relative' (by default 'bottom-right')
  position="bottom-right"
  // Size of the overlay: 'sm' | 'md' | 'lg' | 'xl'| '2xl' (default: 'lg')
  size="lg"
  // If true, displays distance to the previous breakpoint (default: true)
  showPrevBreakpoint={true}
  // If true, displays distance to the next breakpoint (default: true)
  showNextBreakpoint={true}
  // If false, hides the close button in the overlay (default: true)
  showCloseButton={true}
  // Transparency level of the overlay.
  // A value between 0 (fully transparent) and 1 (fully opaque). Default is 1
  transparency={0.95}
  // Theme for the overlay.
  // Can be one of: 'light', 'dark', 'scheme', 'class', 'green', 'indigo', 'orange', or a custom theme object.
  // Default is 'scheme'
  theme="dark"
  // If you want a fully customized color scheme,
  // pass a theme object instead of a preset value:
  // theme={{
  //   backgroundColor: '#005204', // Overlay background color
  //   borderColor: '#032b00', // Overlay border color
  //   textColor: '#ffffff', // Overlay text color
  //   separatorColor: '#2e7400', // Color for separators between displayed info
  //   closeButtonColor: '#2e7400', // Color for the close button (if showCloseButton=true)
  //   fontFamily: 'Arial, sans-serif', // Font family for all text in the overlay
  // }}

  // Custom container styles.
  // These styles are applied to the outer container of the overlay and can be used to override the default positioning and z-index.
  // By default, z-index is set to 1000.
  containerStyles={{ zIndex: 1000, bottom: 16, right: 16 }}
  // Custom overlay styles.
  // These styles are applied directly to the overlay element, allowing further customization (e.g., font size, padding).
  overlayStyles={{ fontSize: '10px' }}
/>
```

## ⚡ Why Use screen-size-overlay Instead of a Browser Extension?

Even though the overlay typically runs only in development mode, including it as part of your codebase (instead of relying on a browser extension) offers several key benefits:

1. **Consistent Dev Environment**  
   With `screen-size-overlay`, every developer sees the same overlay across different machines and browsers, ensuring consistent debugging. Extensions can vary in availability or version, leading to inconsistent testing if each team member has a different setup.

2. **Advanced Customization & Theming**  
   The overlay is fully configurable through props—letting you define custom breakpoints, themes, and styles. Browser extensions generally provide fixed functionality or limited options, making it difficult to adapt them to specific project needs.

3. **Controlled Integration & Version Tracking**  
   By adding the overlay to your repository, all changes are documented via version control, making it easy to roll back or see when new features were added. Although you might only enable it in development builds, the code remains part of your project’s lifecycle, ensuring updates or configuration changes are transparent to the whole team.

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use it in your projects.
