// A simple throttle function that calls the passed function at most once every `delay` ms.
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): T {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return ((...args: unknown[]) => {
    if (!timeout) {
      func(...args)
      timeout = setTimeout(() => {
        timeout = null
      }, delay)
    }
  }) as T
}
