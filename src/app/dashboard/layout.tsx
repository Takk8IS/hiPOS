"use client"

import { SidebarProvider } from "../context/SidebarContext"
import Sidebar from "../components/Sidebar"
import { SidebarTrigger } from "../components/SidebarTrigger"
import type { ReactNode } from "react"
import { useSidebar } from "../context/SidebarContext"
import { UserProvider } from "../context/UserContext"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

function DashboardContent({ children }: { children: ReactNode }) {
  const { isOpen } = useSidebar()
  const [isMobile, setIsMobile] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Sidebar />
    <div
    style={{
        marginLeft: isOpen ? (isMobile ? 0 : 256) : isMobile ? 0 : 80,
    }}
    className="flex-1 overflow-auto"
      >
        <div className="flex justify-between items-center p-6">
        <SidebarTrigger />
        </div>
        <main className="p-6">{children}</main>
    </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <SidebarProvider>
        <DashboardContent>{children}</DashboardContent>
      </SidebarProvider>
    </UserProvider>
  )
}

