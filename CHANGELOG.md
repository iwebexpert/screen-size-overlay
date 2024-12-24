## 1.1.0 (2024-12-24)

### Features
1. Support for **custom breakpoints**. By default, the component uses TailwindCSS breakpoints.
2. Manual **theme selection** through the `theme` prop (`scheme`, `class`, `light`, or `dark`):
  * `scheme`: Automatically detects the theme based on the user's system preference (`prefers-color-scheme`). Used by default.
  * `class`: Automatically determines the theme based on the presence of the `dark` class on the HTML element. This is ideal for Tailwind CSS projects.
  * `light`: Forces the overlay to always use the light theme.
  * `dark`: Forces the overlay to always use the dark theme.
3. Ability to **disable the overlay** using the `enable` prop.
4. New prop for **overlay position**, with the following available values:
   * `bottom-left`
   * `bottom-right`
   * `top-left`
   * `top-right`
   * `relative`
5. **Automatic theme detection** based on the `dark` class in the `html` element (compatible with TailwindCSS) or via the user's preferred theme (`prefers-color-scheme` media query).

### Removed
* No longer requires TailwindCSS in the project. The overlay functions correctly even if TailwindCSS is not installed, with default breakpoints still following TailwindCSS standards.

## 1.0.1 (2024-12-13)

### Features
* Example code for integrating the overlay with TailwindCSS in the `README.md`.

## 1.0.0 (2024-12-11)

### Features
* The first version of the library was released.
