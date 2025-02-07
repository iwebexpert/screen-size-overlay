## 2.0.0 (2025-02-07)

### Breaking Changes

1. **New Custom Breakpoints Format**

   - Instead of `[min, max]` ranges, you now define breakpoints using a **single numeric value** for the starting width.
   - Example:

     ```js
     // Outdated format (removed):
     // XS: [0, 639],
     // SM: [640, 767],
     // MD: [768, 1023],
     // etc.

     // New format:
     breakpoints={{
       XS: 0,
       SM: 640,
       MD: 768,
       LG: 1024,
       XL: 1280,
       '2XL': 1536,
     }}
     ```

   - **Sorting** is now built-in, so the order of breakpoints in your object does not matter.

### Features

1. **Fixed Distance Calculation**

   - If breakpoints were out of order, distances to the nearest breakpoint could be incorrect. Now they are always sorted, ensuring proper distance calculations.

2. **Throttle Delay for Performance**

   - A new `throttleDelay` parameter (default: `100ms`) optimizes overlay updates on window resize, reducing re-renders and improving performance.
   - You can customize the delay via `<ScreenSizeOverlay throttleDelay={200} />` or similar.

3. **Over 10 New Themes and Tree Shaking**

   - Added multiple built-in themes (e.g., teal, purple, orange, pink, etc.).
   - These are exported separately, allowing **tree shaking** to exclude unused themes from the final bundle.

4. **`locale` Prop for Number Formatting**

   - Format screen dimensions (width/height) according to a specified locale (e.g., `'en-US'`, `'ru-RU'`, `'es-ES'`).

5. **Language Support** (`'en'`, `'ru'`, `'es'`)

   - Translate UI text (like labels and button text) using the new `language` prop.

6. **Single or Multiple Themes**

   - If you only provide **one** theme object, the overlay always uses that theme with no toggle.
   - If you provide **two** themes (`light`, `dark`) plus `switchMode`, you can toggle or auto-detect.
   - `switchModeClassName` looks for the specified class on **both** `<html>` and `<body>`.

7. **Custom Hooks for a Fully Custom Overlay**

   - You can now build your own overlay by using the **`useWindowSize`** and **`useBreakpointInfo`** hooks to access dimensions and breakpoint data independently.

8. **`mergeTheme` Utility**

   - A new function for creating a custom theme **based on an existing** built-in or user-defined theme.
   - You can still provide a plain object for a completely custom theme, as in previous versions.

9. **Documentation Updates**
   - The README.md has been updated to reflect the new breakpoint format and expanded feature set, including examples of using custom hooks and themes.

## 1.5.0 (2025-02-02)

### Features

1. **Title Tooltip for Breakpoints**
   - Added a title tooltip on the current breakpoint element.
   - The tooltip displays all available breakpoints with the current breakpoint highlighted using square brackets.
   - It also prefixes the list with the CSS framework name (or "Custom" if applicable), formatted with only the first letter capitalized.
   - This provides a quick, native hover reference without the need for a custom tooltip component.
2. **New Modes: `visible`, `auto-hide`, and `auto-compact`**
   - **`visible`**: Overlay is always shown.
   - **`auto-hide`**: Overlay appears on resize, then hides automatically after `displayDuration`.
   - **`auto-compact`**: Only the breakpoint label is shown by default; the full overlay appears on hover or resize.
   - **`displayDuration`**: Defines how long the full overlay remains visible before hiding in `auto-hide` and `auto-compact` modes.

## 1.4.0 (2025-02-01)

### Features

1. New Themes: **green**, **indigo** and **orange**.

   - You can now set the `theme` prop to `'green'`, `'indigo'`, or `'orange'` in addition to the existing `'light'`, `'dark'`, `'scheme'`, `'class'`, or a custom object.
   - Each new theme has its own background color, border color, text color, separator color, and close button color.

2. Custom Container and Overlay Styles.

   - **New props**: `containerStyles` and `overlayStyles`.
   - `containerStyles` allows you to override the **default container** (e.g., `z-index`), positioning, or any other CSS properties.
   - `overlayStyles` lets you fine-tune the **inner overlay** element (e.g., custom `fontSize`, `padding`, etc.).

