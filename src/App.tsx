import { lazy, Suspense } from 'react'
import { darkTealTheme, lightTealTheme, mergeTheme } from './themes'
// import CustomOverlay from './components/CustomOverlay'
// import ScreenSizeOverlay from './components/ScreenSizeOverlay'

// Lazy-load the overlay component
const ScreenSizeOverlay = lazy(() =>
  import('./components/ScreenSizeOverlay').then((module) => ({
    default: module.default,
  }))
)

function App() {
  // Example of merging a base theme (lightTealTheme) with some custom overrides.
  // You can customize properties like backgroundColor, fontFamily, textColor, etc.
  // Here, the base theme is extended by changing the backgroundColor to '#b8fcbd'.
  const customLightTealTheme = mergeTheme(lightTealTheme, {
    backgroundColor: '#b8fcbd',
    // fontFamily: 'Arial, sans-serif',
  })

  return (
    <div>
      <Suspense fallback={<div>Loading overlay...</div>}>
        {process.env.NODE_ENV === 'development' && (
          <ScreenSizeOverlay
            // Controls whether the overlay is visible (default: true).
            // Useful if you only want the overlay active in development mode.
            enable={process.env.NODE_ENV === 'development'}
            //
            // Breakpoints used to determine the current responsive behavior.
            // By default, Tailwind CSS breakpoints are used.
            // You can use one of the presets: 'tailwind', 'bootstrap', 'bootstrap4', 'bootstrap5', 'foundation', 'bulma', 'mui'
            // or provide custom breakpoints as an object.
            //
            breakpoints="tailwind"
            // Example of custom breakpoints:
            // breakpoints={{
            //   XS: 0,
            //   SM: 640,
            //   MD: 768,
            //   LG: 1024,
            //   XL: 1280,
            //   '2XL': 1536,
            // }}
            //
            // An optional throttle delay (in ms), defaulting to 100.
            // This limits the frequency of window size updates during resize events.
            // throttleDelay={100}
            //
            // Locale for number formatting (e.g., width and height). Default is 'en-US'.
            // Examples: 'en-US', 'ru-RU', 'es-ES'.
            locale="en-US"
            //
            // Language for UI translations within the overlay. Options: 'en', 'ru', 'es'.
            // Default is 'en'.
            language="en"
            //
            // Position of the overlay on the screen: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'relative' (by default 'bottom-right')
            position="bottom-right"
            //
            // Size of the overlay: 'sm' | 'md' | 'lg' | 'xl'| '2xl' (default: 'lg')
            size="lg"
            //
            // If true, displays distance to the previous breakpoint (default: true)
            showPrevBreakpoint={true}
            //
            // If true, displays distance to the next breakpoint (default: true)
            showNextBreakpoint={true}
            //
            // If false, hides the close button in the overlay (default: true)
            showCloseButton={true}
            //
            // Transparency level of the overlay.
            // A value between 0 (fully transparent) and 1 (fully opaque). Default is 1
            transparency={0.95}
            //
            // Theme configuration for the overlay.
            // This can be:
            // 1. A single CustomTheme object (universal theme),
            // 2. A dual theme object { light, dark, switchMode, switchModeClassName }
            //    allowing manual or auto switching between light and dark modes.
            //
            // switchMode (default: 'manual'):
            //   - 'manual': Manually toggle between light and dark themes via a button (if two themes exist).
            //   - 'scheme': Automatically detects the user's OS color scheme (prefers-color-scheme).
            //   - 'class': Detects a class (by default 'dark') on <html> or <body> to decide if dark mode is active.
            // switchModeClassName (optional):
            //   - If switchMode is 'class', you can specify a custom class here. Defaults to 'dark' if omitted.
            theme={{
              light: customLightTealTheme,
              dark: darkTealTheme,
              // defaultTheme: 'dark', // Use if you'd like to start with the dark theme
              switchMode: 'manual',

              // switchMode: 'class',
              // switchModeClassName: 'dark',
            }}
            //
            // If you only have a single theme object, simply pass it directly:
            // The overlay will always use that theme and won't provide a toggle button.
            // theme="light" // light, dark, lightIndigo and darkIndigo are built-in presets.
            // theme={darkTealTheme}
            //
            // Example of a fully customized theme:
            // theme={{
            //   backgroundColor: '#005204', // Overlay background color
            //   borderColor: '#032b00', // Overlay border color
            //   textColor: '#ffffff', // Overlay text color
            //   separatorColor: '#2e7400', // Color for separators between displayed info
            //   closeButtonColor: '#2e7400', // Color for the close button (if showCloseButton=true)
            //   fontFamily: 'Arial, sans-serif', // Font family for all text in the overlay
            // }}
            //
            // Custom container styles.
            // These styles are applied to the outer container of the overlay and can be used to override the default positioning and z-index.
            // By default, z-index is set to 1000.
            containerStyles={{ zIndex: 1000, bottom: 16, right: 16 }}
            //
            // Custom overlay styles.
            // These styles are applied directly to the overlay element, allowing further customization (e.g., font size, padding).
            // overlayStyles={{ fontSize: '10px' }}
            //
            // Overlay display mode:
            //  'visible': always visible,
            //  'auto-hide': appears on resize, then hides after displayDuration,
            //  'auto-compact': only shows the breakpoint label unless hovered (or resizing).
            // Default is 'visible'.
            // mode="auto-compact"
            //
            // The time in milliseconds the overlay remains visible in 'auto-hide' and 'auto-compact' modes.
            // Default is 2000 ms.
            // displayDuration={2000}
          />
        )}
      </Suspense>

      {/* <hr />
      <CustomOverlay /> */}
    </div>
  )
}

export default App
