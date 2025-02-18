import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
    title: "hiPOS",
    description: "Modern point of sale system",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};
