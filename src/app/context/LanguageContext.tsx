"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

type LanguageContextType = {
    language: string;
    setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState("en");
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
    }, []);

    const handleSetLanguage = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
        // Note: App Router doesn't support locale routing out of the box
        // You may need to implement a custom solution for language-based routing
        router.refresh(); // This will re-render the current page with the new language
    };

    return (
        <LanguageContext.Provider
            value={{ language, setLanguage: handleSetLanguage }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
