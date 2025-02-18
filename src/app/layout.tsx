"use client";

import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { setFullscreen } from "./windowManager";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const enableFullscreen = async () => {
            try {
                await setFullscreen(true);
            } catch (error) {
                console.error("Failed to set fullscreen mode:", error);
            }
        };

        enableFullscreen();
    }, []);

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="color-scheme" content="light dark" />
            </head>
            <body className={`${inter.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                    storageKey="theme-preference"
                >
                    <LanguageProvider>
                        {children}
                        <Toaster />
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
