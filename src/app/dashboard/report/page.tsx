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

function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    isLoading,
}: {
    title: string;
    value: string;
    icon: any;
    trend: { value: string; color: string };
    isLoading: boolean;
}) {
    return (
        <Card className="bg-background rounded-lg shadow border-border">
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
                        <p className={`text-xs text-${trend.color}-500`}>
                            {trend.value}
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

function ChartCard({
    title,
    children,
    isLoading,
}: {
    title: string;
    children: React.ReactNode;
    isLoading: boolean;
}) {
    return (
        <Card className="bg-background rounded-lg shadow border-border">
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
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setIsLoading(false);
            } catch (err) {
                setError(t.errorLoading);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [t.errorLoading]);

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

    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl">
            <header className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {t.title}
                    </h1>
                    <p className="text-muted-foreground">{t.subtitle}</p>
                </div>
            </header>

            <section className="flex flex-col space-y-4 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <DatePickerWithRange
                        date={dateRange}
                        setDate={setDateRange}
                    />
                    <div className="flex items-center gap-2">
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
            </section>

            <section className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title={t.sales}
                        value="€45,231.89"
                        icon={DollarSign}
                        trend={{
                            value: "+20.1% from last month",
                            color: "green",
                        }}
                        isLoading={isLoading}
                    />
                    <StatCard
                        title={t.averageOrderValue}
                        value="€234.56"
                        icon={ShoppingBag}
                        trend={{
                            value: "+2.5% from last month",
                            color: "orange",
                        }}
                        isLoading={isLoading}
                    />
                    <StatCard
                        title={t.customerGrowth}
                        value="+270"
                        icon={Users}
                        trend={{
                            value: "+22.6% from last month",
                            color: "green",
                        }}
                        isLoading={isLoading}
                    />
                    <StatCard
                        title={t.revenue}
                        value="€89,432.56"
                        icon={TrendingUp}
                        trend={{
                            value: "+10.1% from last month",
                            color: "blue",
                        }}
                        isLoading={isLoading}
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <ChartCard title={t.salesOverTime} isLoading={isLoading}>
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
                    </ChartCard>

                    <ChartCard title={t.customerGrowth} isLoading={isLoading}>
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
                    </ChartCard>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <ChartCard title={t.topProducts} isLoading={isLoading}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={topProductsData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sales" fill="#3B82F6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard
                        title={t.revenueByCategory}
                        isLoading={isLoading}
                    >
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
                    </ChartCard>
                </div>
            </section>
        </div>
    );
}
