'use client';

import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
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
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DollarSign, TrendingUp, ShoppingBag, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { DateRange } from "react-day-picker";

const translations = {
    en: {
        title: "Sales Reports",
        subtitle: "Analyze your business performance",
        salesOverTime: "Sales Trends",
        topProducts: "Best Sellers",
        revenueByCategory: "Category Revenue",
        customerGrowth: "Customer Growth",
        averageOrderValue: "Average Order Value",
        dailySales: "Daily",
        monthlySales: "Monthly",
        yearlySales: "Yearly",
        selectDate: "Choose date",
        selectMonth: "Choose month",
        selectYear: "Choose year",
        product: "Product",
        sales: "Sales",
        category: "Category",
        revenue: "Revenue",
        apply: "Apply",
        reset: "Reset",
        errorLoading: "Error loading data. Please try again.",
        retry: "Retry",
    },
    es: {
        title: "Informes de Ventas",
        subtitle: "Analiza el rendimiento de tu negocio",
        salesOverTime: "Tendencias de Ventas",
        topProducts: "Más Vendidos",
        revenueByCategory: "Ingresos por Categoría",
        customerGrowth: "Crecimiento de Clientes",
        averageOrderValue: "Valor Promedio de Pedido",
        dailySales: "Diario",
        monthlySales: "Mensual",
        yearlySales: "Anual",
        selectDate: "Elegir fecha",
        selectMonth: "Elegir mes",
        selectYear: "Elegir año",
        product: "Producto",
        sales: "Ventas",
        category: "Categoría",
        revenue: "Ingresos",
        apply: "Aplicar",
        reset: "Reiniciar",
        errorLoading: "Error al cargar datos. Por favor, intenta de nuevo.",
        retry: "Reintentar",
    },
    fr: {
        title: "Rapports de Ventes",
        subtitle: "Analysez la performance de votre entreprise",
        salesOverTime: "Tendances des Ventes",
        topProducts: "Meilleures Ventes",
        revenueByCategory: "Revenus par Catégorie",
        customerGrowth: "Croissance des Clients",
        averageOrderValue: "Valeur Moyenne des Commandes",
        dailySales: "Quotidien",
        monthlySales: "Mensuel",
        yearlySales: "Annuel",
        selectDate: "Choisir date",
        selectMonth: "Choisir mois",
        selectYear: "Choisir année",
        product: "Produit",
        sales: "Ventes",
        category: "Catégorie",
        revenue: "Revenus",
        apply: "Appliquer",
        reset: "Réinitialiser",
        errorLoading: "Erreur de chargement des données. Veuillez réessayer.",
        retry: "Réessayer",
    },
    it: {
        title: "Report Vendite",
        subtitle: "Analizza le prestazioni del tuo business",
        salesOverTime: "Tendenze Vendite",
        topProducts: "Più Venduti",
        revenueByCategory: "Ricavi per Categoria",
        customerGrowth: "Crescita Clienti",
        averageOrderValue: "Valore Medio Ordine",
        dailySales: "Giornaliero",
        monthlySales: "Mensile",
        yearlySales: "Annuale",
        selectDate: "Scegli data",
        selectMonth: "Scegli mese",
        selectYear: "Scegli anno",
        product: "Prodotto",
        sales: "Vendite",
        category: "Categoria",
        revenue: "Ricavi",
        apply: "Applica",
        reset: "Reimposta",
        errorLoading: "Errore durante il caricamento dei dati. Riprova.",
        retry: "Riprova",
    },
    de: {
        title: "Verkaufsberichte",
        subtitle: "Analysieren Sie Ihre Geschäftsleistung",
        salesOverTime: "Verkaufstrends",
        topProducts: "Bestseller",
        revenueByCategory: "Umsatz nach Kategorie",
        customerGrowth: "Kundenwachstum",
        averageOrderValue: "Durchschnittlicher Bestellwert",
        dailySales: "Täglich",
        monthlySales: "Monatlich",
        yearlySales: "Jährlich",
        selectDate: "Datum wählen",
        selectMonth: "Monat wählen",
        selectYear: "Jahr wählen",
        product: "Produkt",
        sales: "Verkäufe",
        category: "Kategorie",
        revenue: "Umsatz",
        apply: "Anwenden",
        reset: "Zurücksetzen",
        errorLoading:
            "Fehler beim Laden der Daten. Bitte versuchen Sie es erneut.",
        retry: "Erneut versuchen",
    },
    pt: {
        title: "Relatórios de Vendas",
        subtitle: "Analise o desempenho do seu negócio",
        salesOverTime: "Tendências de Vendas",
        topProducts: "Mais Vendidos",
        revenueByCategory: "Receita por Categoria",
        customerGrowth: "Crescimento de Clientes",
        averageOrderValue: "Valor Médio do Pedido",
        dailySales: "Diário",
        monthlySales: "Mensal",
        yearlySales: "Anual",
        selectDate: "Escolher data",
        selectMonth: "Escolher mês",
        selectYear: "Escolher ano",
        product: "Produto",
        sales: "Vendas",
        category: "Categoria",
        revenue: "Receita",
        apply: "Aplicar",
        reset: "Redefinir",
        errorLoading: "Erro ao carregar os dados. Tente novamente.",
        retry: "Tentar novamente",
    },
};

