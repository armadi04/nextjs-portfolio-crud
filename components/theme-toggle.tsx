"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newTheme = resolvedTheme === "dark" ? "light" : "dark"

        // Check if View Transition API is supported
        // @ts-ignore
        if (!document.startViewTransition) {
            setTheme(newTheme)
            return
        }

        const x = e.clientX
        const y = e.clientY
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        )

        // @ts-ignore
        const transition = document.startViewTransition(() => {
            setTheme(newTheme)
        })

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ]

            document.documentElement.animate(
                {
                    clipPath: clipPath,
                },
                {
                    duration: 700,
                    easing: "ease-in-out",
                    pseudoElement: "::view-transition-new(root)",
                }
            )
        })
    }

    if (!mounted) {
        return null
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative overflow-hidden group rounded-full hover:bg-transparent"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-900 dark:text-slate-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
