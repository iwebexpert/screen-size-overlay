import ScreenSizeOverlay from './components/ScreenSizeOverlay'

function App() {
  return (
    <div>
      <ScreenSizeOverlay
        // Control visibility (by default true)
        enable={process.env.NODE_ENV === 'development'}
        // Position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'relative' (by default 'bottom-right')
        position="bottom-right"
        // Theme: 'light' | 'dark' | 'scheme' | 'class' (by default 'scheme')
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
    </div>
  )
}

export default App
