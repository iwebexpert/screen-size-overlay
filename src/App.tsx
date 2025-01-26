import ScreenSizeOverlay from './components/ScreenSizeOverlay'

function App() {
  return (
    <div>
      <ScreenSizeOverlay
        // Control visibility (default: true)
        enable={process.env.NODE_ENV === 'development'}
        // Position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'relative' (by default 'bottom-right')
        position="bottom-right"
        // Show the previous breakpoint (default: true)
        showPrevBreakpoint={true}
        // Show the next breakpoint (default: true)
        showNextBreakpoint={true}
        // Theme: 'light' | 'dark' | 'scheme' | 'class' (by default 'scheme')
        theme="dark"
        // By default breakpoints from Tailwind CSS
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
      />
    </div>
  )
}

export default App
