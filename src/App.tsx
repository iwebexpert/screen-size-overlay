import { lazy, Suspense } from 'react'
// import ScreenSizeOverlay from './components/ScreenSizeOverlay'

// Lazy-load the overlay component
const ScreenSizeOverlay = lazy(() =>
  import('./components/ScreenSizeOverlay').then((module) => ({
    default: module.default,
  }))
)

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading overlay...</div>}>
        {process.env.NODE_ENV === 'development' && (
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
            // overlayStyles={{ fontSize: '10px' }}
          />
        )}
      </Suspense>
    </div>
  )
}

export default App
