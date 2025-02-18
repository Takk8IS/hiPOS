"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../../context/LanguageContext"
import { motion } from "framer-motion"
import { MenuIcon as Restaurant, ShoppingBag, Wrench, Scissors, Check, X, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

const translations = {
  en: {
    title: "POS Modules",
    subtitle: "Enhance your POS with specialized features",
    search: "Find modules",
    restaurant: "Restaurant",
    retail: "Retail",
    hardware: "Hardware",
    salon: "Salon",
    activate: "Activate",
    deactivate: "Deactivate",
    activeModules: "Active",
    confirmActivation: "Activate Module",
    confirmDeactivation: "Deactivate Module",
    activationMessage: "Do you want to activate this module?",
    deactivationMessage: "Do you want to deactivate this module?",
    cancel: "Cancel",
    confirm: "Confirm",
    restaurantDesc: "Manage orders, tables, and kitchen operations",
    retailDesc: "Handle inventory, sales, and loyalty programs",
    hardwareDesc: "Track tools, manage repairs, and handle orders",
    salonDesc: "Schedule appointments, manage staff, and track services",
    viewAll: "View All",
  },
  es: {
    title: "Módulos POS",
    subtitle: "Mejora tu POS con funciones especializadas",
    search: "Buscar módulos",
    restaurant: "Restaurante",
    retail: "Tienda",
    hardware: "Ferretería",
    salon: "Salón",
    activate: "Activar",
    deactivate: "Desactivar",
    activeModules: "Activos",
    confirmActivation: "Activar Módulo",
    confirmDeactivation: "Desactivar Módulo",
    activationMessage: "¿Deseas activar este módulo?",
    deactivationMessage: "¿Deseas desactivar este módulo?",
    cancel: "Cancelar",
    confirm: "Confirmar",
    restaurantDesc: "Gestiona pedidos, mesas y operaciones de cocina",
    retailDesc: "Maneja inventario, ventas y programas de fidelidad",
    hardwareDesc: "Rastrea herramientas, gestiona reparaciones y pedidos",
    salonDesc: "Programa citas, gestiona personal y servicios",
    viewAll: "Ver Todo",
  },
  fr: {
    title: "Modules POS",
    subtitle: "Améliorez votre POS avec des fonctions spécialisées",
    search: "Chercher modules",
    restaurant: "Restaurant",
    retail: "Boutique",
    hardware: "Quincaillerie",
    salon: "Salon",
    activate: "Activer",
    deactivate: "Désactiver",
    activeModules: "Actifs",
    confirmActivation: "Activer Module",
    confirmDeactivation: "Désactiver Module",
    activationMessage: "Voulez-vous activer ce module ?",
    deactivationMessage: "Voulez-vous désactiver ce module ?",
    cancel: "Annuler",
    confirm: "Confirmer",
    restaurantDesc: "Gérez les commandes, tables et opérations de cuisine",
    retailDesc: "Gérez l'inventaire, les ventes et programmes de fidélité",
    hardwareDesc: "Suivez les outils, gérez les réparations et commandes",
    salonDesc: "Planifiez les rendez-vous, gérez le personnel et services",
    viewAll: "Voir Tout",
  },
  it: {
    title: "Moduli POS",
    subtitle: "Migliora il tuo POS con funzioni specializzate",
    search: "Cerca moduli",
    restaurant: "Ristorante",
    retail: "Negozio",
    hardware: "Ferramenta",
    salon: "Salone",
    activate: "Attiva",
    deactivate: "Disattiva",
    activeModules: "Attivi",
    confirmActivation: "Attiva Modulo",
    confirmDeactivation: "Disattiva Modulo",
    activationMessage: "Vuoi attivare questo modulo?",
    deactivationMessage: "Vuoi disattivare questo modulo?",
    cancel: "Annulla",
    confirm: "Conferma",
    restaurantDesc: "Gestisci ordini, tavoli e operazioni di cucina",
    retailDesc: "Gestisci inventario, vendite e programmi fedeltà",
    hardwareDesc: "Traccia strumenti, gestisci riparazioni e ordini",
    salonDesc: "Programma appuntamenti, gestisci personale e servizi",
    viewAll: "Vedi Tutto",
  },
  de: {
    title: "POS-Module",
    subtitle: "Erweitern Sie Ihr POS mit Spezialfunktionen",
    search: "Module suchen",
    restaurant: "Restaurant",
    retail: "Einzelhandel",
    hardware: "Baumarkt",
    salon: "Salon",
    activate: "Aktivieren",
    deactivate: "Deaktivieren",
    activeModules: "Aktiv",
    confirmActivation: "Modul aktivieren",
    confirmDeactivation: "Modul deaktivieren",
    activationMessage: "Möchten Sie dieses Modul aktivieren?",
    deactivationMessage: "Möchten Sie dieses Modul deaktivieren?",
    cancel: "Abbrechen",
    confirm: "Bestätigen",
    restaurantDesc: "Verwalten Sie Bestellungen, Tische und Küchenabläufe",
    retailDesc: "Verwalten Sie Bestand, Verkäufe und Treueprogramme",
    hardwareDesc: "Verfolgen Sie Werkzeuge, verwalten Sie Reparaturen",
    salonDesc: "Planen Sie Termine, verwalten Sie Personal und Dienste",
    viewAll: "Alle Anzeigen",
  },
  pt: {
    title: "Módulos POS",
    subtitle: "Aprimore seu POS com recursos especializados",
    search: "Buscar módulos",
    restaurant: "Restaurante",
    retail: "Loja",
    hardware: "Ferragens",
    salon: "Salão",
    activate: "Ativar",
    deactivate: "Desativar",
    activeModules: "Ativos",
    confirmActivation: "Ativar Módulo",
    confirmDeactivation: "Desativar Módulo",
    activationMessage: "Deseja ativar este módulo?",
    deactivationMessage: "Deseja desativar este módulo?",
    cancel: "Cancelar",
    confirm: "Confirmar",
    restaurantDesc: "Gerencie pedidos, mesas e operações de cozinha",
    retailDesc: "Gerencie estoque, vendas e programas de fidelidade",
    hardwareDesc: "Rastreie ferramentas, gerencie reparos e pedidos",
    salonDesc: "Agende compromissos, gerencie equipe e serviços",
    viewAll: "Ver Tudo",
  },
}

const moduleData = [
  { id: "restaurant", icon: Restaurant, description: "restaurantDesc" },
  { id: "retail", icon: ShoppingBag, description: "retailDesc" },
  { id: "hardware", icon: Wrench, description: "hardwareDesc" },
  { id: "salon", icon: Scissors, description: "salonDesc" },
]

export default function Modules() {
  const { language } = useLanguage()
  const [activeModules, setActiveModules] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [moduleToToggle, setModuleToToggle] = useState<string | null>(null)
  const [isActivating, setIsActivating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    // Simulating API call to fetch active modules
    const fetchActiveModules = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setActiveModules(["restaurant", "retail"])
      setIsLoading(false)
    }
    fetchActiveModules()
  }, [])

  const filteredModules = moduleData.filter((module) =>
    t[module.id as keyof typeof t].toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleModule = (moduleId: string) => {
    setModuleToToggle(moduleId)
    setIsActivating(!activeModules.includes(moduleId))
  }

  const confirmToggle = () => {
    if (moduleToToggle) {
      setIsLoading(true)
      // Simulating API call
      setTimeout(() => {
        setActiveModules((prev) =>
          prev.includes(moduleToToggle) ? prev.filter((id) => id !== moduleToToggle) : [...prev, moduleToToggle],
        )
        setModuleToToggle(null)
        setIsLoading(false)
        toast({
          title: isActivating ? t.activate : t.deactivate,
          description: `${t[moduleToToggle as keyof typeof t]} ${isActivating ? "activated" : "deactivated"}.`,
        })
      }, 1000)
    }
  }

return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        <Button variant="outline">{t.viewAll}</Button>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Badge variant="secondary" className="ml-2">
          {t.activeModules}: {activeModules.length}
        </Badge>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex items-center justify-between mt-4">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredModules.map((module) => {
            const Icon = module.icon
            const isActive = activeModules.includes(module.id)
            return (
            <Card 
            key={module.id}
            >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-6 w-6" />
                    {t[module.id as keyof typeof t]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{t[module.description as keyof typeof t]}</p>
                  <div className="flex items-center justify-between">
                    <span className={isActive ? "text-green-500" : "text-red-500"}>
                      {isActive ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                    </span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={isActive ? "destructive" : "default"} onClick={() => toggleModule(module.id)}>
                          {isActive ? t.deactivate : t.activate}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{isActivating ? t.confirmActivation : t.confirmDeactivation}</DialogTitle>
                          <DialogDescription>
                            {isActivating ? t.activationMessage : t.deactivationMessage}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setModuleToToggle(null)}>
                            {t.cancel}
                          </Button>
                          <Button onClick={confirmToggle}>{t.confirm}</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
            </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

