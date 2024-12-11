# Screen Size Overlay

Screen Size Overlay is a lightweight React component that displays the current screen dimensions and a responsive breakpoint label (e.g., XS, SM, MD) on the screen. This can be especially useful for developers during responsive design testing. Built with TypeScript and TailwindCSS for a modern development experience.

Easy to integrate into any React or Next.js project.

## 🚀 Key Features

- **Lightweight**: The library is less than **1KB**.
- **Real-Time Screen Dimensions**: Displays the current screen width and height.
- **TailwindCSS Breakpoints**: Highlights the active TailwindCSS breakpoint (e.g., `XS`, `SM`, `MD`, etc.).
- **Dark Mode Support**: Automatically adapts to dark mode themes.
- **Interactive UI**: Hover effect for better visual feedback and a close button for toggling visibility.

## 🔌 Peer Dependencies

Before using the library, ensure the following peer dependencies are installed in your project:

```ts
"peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "tailwindcss": ">=3.0.0"
},
"engines": {
    "node": ">=18"
}
```

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
      <ScreenSizeOverlay />
    </div>
  )
}
```

### Example with Next.js

To use the ScreenSizeOverlay component in a Next.js project, dynamically load the component and conditionally render it only in the development environment:

```tsx
import React from 'react'
import dynamic from 'next/dynamic'

const ScreenSizeOverlay = dynamic(() => import('screen-size-overlay'))

export default function App() {
  return (
    <>
      <h1>Your Application</h1>
      {process.env.NODE_ENV === 'development' && <ScreenSizeOverlay />}
    </>
  )
}
```

## 🛠 TailwindCSS Integration

Ensure that your project uses **TailwindCSS v3.0.0 or higher**. If you don't already have TailwindCSS installed, follow the [TailwindCSS installation guide](https://tailwindcss.com/docs/installation).

## 🖌 Styling

This component relies on TailwindCSS classes. No additional CSS configuration is required. It supports both light and dark themes out of the box.

## 🌐 Module Format

This library uses **only ESM** (ECMAScript Modules) format for modern JavaScript compatibility.

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use it in your projects.
