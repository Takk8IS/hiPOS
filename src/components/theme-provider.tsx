"use client";

import * as React from "react";
import {
    ThemeProvider as NextThemesProvider,
    useTheme,
    type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            enableColorScheme
            storageKey="app-theme"
            disableTransitionOnChange
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}

export { useTheme };
