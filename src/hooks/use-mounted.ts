// src/hooks/use-mounted.ts
'use client'

import { useEffect, useState } from 'react'

/**
 * Returns `true` only after the component has mounted on the client.
 *
 * Use this to safely read browser-only state (e.g. next-themes `theme`)
 * without causing a hydration mismatch between SSR and the first render.
 *
 * @example
 * const mounted = useMounted()
 * if (!mounted) return <Skeleton />
 * return <div>{resolvedTheme}</div>
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
