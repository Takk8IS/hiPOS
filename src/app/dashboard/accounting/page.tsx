"use client";

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
import type { DateRange } from "react-day-picker";
import { DollarSign, TrendingUp, ShoppingBag, Wallet } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const translations = {
    en: {
        title: "Financial Overview",
        subtitle: "Track your business finances at a glance",
        revenueExpenses: "Revenue vs Expenses",
        topExpenses: "Top Expenses",
        profitLoss: "Profit & Loss",
        cashFlow: "Cash Flow",
        balanceSheet: "Balance Sheet",
        filterByDate: "Date Filter",
        reset: "Reset",
        timeRange: "Time Range",
        daily: "Daily",
        weekly: "Weekly",
        monthly: "Monthly",
        yearly: "Yearly",
        revenue: "Revenue",
        expenses: "Expenses",
        profit: "Profit",
        loss: "Loss",
        assets: "Assets",
        liabilities: "Liabilities",
        equity: "Equity",
        apply: "Apply",
        viewAll: "View All",
        errorLoading: "Error loading financial data. Please try again.",
        retry: "Retry",
    },
    es: {
        title: "Resumen Financiero",
        subtitle: "Controle las finanzas de su negocio de un vistazo",
        revenueExpenses: "Ingresos vs Gastos",
        topExpenses: "Gastos Principales",
        profitLoss: "Ganancias y Pérdidas",
        cashFlow: "Flujo de Caja",
        balanceSheet: "Balance General",
        filterByDate: "Filtro de Fecha",
        reset: "Reiniciar",
        timeRange: "Periodo",
        daily: "Diario",
        weekly: "Semanal",
        monthly: "Mensual",
        yearly: "Anual",
        revenue: "Ingresos",
        expenses: "Gastos",
        profit: "Ganancia",
        loss: "Pérdida",
        assets: "Activos",
        liabilities: "Pasivos",
        equity: "Patrimonio",
        apply: "Aplicar",
        viewAll: "Ver Todo",
        errorLoading:
            "Error al cargar datos financieros. Por favor, intente de nuevo.",
        retry: "Reintentar",
    },
    fr: {
        title: "Aperçu Financier",
        subtitle: "Suivez vos finances d'entreprise en un coup d'œil",
        revenueExpenses: "Revenus vs Dépenses",
        topExpenses: "Principales Dépenses",
        profitLoss: "Profits et Pertes",
        cashFlow: "Flux de Trésorerie",
        balanceSheet: "Bilan",
        filterByDate: "Filtre de Date",
        reset: "Réinitialiser",
        timeRange: "Période",
        daily: "Quotidien",
        weekly: "Hebdomadaire",
        monthly: "Mensuel",
        yearly: "Annuel",
        revenue: "Revenus",
        expenses: "Dépenses",
        profit: "Profit",
        loss: "Perte",
        assets: "Actifs",
        liabilities: "Passifs",
        equity: "Capitaux Propres",
        apply: "Appliquer",
        viewAll: "Voir Tout",
        errorLoading:
            "Erreur lors du chargement des données financières. Veuillez réessayer.",
        retry: "Réessayer",
    },
    it: {
        title: "Panoramica Finanziaria",
        subtitle: "Monitora le finanze aziendali a colpo d'occhio",
        revenueExpenses: "Ricavi vs Spese",
        topExpenses: "Spese Principali",
        profitLoss: "Profitti e Perdite",
        cashFlow: "Flusso di Cassa",
        balanceSheet: "Bilancio",
        filterByDate: "Filtro Data",
        reset: "Ripristina",
        timeRange: "Periodo",
        daily: "Giornaliero",
        weekly: "Settimanale",
        monthly: "Mensile",
        yearly: "Annuale",
        revenue: "Ricavi",
        expenses: "Spese",
        profit: "Profitto",
        loss: "Perdita",
        assets: "Attività",
        liabilities: "Passività",
        equity: "Patrimonio Netto",
        apply: "Applica",
        viewAll: "Vedi Tutto",
        errorLoading:
            "Errore durante il caricamento dei dati finanziari. Riprova.",
        retry: "Riprova",
    },
    de: {
        title: "Finanzübersicht",
        subtitle: "Verfolgen Sie Ihre Geschäftsfinanzen auf einen Blick",
        revenueExpenses: "Einnahmen vs Ausgaben",
        topExpenses: "Top-Ausgaben",
        profitLoss: "Gewinn & Verlust",
        cashFlow: "Cashflow",
        balanceSheet: "Bilanz",
        filterByDate: "Datumsfilter",
        reset: "Zurücksetzen",
        timeRange: "Zeitraum",
        daily: "Täglich",
        weekly: "Wöchentlich",
        monthly: "Monatlich",
        yearly: "Jährlich",
        revenue: "Einnahmen",
        expenses: "Ausgaben",
        profit: "Gewinn",
        loss: "Verlust",
        assets: "Aktiva",
        liabilities: "Passiva",
        equity: "Eigenkapital",
        apply: "Anwenden",
        viewAll: "Alle Anzeigen",
        errorLoading:
            "Fehler beim Laden der Finanzdaten. Bitte versuchen Sie es erneut.",
        retry: "Erneut versuchen",
    },
    pt: {
        title: "Visão Financeira",
        subtitle: "Acompanhe as finanças do seu negócio rapidamente",
        revenueExpenses: "Receitas vs Despesas",
        topExpenses: "Principais Despesas",
        profitLoss: "Lucros e Perdas",
        cashFlow: "Fluxo de Caixa",
        balanceSheet: "Balanço Patrimonial",
        filterByDate: "Filtro de Data",
        reset: "Redefinir",
        timeRange: "Período",
        daily: "Diário",
        weekly: "Semanal",
        monthly: "Mensal",
        yearly: "Anual",
        revenue: "Receita",
        expenses: "Despesas",
        profit: "Lucro",
        loss: "Prejuízo",
        assets: "Ativos",
        liabilities: "Passivos",
        equity: "Patrimônio Líquido",
        apply: "Aplicar",
        viewAll: "Ver Tudo",
        errorLoading: "Erro ao carregar dados financeiros. Tente novamente.",
        retry: "Tentar novamente",
    },
};

