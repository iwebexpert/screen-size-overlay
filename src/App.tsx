import ScreenSizeOverlay from './components/ScreenSizeOverlay'

function App() {
  return (
    <div>
      <ScreenSizeOverlay
        // Breakpoints used to calculate responsive behavior. By default, Tailwind CSS breakpoints are used
        breakpoints="tailwind" // Use preset 'tailwind', 'bootstrap', 'bootstrap4', 'bootstrap5', 'foundation', 'bulma', 'mui'
        // Example of custom breakpoints:
        // breakpoints={{
        //   XS: [0, 639],
        //   SM: [640, 767],
        //   MD: [768, 1023],
        //   LG: [1024, 1279],
        //   XL: [1280, 1535],
        //   '2XL': [1536, Infinity],
        // }}
        // Control visibility (default: true)
        enable={process.env.NODE_ENV === 'development'}
        // Position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'relative' (by default 'bottom-right')
        position="bottom-right"
        // Show the previous breakpoint (default: true)
        showPrevBreakpoint={true}
        // Show the next breakpoint (default: true)
        showNextBreakpoint={true}
        // Size of the overlay: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
        size="md"
        // Theme: 'light' | 'dark' | 'scheme' | 'class' (by default 'scheme')
        theme="dark"
        // Transparency level of the overlay. A value between 0 (fully transparent) and 1 (fully opaque)
        transparency={0.95} // (default: 1)
        // Custom theme to override the default colors of the overlay
        customTheme={{
          backgroundColor: '#005204', // Background color of the overlay
          borderColor: '#032b00', // Border color of the overlay
          color: '#ffffff', // Text color used in the overlay
          separatorColor: '#2e7400', // Color of the separator lines between items in the overlay
          closeButtonColor: '#2e7400', // Color of the close button in the overlay
        }}
      />
    </div>
  )
}

export default App
