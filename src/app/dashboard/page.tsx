"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    Users,
    ShoppingCart,
    TrendingUp,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const translations = {
    en: {
        dashboard: "Dashboard",
        welcome: "Welcome to hiPOS control panel.",
        todaySales: "Today's Sales",
        pendingOrders: "Pending Orders",
        newCustomers: "New Customers",
        revenue: "Revenue",
        salesOverview: "Sales Overview",
        topSellingProducts: "Top Selling Products",
        revenueGrowth: "Revenue Growth",
        viewAll: "View All",
    },
    es: {
        dashboard: "Panel de Control",
        welcome: "Bienvenido al panel de control de hiPOS.",
        todaySales: "Ventas de Hoy",
        pendingOrders: "Pedidos Pendientes",
        newCustomers: "Nuevos Clientes",
        revenue: "Ingresos",
        salesOverview: "Resumen de Ventas",
        topSellingProducts: "Productos Más Vendidos",
        revenueGrowth: "Crecimiento de Ingresos",
        viewAll: "Ver Todo",
    },
    fr: {
        dashboard: "Tableau de Bord",
        welcome: "Bienvenue sur le panneau de contrôle hiPOS.",
        todaySales: "Ventes du Jour",
        pendingOrders: "Commandes en Attente",
        newCustomers: "Nouveaux Clients",
        revenue: "Revenus",
        salesOverview: "Aperçu des ventes",
        topSellingProducts: "Produits les plus vendus",
        revenueGrowth: "Croissance des revenus",
        viewAll: "Voir Tout",
    },
    it: {
        dashboard: "Cruscotto",
        welcome: "Benvenuto nel pannello di controllo hiPOS.",
        todaySales: "Vendite di Oggi",
        pendingOrders: "Ordini in Sospeso",
        newCustomers: "Nuovi Clienti",
        revenue: "Ricavi",
        salesOverview: "Panoramica delle vendite",
        topSellingProducts: "Prodotti più venduti",
        revenueGrowth: "Crescita dei ricavi",
        viewAll: "Vedi Tutto",
    },
    de: {
        dashboard: "Dashboard",
        welcome: "Willkommen im hiPOS-Kontrollpanel.",
        todaySales: "Heutige Verkäufe",
        pendingOrders: "Ausstehende Bestellungen",
        newCustomers: "Neue Kunden",
        revenue: "Umsatz",
        salesOverview: "Verkaufsübersicht",
        topSellingProducts: "Top-Verkaufsprodukte",
        revenueGrowth: "Umsatzwachstum",
        viewAll: "Alle Anzeigen",
    },
    pt: {
        dashboard: "Painel de Controle",
        welcome: "Bem-vindo ao painel de controle hiPOS.",
        todaySales: "Vendas de Hoje",
        pendingOrders: "Pedidos Pendentes",
        newCustomers: "Novos Clientes",
        revenue: "Receita",
        salesOverview: "Visão geral das vendas",
        topSellingProducts: "Produtos mais vendidos",
        revenueGrowth: "Crescimento da receita",
        viewAll: "Ver Tudo",
    },
};

const data = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 5500 },
];

const revenueData = [
    { name: "Jan", revenue: 10000 },
    { name: "Feb", revenue: 12000 },
    { name: "Mar", revenue: 11000 },
    { name: "Apr", revenue: 15000 },
    { name: "May", revenue: 14000 },
    { name: "Jun", revenue: 18000 },
];

const topProducts = [
    { name: "Product A", sales: 234 },
    { name: "Product B", sales: 187 },
    { name: "Product C", sales: 156 },
    { name: "Product D", sales: 132 },
    { name: "Product E", sales: 121 },
];

type ChartProps = {
    data: any[];
    title: string;
};

const BarChartCard = ({ data, title }: ChartProps) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="sales"
                        fill="#3B82F6"
                        aria-label="Sales data"
                        role="img"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                console.log("Bar chart interaction");
                            }
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
);

const LineChartCard = ({ data, title }: ChartProps) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#10B981" />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
);

const StatCard = ({
    title,
    value,
    trend,
    icon: Icon,
}: {
    title: string;
    value: string;
    trend: string;
    icon: any;
}) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{trend}</p>
        </CardContent>
    </Card>
);

const TopProductItem = ({
    product,
    index,
}: {
    product: (typeof topProducts)[0];
    index: number;
}) => (
    <div className="flex items-center">
        <div className="w-[64px] h-[64px] bg-muted rounded-lg mr-4"></div>
        <div className="flex-1">
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-muted-foreground">
                {product.sales} units sold
            </p>
        </div>
        {index === 0 ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
        ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
        )}
    </div>
);

export default function Dashboard() {
    const { language } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dashboardData, setDashboardData] = useState<any>(null);

    const t = translations[language as keyof typeof translations];

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                // Simulating an API call
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setDashboardData({ data, revenueData, topProducts });
                setError(null);
            } catch (err) {
                setError("Failed to fetch dashboard data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div
            className="container mx-auto px-4 py-6 max-w-7xl"
            data-protonpass-form=""
        >
            <header className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {t.dashboard}
                    </h1>
                    <p className="text-muted-foreground">{t.welcome}</p>
                </div>
                <Button variant="outline" className="ml-auto">
                    {t.viewAll}
                </Button>
            </header>

            <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatCard
                    title={t.todaySales}
                    value="€1,234.56"
                    trend="+20.1% from last month"
                    icon={DollarSign}
                />
                <StatCard
                    title={t.pendingOrders}
                    value="23"
                    trend="+5 since last hour"
                    icon={ShoppingCart}
                />
                <StatCard
                    title={t.newCustomers}
                    value="5"
                    trend="+2 since yesterday"
                    icon={Users}
                />
                <StatCard
                    title={t.revenue}
                    value="€45,231.89"
                    trend="+20.1% from last month"
                    icon={TrendingUp}
                />
            </section>

            <section className="grid gap-6 md:grid-cols-2 mb-8">
                <BarChartCard
                    data={dashboardData.data}
                    title={t.salesOverview}
                />
                <LineChartCard
                    data={dashboardData.revenueData}
                    title={t.revenueGrowth}
                />
            </section>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle>{t.topSellingProducts}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topProducts.map((product, index) => (
                                <TopProductItem
                                    key={index}
                                    product={product}
                                    index={index}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}

function DashboardSkeleton() {
    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-10 w-24" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {[...Array(4)].map((_, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-32 mb-2" />
                            <Skeleton className="h-4 w-48" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
                {[...Array(2)].map((_, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <Skeleton className="h-6 w-48" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-[300px] w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="flex items-center">
                                <Skeleton className="w-16 h-16 rounded-lg mr-4" />
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-32 mb-2" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <Skeleton className="h-4 w-4" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
