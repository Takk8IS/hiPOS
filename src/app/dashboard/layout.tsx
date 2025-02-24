"use client";

import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { UserProvider } from "../context/UserContext";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import { SidebarTrigger } from "../components/SidebarTrigger";
import { cn } from "@/lib/utils";

interface DashboardContentProps {
    children: ReactNode;
}

function DashboardContent({ children }: DashboardContentProps) {
    const { isOpen } = useSidebar();
    const [isMobile, setIsMobile] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        // Handle initial screen size check
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Run check immediately
        checkIsMobile();

        // Set up resize listener
        window.addEventListener("resize", checkIsMobile);

        // Clean up
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div
                className={cn(
                    "flex-1 overflow-auto transition-[margin] duration-300 ease-in-out",
                    {
                        "md:ml-64": isOpen,
                        "md:ml-20": !isOpen,
                    },
                )}
            >
                {/* Header */}
                <header className="flex justify-between items-center p-6">
                    <div className="flex items-center space-x-4">
                        <SidebarTrigger />
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="container mx-auto px-4 py-6 max-w-7xl">
                    {children}
                </main>
            </div>
        </div>
    );
}

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <UserProvider>
            <SidebarProvider>
                <DashboardContent>{children}</DashboardContent>
            </SidebarProvider>
        </UserProvider>
    );
}