3. Inline Positioning Styles.

   - The component now uses **inline positioning styles** instead of relying on pre-defined CSS classes.
   - This change makes it easier to **dynamically override** position-related properties (e.g., `top`, `bottom`, `left`, `right`).

4. Improved Usage Documentation.
   - Added detailed comments for each prop in the usage example, including notes on **default values** and **customization options**.
   - Clarified that the default `z-index` for the overlay container is `1000`.

## 1.3.0 (2025-01-27)

### Features

1. Distance to Previous and Next Breakpoints.

   - **New props**: `showPrevBreakpoint` and `showNextBreakpoint`.
   - Both default to `true`, enabling the display of distances to adjacent breakpoints.

2. Configurable Overlay Sizes.

   - **New prop**: `size` — select from `'sm'`, `'md'`, `'lg'`, `'xl'`, or `'2xl'` (default: `'lg'`).
   - Each size adjusts the overlay’s font size and padding.

3. Transparency Control.

   - **New prop**: `transparency` — manages the overlay’s opacity (`0`–`1`).
   - Default is `1`, meaning fully opaque.

4. Custom Theme Support.

   - **New prop**: `theme`, which can be a preset (`'light'`, `'dark'`, `'scheme'`, `'class'`) or a **custom object**.
   - Customizable properties include:
     - `backgroundColor`: Background color of the overlay.
     - `borderColor`: Border color of the overlay.
     - `textColor`: Text color in the overlay.
     - `separatorColor`: Color for separator lines.
     - `closeButtonColor`: Color for the close button.
     - `fontFamily`: Font family used within the overlay.

5. Toggleable Close Button.

   - **New prop**: `showCloseButton` — controls whether the close button appears (default: `true`).

6. Improved Documentation.
   - Updated usage examples to clarify the new props (`showPrevBreakpoint`, `showNextBreakpoint`, `size`, `transparency`, `theme`, and `showCloseButton`).
   - Enhanced inline comments for better clarity and guidance.

## 1.2.2 (2025-01-26)

### Fixes

- Renamed CSS class `overlay-wrapper` to `overlayWrapper` to align with naming conventions for CSS Modules.

## 1.2.1 (2025-01-26)

### Fixes

- Added `z-index: 1000` to the wrapper element to ensure proper layering.

## 1.2.0 (2025-01-26)

### Features

1. Added support for Bootstrap 4 and Bootstrap 5 breakpoints, with bootstrap as an alias for Bootstrap 5.
2. Aliased bootstrap to bootstrap5 for clarity and consistency.
3. Added explicit XS breakpoint for Bootstrap 4 and Bootstrap 5.
4. Introduced presets for Foundation, Bulma and MUI breakpoints.
5. Updated documentation with examples for all supported presets.

### Improvements

1. Expanded keywords for npm to improve discoverability of the package.
2. Improved internal handling of breakpoints for better performance and maintainability.
3. Enhanced the breakpoints prop to support both string presets and custom configurations.

## 1.1.0 (2024-12-24)

### Features

1. Support for **custom breakpoints**. By default, the component uses TailwindCSS breakpoints.
2. Manual **theme selection** through the `theme` prop (`scheme`, `class`, `light`, or `dark`):

- `scheme`: Automatically detects the theme based on the user's system preference (`prefers-color-scheme`). Used by default.
- `class`: Automatically determines the theme based on the presence of the `dark` class on the HTML element. This is ideal for Tailwind CSS projects.
- `light`: Forces the overlay to always use the light theme.
- `dark`: Forces the overlay to always use the dark theme.

3. Ability to **disable the overlay** using the `enable` prop.
4. New prop for **overlay position**, with the following available values:
   - `bottom-left`
   - `bottom-right`
   - `top-left`
   - `top-right`
   - `relative`
5. **Automatic theme detection** based on the `dark` class in the `html` element (compatible with TailwindCSS) or via the user's preferred theme (`prefers-color-scheme` media query).

### Removed

- No longer requires TailwindCSS in the project. The overlay functions correctly even if TailwindCSS is not installed, with default breakpoints still following TailwindCSS standards.

## 1.0.1 (2024-12-13)

### Features

- Example code for integrating the overlay with TailwindCSS in the `README.md`.

## 1.0.0 (2024-12-11)

### Features

- The first version of the library was released.