const financialData = [
    { month: "Jan", revenue: 4000, expenses: 2400 },
    { month: "Feb", revenue: 3000, expenses: 1398 },
    { month: "Mar", revenue: 2000, expenses: 9800 },
    { month: "Apr", revenue: 2780, expenses: 3908 },
    { month: "May", revenue: 1890, expenses: 4800 },
    { month: "Jun", revenue: 2390, expenses: 3800 },
];

const topExpenses = [
    { category: "Rent", amount: 2000 },
    { category: "Salaries", amount: 5000 },
    { category: "Utilities", amount: 1000 },
    { category: "Inventory", amount: 3000 },
    { category: "Marketing", amount: 1500 },
];

const balanceSheetData = [
    { name: "Assets", value: 50000 },
    { name: "Liabilities", value: 30000 },
    { name: "Equity", value: 20000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function Accounting() {
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
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {t.title}
                    </h1>
                    <p className="text-muted-foreground">{t.subtitle}</p>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {t.viewAll}
                </Button>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-2">
                <DatePickerWithRange date={dateRange} setDate={setDateRange} />
                <div className="flex items-center space-x-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={t.timeRange} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="daily">{t.daily}</SelectItem>
                            <SelectItem value="weekly">{t.weekly}</SelectItem>
                            <SelectItem value="monthly">{t.monthly}</SelectItem>
                            <SelectItem value="yearly">{t.yearly}</SelectItem>
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
                            {t.revenue}
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
                            {t.expenses}
                        </CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-[100px]" />
                        ) : (
                            <>
                                <div className="text-2xl font-bold">
                                    €32,456.78
                                </div>
                                <p className="text-xs text-orange-500">
                                    +15.2% from last month
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {t.profit}
                        </CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-[100px]" />
                        ) : (
                            <>
                                <div className="text-2xl font-bold">
                                    €12,775.11
                                </div>
                                <p className="text-xs text-green-500">
                                    +35.8% from last month
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {t.cashFlow}
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-[100px]" />
                        ) : (
                            <>
                                <div className="text-2xl font-bold">
                                    €8,942.57
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
                        <CardTitle>{t.revenueExpenses}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-[300px] w-full" />
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={financialData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="revenue"
                                        fill="#3B82F6"
                                        name={t.revenue}
                                    />
                                    <Bar
                                        dataKey="expenses"
                                        fill="#EF4444"
                                        name={t.expenses}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{t.profitLoss}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-[300px] w-full" />
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={financialData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#3B82F6"
                                        name={t.revenue}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="expenses"
                                        stroke="#EF4444"
                                        name={t.expenses}
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
                        <CardTitle>{t.topExpenses}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-[300px] w-full" />
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={topExpenses}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="amount"
                                        label={({ name, percent }) =>
                                            `${name} ${(percent * 100).toFixed(0)}%`
                                        }
                                    >
                                        {topExpenses.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{t.balanceSheet}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-[300px] w-full" />
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={balanceSheetData}
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
                                        {balanceSheetData.map(
                                            (entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
                                                />
                                            ),
                                        )}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
