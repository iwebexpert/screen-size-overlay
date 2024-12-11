'use client'

import { useEffect, useState } from 'react'

export default function ScreenSizeOverlay() {
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function update() {
      setDisplaySize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    update()
    setVisible(true)

    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('resize', update)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed z-50 flex items-center gap-2 px-2 py-1 font-mono text-xs font-medium text-white transition-transform bg-gray-700 border border-gray-800 bottom-5 right-5 rounded-xl hover:scale-110 dark:border-gray-500 dark:bg-gray-900">
      <span>
        {displaySize.width.toLocaleString()} x{' '}
        {displaySize.height.toLocaleString()}
      </span>
      <div className="w-px h-4 bg-gray-600 dark:bg-gray-700" />
      <span className="sm:hidden">XS</span>
      <span className="hidden sm:inline md:hidden">SM</span>
      <span className="hidden md:inline lg:hidden">MD</span>
      <span className="hidden lg:inline xl:hidden">LG</span>
      <span className="hidden xl:inline 2xl:hidden">XL</span>
      <span className="hidden 2xl:inline">2XL</span>
      <div className="w-px h-4 bg-gray-600 dark:bg-gray-700" />
      <button
        className="text-base text-gray-500 hover:text-gray-400 dark:text-gray-700 dark:hover:text-gray-400"
        onClick={() => setVisible(false)}
        aria-label="Close">
        ×
      </button>
    </div>
  )
}
