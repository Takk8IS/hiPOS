"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
ChevronLeft,
ChevronRight,
LayoutDashboard,
Store,
BarChart3,
Users,
Truck,
ShoppingCart,
Wallet,
PackageSearch,
ClipboardList,
Calculator,
Settings,
Puzzle,
} from "lucide-react"
import { useSidebar } from "../context/SidebarContext"
import { useLanguage } from "../context/LanguageContext"
import { useUser } from "../context/UserContext"
import { useState, useMemo, useEffect } from "react"
import { ThemeToggle } from "./ThemeToggle"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "POS", href: "/dashboard/pos", icon: Store },
  { name: "Inventory", href: "/dashboard/inventory", icon: PackageSearch },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Providers", href: "/dashboard/providers", icon: Truck },
  { name: "Procurements", href: "/dashboard/procurements", icon: ClipboardList },
  { name: "Report", href: "/dashboard/report", icon: BarChart3 },
  { name: "Accounting", href: "/dashboard/accounting", icon: Calculator },
  { name: "Fee", href: "/dashboard/fee", icon: Wallet },
  { name: "Modules", href: "/dashboard/modules", icon: Puzzle },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

const translations = {
  en: {
    Dashboard: "Dashboard",
    POS: "POS",
    Report: "Report",
    Customers: "Customers",
    Providers: "Providers",
    Orders: "Orders",
    Fee: "Fee",
    Inventory: "Inventory",
    Procurements: "Procurements",
    Accounting: "Accounting",
    Settings: "Settings",
    Modules: "Modules",
  },
  es: {
    Dashboard: "Panel",
    POS: "TPV",
    Report: "Informe",
    Customers: "Clientes",
    Providers: "Proveedores",
    Orders: "Pedidos",
    Fee: "Tarifa",
    Inventory: "Inventario",
    Procurements: "Compras",
    Accounting: "Contabilidad",
    Settings: "Configuración",
    Modules: "Módulos",
  },
  fr: {
    Dashboard: "Tableau de bord",
    POS: "Caisse",
    Report: "Rapport",
    Customers: "Clients",
    Providers: "Fournisseurs",
    Orders: "Commandes",
    Fee: "Frais",
    Inventory: "Inventaire",
    Procurements: "Achats",
    Accounting: "Comptabilité",
    Settings: "Paramètres",
    Modules: "Modules",
  },
  it: {
    Dashboard: "Cruscotto",
    POS: "POS",
    Report: "Rapporto",
    Customers: "Clienti",
    Providers: "Fornitori",
    Orders: "Ordini",
    Fee: "Tariffa",
    Inventory: "Inventario",
    Procurements: "Acquisti",
    Accounting: "Contabilità",
    Settings: "Impostazioni",
    Modules: "Moduli",
  },
  de: {
    Dashboard: "Dashboard",
    POS: "Kasse",
    Report: "Bericht",
    Customers: "Kunden",
    Providers: "Lieferanten",
    Orders: "Bestellungen",
    Fee: "Gebühr",
    Inventory: "Inventar",
    Procurements: "Beschaffung",
    Accounting: "Buchhaltung",
    Settings: "Einstellungen",
    Module: "Module",
  },
  pt: {
    Dashboard: "Painel",
    POS: "PDV",
    Report: "Relatório",
    Customers: "Clientes",
    Providers: "Fornecedores",
    Orders: "Pedidos",
    Fee: "Taxa",
    Inventory: "Inventário",
    Procurements: "Compras",
    Accounting: "Contabilidade",
    Settings: "Configurações",
    Módulos: "Módulos",
  },
}

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar()
  const { language } = useLanguage()
  const pathname = usePathname()
const { avatar, username } = useUser()
const [isMobile, setIsMobile] = useState(false)

  const t = useMemo(() => translations[language as keyof typeof translations], [language])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isOpen ? 256 : isMobile ? 0 : 80,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      className={cn(
        "fixed left-0 top-0 z-40 h-screen shadow-lg",
        "bg-background text-foreground",
        "flex flex-col",
        isMobile && !isOpen && "w-0",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center">
          <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          </svg>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 text-xl font-bold text-primary"
              >
                hiPOS
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <button
          onClick={toggleSidebar}
          className={cn(
            "rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-inset transition-colors duration-200",
            "text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:ring-ring",
          )}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                !isOpen && "justify-center",
              )}
            >
              <Icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary")} aria-hidden="true" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-3 truncate"
                  >
                    {t[item.name as keyof typeof t]}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        })}
      </nav>
      <div className="p-4">
        <div
          className={cn(
            "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            isOpen ? "flex-row justify-between" : "flex-col items-center",
          )}
        >
          <div className="flex items-center">
            <Image
              src={avatar || "/placeholder.svg"}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full border-2 border-muted"
            />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="ml-3 truncate"
                >
                  {username}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        <ThemeToggle className={cn(!isOpen && "mt-2")} />
        </div>
      </div>
    </motion.aside>
  )
}