const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 5500 },
];

const topProductsData = [
    { name: "Product A", sales: 4000 },
    { name: "Product B", sales: 3000 },
    { name: "Product C", sales: 2000 },
    { name: "Product D", sales: 2780 },
    { name: "Product E", sales: 1890 },
];

const categoryData = [
    { name: "Category A", value: 400 },
    { name: "Category B", value: 300 },
    { name: "Category C", value: 300 },
    { name: "Category D", value: 200 },
];

const customerGrowthData = [
    { name: "Jan", customers: 100 },
    { name: "Feb", customers: 120 },
    { name: "Mar", customers: 150 },
    { name: "Apr", customers: 180 },
    { name: "May", customers: 220 },
    { name: "Jun", customers: 270 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Report() {
    const { language } = useLanguage();
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
    });
    const [timeRange, setTimeRange] = useState("monthly");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const t = translations[language as keyof typeof translations];

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Simulating API call
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setIsLoading(false);
            } catch (err) {
                setError(t.errorLoading);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [t.errorLoading]); // Removed unnecessary dependencies: dateRange, timeRange

    const resetFilters = () => {
        setDateRange({
            from: new Date(new Date().getFullYear(), 0, 1),
            to: new Date(),
        });
        setTimeRange("monthly");
    };

    const retryLoading = () => {
        setIsLoading(true);
        setError(null);
        // Simulating API call
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                <Button onClick={retryLoading} className="mt-4">
                    {t.retry}
                </Button>
            </Alert>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
                <p className="text-muted-foreground">{t.subtitle}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-2">
                <DatePickerWithRange date={dateRange} setDate={setDateRange} />
                <div className="flex items-center space-x-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={t.selectMonth} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="daily">
                                {t.dailySales}
                            </SelectItem>
                            <SelectItem value="monthly">
                                {t.monthlySales}
                            </SelectItem>
                            <SelectItem value="yearly">
                                {t.yearlySales}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={resetFilters} variant="outline">
                        {t.reset}
                    </Button>
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {t.sales}
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-[100px]" />
                        ) : (
                            <>
                                <div className="text-2xl font-bold">
                                    €45,231.89
                                </div>
                                <p className="text-xs text-green-500">
                                    +20.1% from last month
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {t.averageOrderValue}
                        </CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-[100px]" />
                        ) : (
                            <>
                                <div className="text-2xl font-bold">
                                    €234.56
                                </div>
                                <p className="text-xs text-orange-500">
                                    +2.5% from last month
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {t.customerGrowth}
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-[100px]" />
                        ) : (
                            <>
                                <div className="text-2xl font-bold">+270</div>
                                <p className="text-xs text-green-500">
                                    +22.6% from last month
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {t.revenue}
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-[100px]" />
                        ) : (
                            <>
                                <div className="text-2xl font-bold">
                                    €89,432.56
                                </div>
                                <p className="text-xs text-blue-500">
                                    +10.1% from last month
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{t.salesOverTime}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-[300px] w-full" />
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="sales" fill="#3B82F6" />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{t.customerGrowth}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-[300px] w-full" />
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={customerGrowthData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="customers"
                                        stroke="#10B981"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{t.topProducts}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-[300px] w-full" />
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={topProductsData}
                                    layout="vertical"
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="sales" fill="#3B82F6" />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{t.revenueByCategory}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-[300px] w-full" />
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) =>
                                            `${name} ${(percent * 100).toFixed(0)}%`
                                        }
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
