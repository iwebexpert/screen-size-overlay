# Screen Size Overlay

<img src="docs/images/dark.png" alt="Dark Overlay" />

Screen Size Overlay is a lightweight React component that displays the current screen dimensions and a responsive breakpoint label (e.g., XS, SM, MD) on the screen. This can be especially useful for developers during responsive design testing. Built with TypeScript for a modern development experience.

Easy to integrate into any React or Next.js project.

<p>
  <img src="docs/images/demo.gif" alt="Overlay Demo" />
</p>

## 🚀 Key Features

- **Lightweight**: The library is less than **2KB**. No dependencies.
- **Real-Time Screen Dimensions**: Displays the current screen width and height.
- **TailwindCSS Breakpoints**: Highlights the active TailwindCSS breakpoint (e.g., `XS`, `SM`, `MD`, etc.).
- **Dark Mode Support**: Automatically adapts to dark mode themes.
- **Customizable**: Custom breakpoints support.

## 📦 Installation

Install the package using your preferred package manager:

```bash
# Using npm
npm install screen-size-overlay

# Using yarn
yarn add screen-size-overlay

# Using pnpm
pnpm add screen-size-overlay
```

## 💻 Usage

### Example with React.js

To use the ScreenSizeOverlay component in a React project:

```tsx
import React from 'react'
import { ScreenSizeOverlay } from 'screen-size-overlay'

export default function App() {
  return (
    <div>
      <h1>Welcome to my App</h1>
      <ScreenSizeOverlay enable={process.env.NODE_ENV === 'development'} />
    </div>
  )
}
```

### Example with Next.js

To use the ScreenSizeOverlay component in a Next.js project, dynamically load the component and conditionally render it only in the development environment:

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

## ⚙️ Customization

```tsx
<ScreenSizeOverlay
  // Control visibility (by default true)
  enable={process.env.NODE_ENV === 'development'}
  // Position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'relative' (by default 'bottom-right')
  position="bottom-left"
  // Theme: 'light' | 'dark' | 'scheme' | 'class' (by default 'scheme')
  // * 'scheme': Automatically detects the theme based on the user's system preference (`prefers-color-scheme`). Used by default.
  // * 'class': Automatically determines the theme based on the presence of the `dark` class on the HTML element. This is ideal for Tailwind CSS projects.
  // * 'light': Forces the overlay to always use the light theme.
  // * 'dark': Forces the overlay to always use the dark theme.
  theme="dark"
  // By default breakpoints from Tailwind CSS
  breakpoints={{
    XS: [0, 639],
    SM: [640, 767],
    MD: [768, 1023],
    LG: [1024, 1279],
    XL: [1280, 1535],
    '2XL': [1536, Infinity],
  }}
/>
```

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use it in your projects.
