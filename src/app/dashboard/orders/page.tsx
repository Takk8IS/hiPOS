"use client";

import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Search, Eye, ArrowUpDown, Download } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import type { DateRange } from "react-day-picker";

const translations = {
    en: {
        title: "Order Management",
        subtitle: "View and manage your orders efficiently",
        search: "Search orders",
        orderNumber: "Order ID",
        customer: "Customer",
        date: "Date",
        total: "Total",
        status: "Status",
        actions: "Actions",
        viewDetails: "View Details",
        filterByDate: "Date Range",
        apply: "Apply",
        reset: "Reset",
        export: "Export",
        completed: "Completed",
        processing: "Processing",
        cancelled: "Cancelled",
        orderDetails: "Order Details",
        items: "Items",
        quantity: "Quantity",
        price: "Price",
        subtotal: "Subtotal",
        shippingAddress: "Shipping Address",
        paymentMethod: "Payment Method",
        updateStatus: "Update Status",
        statusUpdated: "Order status updated successfully",
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

type Order = {
    id: number;
    orderNumber: string;
    customer: string;
    date: string;
    total: number;
    status: "completed" | "processing" | "cancelled";
    items: Array<{ name: string; quantity: number; price: number }>;
    shippingAddress: string;
    paymentMethod: string;
};

const ordersData: Order[] = [
    {
        id: 1,
        orderNumber: "ORD-001",
        customer: "John Doe",
        date: "2023-06-01",
        total: 150.0,
        status: "completed",
        items: [
            { name: "Product A", quantity: 2, price: 50.0 },
            { name: "Product B", quantity: 1, price: 50.0 },
        ],
        shippingAddress: "123 Main St, Anytown, AN 12345",
        paymentMethod: "Credit Card",
    },
    // Additional orders data...
];

interface OrderDetailsProps {
    order: Order;
    onStatusChange: (orderId: number, newStatus: Order["status"]) => void;
    t: any;
}

function OrderDetails({ order, onStatusChange, t }: OrderDetailsProps) {
    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">{t.customer}</Label>
                <div className="col-span-3">{order.customer}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">{t.date}</Label>
                <div className="col-span-3">{order.date}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">{t.total}</Label>
                <div className="col-span-3">
                    {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    }).format(order.total)}
                </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">{t.status}</Label>
                <div className="col-span-3">
                    <Badge
                        variant={
                            order.status === "completed"
                                ? "success"
                                : order.status === "processing"
                                  ? "warning"
                                  : "destructive"
                        }
                    >
                        {t[order.status]}
                    </Badge>
                </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">{t.items}</Label>
                <div className="col-span-3">
                    <ul className="space-y-2">
                        {order.items.map((item, index) => (
                            <li key={index} className="text-sm">
                                {item.name} - {t.quantity}: {item.quantity},{" "}
                                {t.price}:{" "}
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(item.price)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">{t.shippingAddress}</Label>
                <div className="col-span-3">{order.shippingAddress}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">{t.paymentMethod}</Label>
                <div className="col-span-3">{order.paymentMethod}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">{t.updateStatus}</Label>
                <Select
                    onValueChange={(value) => {
                        onStatusChange(order.id, value as Order["status"]);
                    }}
                    defaultValue={order.status}
                >
                    <SelectTrigger className="col-span-3">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="completed">{t.completed}</SelectItem>
                        <SelectItem value="processing">
                            {t.processing}
                        </SelectItem>
                        <SelectItem value="cancelled">{t.cancelled}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default function Orders() {
    const { language } = useLanguage();
    const [orders, setOrders] = useState<Order[]>(ordersData);
    const [searchTerm, setSearchTerm] = useState("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        to: new Date(),
    });

    const t = translations[language as keyof typeof translations];

    const handleStatusChange = (
        orderId: number,
        newStatus: Order["status"],
    ) => {
        setOrders(
            orders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order,
            ),
        );

        toast({
            title: t.statusUpdated,
            description: `Order #${orderId} - ${t[newStatus]}`,
        });
    };

    const columns: ColumnDef<Order>[] = [
        {
            accessorKey: "orderNumber",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {t.orderNumber}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: "customer",
            header: t.customer,
        },
        {
            accessorKey: "date",
            header: t.date,
        },
        {
            accessorKey: "total",
            header: t.total,
            cell: ({ row }) => {
                const amount = Number.parseFloat(row.getValue("total"));
                return (
                    <div className="text-right font-medium">
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(amount)}
                    </div>
                );
            },
        },
        {
            accessorKey: "status",
            header: t.status,
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                return (
                    <Badge
                        variant={
                            status === "completed"
                                ? "success"
                                : status === "processing"
                                  ? "warning"
                                  : "destructive"
                        }
                    >
                        {t[status]}
                    </Badge>
                );
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const order = row.original;
                return (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <span className="sr-only">{t.viewDetails}</span>
                                <Eye className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>{t.orderDetails}</DialogTitle>
                                <DialogDescription>
                                    {t.orderNumber}: {order.orderNumber}
                                </DialogDescription>
                            </DialogHeader>
                            <OrderDetails
                                order={order}
                                onStatusChange={handleStatusChange}
                                t={t}
                            />
                        </DialogContent>
                    </Dialog>
                );
            },
        },
    ];

    const filteredOrders = orders.filter(
        (order) =>
            (order.orderNumber
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
                order.customer
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) &&
            (!dateRange?.from || new Date(order.date) >= dateRange.from) &&
            (!dateRange?.to || new Date(order.date) <= dateRange.to),
    );

    const resetFilters = () => {
        setDateRange({
            from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            to: new Date(),
        });
        setSearchTerm("");
    };

    const handleExport = () => {
        const csvContent =
            "data:text/csv;charset=utf-8," +
            [
                [t.orderNumber, t.customer, t.date, t.total, t.status].join(
                    ",",
                ),
                ...filteredOrders.map((order) =>
                    [
                        order.orderNumber,
                        order.customer,
                        order.date,
                        order.total,
                        order.status,
                    ].join(","),
                ),
            ].join("\n");

        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "orders.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                <Button variant="outline" onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    {t.export}
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
                    <div className="flex flex-col md:flex-row gap-2">
                        <DatePickerWithRange
                            date={dateRange}
                            setDate={setDateRange}
                        />
                        <Button
                            onClick={resetFilters}
                            variant="outline"
                            className="whitespace-nowrap"
                        >
                            {t.reset}
                        </Button>
                    </div>
                </div>
            </section>

            <section className="bg-background rounded-lg shadow">
                <Card className="border-0">
                    <CardContent className="p-6">
                        <DataTable columns={columns} data={filteredOrders} />
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
