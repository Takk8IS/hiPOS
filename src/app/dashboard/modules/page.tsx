"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import {
    MenuIcon as Restaurant,
    ShoppingBag,
    Wrench,
    Scissors,
    Check,
    X,
    Search,
    MessageSquare,
    Send,
    Bot,
    FileInput,
    FileText,
    Percent,
    ShoppingCart,
    Pill,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

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
        whatsapp: "WhatsApp Business",
        telegram: "Telegram Channel",
        chatgpt: "ChatGPT Connection",
        importexport: "Import/Export",
        invoice: "Invoice",
        fees: "Fees & Taxes",
        supermarket: "Supermarket",
        pharmacy: "Pharmacy",
        whatsappDesc:
            "Automate customer communication with WhatsApp Business Bot",
        telegramDesc: "Manage business communication through Telegram Channel",
        chatgptDesc: "Integrate AI assistance for customer support",
        importexportDesc: "Import and export inventory data efficiently",
        invoiceDesc: "Customize and manage invoice templates",
        feesDesc: "Configure and track fees and tax calculations",
        supermarketDesc: "Manage supermarket operations and inventory",
        pharmacyDesc: "Handle pharmacy inventory and prescriptions",
        viewAll: "View All",
    },
    es: {
        // Spanish translations
    },
    fr: {
        // French translations
    },
    it: {
        // Italian translations
    },
    de: {
        // German translations
    },
    pt: {
        // Portuguese translations
    },
};

const moduleData = [
    { id: "restaurant", icon: Restaurant, description: "restaurantDesc" },
    { id: "retail", icon: ShoppingBag, description: "retailDesc" },
    { id: "hardware", icon: Wrench, description: "hardwareDesc" },
    { id: "salon", icon: Scissors, description: "salonDesc" },
    { id: "whatsapp", icon: MessageSquare, description: "whatsappDesc" },
    { id: "telegram", icon: Send, description: "telegramDesc" },
    { id: "chatgpt", icon: Bot, description: "chatgptDesc" },
    { id: "importexport", icon: FileInput, description: "importexportDesc" },
    { id: "invoice", icon: FileText, description: "invoiceDesc" },
    { id: "fees", icon: Percent, description: "feesDesc" },
    { id: "supermarket", icon: ShoppingCart, description: "supermarketDesc" },
    { id: "pharmacy", icon: Pill, description: "pharmacyDesc" },
];

export default function Modules() {
    const { language } = useLanguage();
    const [activeModules, setActiveModules] = useState<string[]>(() => {
        if (typeof window === "undefined") return [];
        try {
            const saved = localStorage.getItem("hipos_active_modules");
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Error loading from localStorage:", e);
            return [];
        }
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [moduleToToggle, setModuleToToggle] = useState<string | null>(null);
    const [isActivating, setIsActivating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [operationInProgress, setOperationInProgress] = useState(false);

    const t = translations[language as keyof typeof translations];

    useEffect(() => {
        const fetchActiveModules = async () => {
            try {
                setIsLoading(true);
                // Simulating API call
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const cachedModules = localStorage.getItem(
                    "hipos_active_modules",
                );
                if (cachedModules) {
                    setActiveModules(JSON.parse(cachedModules));
                } else {
                    setActiveModules(["restaurant", "retail"]);
                }
            } catch (err) {
                setError("Failed to load modules");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchActiveModules();
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(
                "hipos_active_modules",
                JSON.stringify(activeModules),
            );
        } catch (err) {
            console.error("Error saving to localStorage:", err);
        }
    }, [activeModules]);

    const filteredModules = moduleData.filter((module) =>
        t[module.id as keyof typeof t]
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
    );

    const toggleModule = (moduleId: string) => {
        setModuleToToggle(moduleId);
        setIsActivating(!activeModules.includes(moduleId));
    };

    const confirmToggle = async () => {
        if (moduleToToggle && !operationInProgress) {
            setOperationInProgress(true);
            try {
                setIsLoading(true);
                // Simulating API call
                await new Promise((resolve) => setTimeout(resolve, 1000));

                setActiveModules((prev) =>
                    prev.includes(moduleToToggle)
                        ? prev.filter((id) => id !== moduleToToggle)
                        : [...prev, moduleToToggle],
                );

                toast({
                    title: isActivating ? t.activate : t.deactivate,
                    description: `${t[moduleToToggle as keyof typeof t]} ${isActivating ? "activated" : "deactivated"}.`,
                });
            } catch (err) {
                setError(
                    `Failed to ${isActivating ? "activate" : "deactivate"} module`,
                );
                toast({
                    title: "Error",
                    description: `Failed to ${isActivating ? "activate" : "deactivate"} module.`,
                    variant: "destructive",
                });
            } finally {
                setModuleToToggle(null);
                setIsLoading(false);
                setOperationInProgress(false);
            }
        }
    };

    return (
        <div
            className="container mx-auto px-4 py-6 max-w-7xl"
            data-protonpass-form=""
        >
            <header className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {t.title}
                    </h1>
                    <p className="text-muted-foreground">{t.subtitle}</p>
                </div>
                <Button variant="outline" className="ml-auto">
                    {t.viewAll}
                </Button>
            </header>

            <section className="flex flex-col space-y-4 mb-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative flex-1 md:max-w-md">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t.search}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                            aria-label={t.search}
                        />
                    </div>
                    <Badge variant="secondary" className="md:self-center">
                        {t.activeModules}: {activeModules.length}
                    </Badge>
                </div>
            </section>

            <section className="bg-background rounded-lg">
                {isLoading ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[...Array(4)].map((_, index) => (
                            <ModuleSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {filteredModules.map((module) => (
                            <ModuleCard
                                key={module.id}
                                module={module}
                                isActive={activeModules.includes(module.id)}
                                onToggle={toggleModule}
                                isDisabled={operationInProgress}
                                t={t}
                            />
                        ))}
                    </div>
                )}
            </section>

            <Dialog
                open={Boolean(moduleToToggle)}
                onOpenChange={() => setModuleToToggle(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {isActivating
                                ? t.confirmActivation
                                : t.confirmDeactivation}
                        </DialogTitle>
                        <DialogDescription>
                            {isActivating
                                ? t.activationMessage
                                : t.deactivationMessage}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setModuleToToggle(null)}
                            disabled={operationInProgress}
                        >
                            {t.cancel}
                        </Button>
                        <Button
                            onClick={confirmToggle}
                            disabled={operationInProgress}
                        >
                            {t.confirm}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function ModuleCard({
    module,
    isActive,
    onToggle,
    isDisabled,
    t,
}: {
    module: (typeof moduleData)[0];
    isActive: boolean;
    onToggle: (id: string) => void;
    isDisabled: boolean;
    t: any;
}) {
    const Icon = module.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <Card role="article" aria-label={`${t[module.id]} module`}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Icon className="h-6 w-6" />
                        {t[module.id]}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        {t[module.description]}
                    </p>
                    <div className="flex items-center justify-between">
                        <span
                            className={
                                isActive ? "text-green-500" : "text-red-500"
                            }
                        >
                            {isActive ? (
                                <Check className="h-5 w-5" />
                            ) : (
                                <X className="h-5 w-5" />
                            )}
                        </span>
                        <Button
                            variant={isActive ? "destructive" : "default"}
                            onClick={() => onToggle(module.id)}
                            disabled={isDisabled}
                            aria-label={`${isActive ? t.deactivate : t.activate} ${t[module.id]} module`}
                        >
                            {isActive ? t.deactivate : t.activate}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function ModuleSkeleton() {
    return (
        <Card>
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
    );
}
