// src/components/theme-toggle.tsx
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { useMounted } from '@/hooks/use-mounted'

export function ThemeToggle(): ReactNode {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()

  // Render a placeholder with the same dimensions during SSR to prevent layout shift.
  if (!mounted) {
    return <Button variant="ghost" size="icon" aria-label="Toggle theme" disabled />
  }

  function handleToggle(): void {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
