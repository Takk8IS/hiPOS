"use client"

import { cn } from "@/lib/utils"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle({ className }: { className?: string }) {
const [mounted, setMounted] = useState(false)
const { theme, setTheme } = useTheme()

// Prevent hydration mismatch by only rendering after mount
useEffect(() => {
    setMounted(true)
}, [])

if (!mounted) {
    return null // Avoid rendering anything before client-side hydration
}

return (
    <button
    type="button"
    className={cn(
    "inline-flex items-center justify-center rounded-lg p-2.5 text-sm hover:bg-gray-700",
    className
    )}
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    aria-label={`Toggle ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
    {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
    ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
    )}
    </button>
)
}

