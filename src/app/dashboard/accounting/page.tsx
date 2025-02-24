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

interface TranslationType {
    title: string;
    subtitle: string;
    revenueExpenses: string;
    topExpenses: string;
    profitLoss: string;
    cashFlow: string;
    balanceSheet: string;
    filterByDate: string;
    reset: string;
    timeRange: string;
    daily: string;
    weekly: string;
    monthly: string;
    yearly: string;
    revenue: string;
    expenses: string;
    profit: string;
    loss: string;
    assets: string;
    liabilities: string;
    equity: string;
    apply: string;
    viewAll: string;
    errorLoading: string;
    retry: string;
    lastMonth: string;
}

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
        lastMonth: "from last month",
    },
    es: {
        // Spanish translations...
    },
    fr: {
        // French translations...
    },
    it: {
        // Italian translations...
    },
    de: {
        // German translations...
    },
    pt: {
        // Portuguese translations...
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

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    changeColor: string;
    icon: React.ElementType;
    isLoading: boolean;
}

function StatCard({
    title,
    value,
    change,
    changeColor,
    icon: Icon,
    isLoading,
}: StatCardProps) {
    return (
        <Card className="bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Skeleton className="h-8 w-[100px]" />
                ) : (
                    <>
                        <div className="text-2xl font-bold">{value}</div>
                        <p className={`text-xs ${changeColor}`}>{change}</p>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

interface ChartCardProps {
    title: string;
    isLoading: boolean;
    children: React.ReactNode;
}

function ChartCard({ title, isLoading, children }: ChartCardProps) {
    return (
        <Card className="bg-background">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Skeleton className="h-[300px] w-full" />
                ) : (
                    children
                )}
            </CardContent>
        </Card>
    );
}

export default function Accounting() {
    const { language } = useLanguage();
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
    });
    const [timeRange, setTimeRange] = useState("monthly");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const t = (translations[language as keyof typeof translations] || translations.en) as TranslationType;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setIsLoading(false);
            } catch (err) {
                setError(t.errorLoading);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [language]);

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
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    if (error) {
        return (
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                    <Button onClick={retryLoading} className="mt-4">
                        {t.retry}
                    </Button>
                </Alert>
            </div>
        );
    }

    const statCards = [
        {
            title: t.revenue,
            value: "€45,231.89",
            change: `+20.1% ${t.lastMonth}`,
            changeColor: "text-green-500",
            icon: DollarSign,
        },
        {
            title: t.expenses,
            value: "€32,456.78",
            change: `+15.2% ${t.lastMonth}`,
            changeColor: "text-orange-500",
            icon: ShoppingBag,
        },
        {
            title: t.profit,
            value: "€12,775.11",
            change: `+35.8% ${t.lastMonth}`,
            changeColor: "text-green-500",
            icon: Wallet,
        },
        {
            title: t.cashFlow,
            value: "€8,942.57",
            change: `+10.1% ${t.lastMonth}`,
            changeColor: "text-blue-500",
            icon: TrendingUp,
        },
    ];

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
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {t.viewAll}
                </Button>
            </header>

            <section className="flex flex-col space-y-4 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-2">
                    <DatePickerWithRange
                        date={dateRange}
                        setDate={setDateRange}
                    />
                    <div className="flex items-center space-x-2">
                        <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={t.timeRange} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="daily">{t.daily}</SelectItem>
                                <SelectItem value="weekly">
                                    {t.weekly}
                                </SelectItem>
                                <SelectItem value="monthly">
                                    {t.monthly}
                                </SelectItem>
                                <SelectItem value="yearly">
                                    {t.yearly}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={resetFilters} variant="outline">
                            {t.reset}
                        </Button>
                    </div>
                </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
                {statCards.map((card, index) => (
                    <StatCard key={index} {...card} isLoading={isLoading} />
                ))}
            </section>

            <section className="grid gap-6 md:grid-cols-2 mb-6">
                <ChartCard title={t.revenueExpenses} isLoading={isLoading}>
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
                </ChartCard>

                <ChartCard title={t.profitLoss} isLoading={isLoading}>
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
                </ChartCard>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
                <ChartCard title={t.topExpenses} isLoading={isLoading}>
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
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title={t.balanceSheet} isLoading={isLoading}>
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
                                {balanceSheetData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </section>
        </div>
    );
}
