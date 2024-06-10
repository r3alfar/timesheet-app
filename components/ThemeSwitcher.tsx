// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { PiMoonStarsBold, PiSunDimBold } from "react-icons/pi";
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div>

      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {
          theme === 'dark' ?
            <PiSunDimBold className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            : <PiMoonStarsBold className="h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:rotate-0 dark:scale-100" />
        }



      </button>
    </div>
  )
};