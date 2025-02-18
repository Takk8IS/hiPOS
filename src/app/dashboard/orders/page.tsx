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
        title: "Gestión de Pedidos",
        subtitle: "Visualiza y gestiona tus pedidos eficientemente",
        search: "Buscar pedidos",
        orderNumber: "ID de Pedido",
        customer: "Cliente",
        date: "Fecha",
        total: "Total",
        status: "Estado",
        actions: "Acciones",
        viewDetails: "Ver Detalles",
        filterByDate: "Rango de Fechas",
        apply: "Aplicar",
        reset: "Reiniciar",
        export: "Exportar",
        completed: "Completado",
        processing: "En Proceso",
        cancelled: "Cancelado",
        orderDetails: "Detalles del Pedido",
        items: "Artículos",
        quantity: "Cantidad",
        price: "Precio",
        subtotal: "Subtotal",
        shippingAddress: "Dirección de Envío",
        paymentMethod: "Método de Pago",
        updateStatus: "Actualizar Estado",
        statusUpdated: "Estado del pedido actualizado con éxito",
    },
    fr: {
        title: "Gestion des Commandes",
        subtitle: "Visualisez et gérez vos commandes efficacement",
        search: "Rechercher des commandes",
        orderNumber: "ID Commande",
        customer: "Client",
        date: "Date",
        total: "Total",
        status: "Statut",
        actions: "Actions",
        viewDetails: "Voir Détails",
        filterByDate: "Plage de Dates",
        apply: "Appliquer",
        reset: "Réinitialiser",
        export: "Exporter",
        completed: "Terminé",
        processing: "En Cours",
        cancelled: "Annulé",
        orderDetails: "Détails de la Commande",
        items: "Articles",
        quantity: "Quantité",
        price: "Prix",
        subtotal: "Sous-total",
        shippingAddress: "Adresse de Livraison",
        paymentMethod: "Méthode de Paiement",
        updateStatus: "Mettre à Jour le Statut",
        statusUpdated: "Statut de la commande mis à jour avec succès",
    },
    it: {
        title: "Gestione Ordini",
        subtitle: "Visualizza e gestisci i tuoi ordini in modo efficiente",
        search: "Cerca ordini",
        orderNumber: "ID Ordine",
        customer: "Cliente",
        date: "Data",
        total: "Totale",
        status: "Stato",
        actions: "Azioni",
        viewDetails: "Visualizza Dettagli",
        filterByDate: "Intervallo di Date",
        apply: "Applica",
        reset: "Reimposta",
        export: "Esporta",
        completed: "Completato",
        processing: "In Elaborazione",
        cancelled: "Annullato",
        orderDetails: "Dettagli dell'Ordine",
        items: "Articoli",
        quantity: "Quantità",
        price: "Prezzo",
        subtotal: "Subtotale",
        shippingAddress: "Indirizzo di Spedizione",
        paymentMethod: "Metodo di Pagamento",
        updateStatus: "Aggiorna Stato",
        statusUpdated: "Stato dell'ordine aggiornato con successo",
    },
    de: {
        title: "Auftragsverwaltung",
        subtitle: "Sehen und verwalten Sie Ihre Aufträge effizient",
        search: "Aufträge suchen",
        orderNumber: "Auftragsnummer",
        customer: "Kunde",
        date: "Datum",
        total: "Gesamt",
        status: "Status",
        actions: "Aktionen",
        viewDetails: "Details anzeigen",
        filterByDate: "Datumsbereich",
        apply: "Anwenden",
        reset: "Zurücksetzen",
        export: "Exportieren",
        completed: "Abgeschlossen",
        processing: "In Bearbeitung",
        cancelled: "Storniert",
        orderDetails: "Auftragsdetails",
        items: "Artikel",
        quantity: "Menge",
        price: "Preis",
        subtotal: "Zwischensumme",
        shippingAddress: "Lieferadresse",
        paymentMethod: "Zahlungsmethode",
        updateStatus: "Status aktualisieren",
        statusUpdated: "Auftragsstatus erfolgreich aktualisiert",
    },
    pt: {
        title: "Gestão de Pedidos",
        subtitle: "Visualize e gerencie seus pedidos de forma eficiente",
        search: "Buscar pedidos",
        orderNumber: "ID do Pedido",
        customer: "Cliente",
        date: "Data",
        total: "Total",
        status: "Status",
        actions: "Ações",
        viewDetails: "Ver Detalhes",
        filterByDate: "Intervalo de Datas",
        apply: "Aplicar",
        reset: "Redefinir",
        export: "Exportar",
        completed: "Concluído",
        processing: "Em Processamento",
        cancelled: "Cancelado",
        orderDetails: "Detalhes do Pedido",
        items: "Itens",
        quantity: "Quantidade",
        price: "Preço",
        subtotal: "Subtotal",
        shippingAddress: "Endereço de Entrega",
        paymentMethod: "Método de Pagamento",
        updateStatus: "Atualizar Status",
        statusUpdated: "Status do pedido atualizado com sucesso",
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
    {
        id: 2,
        orderNumber: "ORD-002",
        customer: "Jane Smith",
        date: "2023-06-02",
        total: 75.5,
        status: "processing",
        items: [{ name: "Product C", quantity: 1, price: 75.5 }],
        shippingAddress: "456 Elm St, Othertown, OT 67890",
        paymentMethod: "PayPal",
    },
    {
        id: 3,
        orderNumber: "ORD-003",
        customer: "Alice Johnson",
        date: "2023-06-03",
        total: 200.0,
        status: "completed",
        items: [{ name: "Product D", quantity: 2, price: 100.0 }],
        shippingAddress: "789 Oak St, Somewhere, SW 13579",
        paymentMethod: "Credit Card",
    },
    {
        id: 4,
        orderNumber: "ORD-004",
        customer: "Bob Williams",
        date: "2023-06-04",
        total: 100.0,
        status: "cancelled",
        items: [{ name: "Product E", quantity: 1, price: 100.0 }],
        shippingAddress: "321 Pine St, Nowhere, NW 97531",
        paymentMethod: "Bank Transfer",
    },
    {
        id: 5,
        orderNumber: "ORD-005",
        customer: "Charlie Brown",
        date: "2023-06-05",
        total: 300.0,
        status: "processing",
        items: [{ name: "Product F", quantity: 3, price: 100.0 }],
        shippingAddress: "654 Maple St, Everywhere, EV 24680",
        paymentMethod: "Credit Card",
    },
];

export default function Orders() {
    const { language } = useLanguage();
    const [orders, setOrders] = useState<Order[]>(ordersData);
    const [searchTerm, setSearchTerm] = useState("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        to: new Date(),
    });
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const t = translations[language as keyof typeof translations];

    const columns: ColumnDef<Order>[] = [
        {
            accessorKey: "orderNumber",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        {t.orderNumber}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
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
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount);
                return (
                    <div className="text-right font-medium">{formatted}</div>
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
                        {t[status as keyof typeof t]}
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
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">{t.viewDetails}</span>
                                <Eye className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{t.orderDetails}</DialogTitle>
                                <DialogDescription>
                                    {t.orderNumber}: {order.orderNumber}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">
                                        {t.customer}
                                    </Label>
                                    <div className="col-span-3">
                                        {order.customer}
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">
                                        {t.date}
                                    </Label>
                                    <div className="col-span-3">
                                        {order.date}
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">
                                        {t.total}
                                    </Label>
                                    <div className="col-span-3">
                                        ${order.total.toFixed(2)}
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">
                                        {t.status}
                                    </Label>
                                    <div className="col-span-3">
                                        <Badge
                                            variant={
                                                order.status === "completed"
                                                    ? "success"
                                                    : order.status ===
                                                        "processing"
                                                      ? "warning"
                                                      : "destructive"
                                            }
                                        >
                                            {t[order.status as keyof typeof t]}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">
                                        {t.items}
                                    </Label>
                                    <div className="col-span-3">
                                        <ul>
                                            {order.items.map((item, index) => (
                                                <li key={index}>
                                                    {item.name} - {t.quantity}:{" "}
                                                    {item.quantity}, {t.price}:
                                                    ${item.price.toFixed(2)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">
                                        {t.shippingAddress}
                                    </Label>
                                    <div className="col-span-3">
                                        {order.shippingAddress}
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">
                                        {t.paymentMethod}
                                    </Label>
                                    <div className="col-span-3">
                                        {order.paymentMethod}
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">
                                        {t.updateStatus}
                                    </Label>
                                    <Select
                                        onValueChange={(value) => {
                                            setOrders(
                                                orders.map((o) =>
                                                    o.id === order.id
                                                        ? {
                                                              ...o,
                                                              status: value as
                                                                  | "completed"
                                                                  | "processing"
                                                                  | "cancelled",
                                                          }
                                                        : o,
                                                ),
                                            );
                                            toast({
                                                title: t.statusUpdated,
                                                description: `${order.orderNumber} - ${t[value as keyof typeof t]}`,
                                            });
                                        }}
                                        defaultValue={order.status}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="completed">
                                                {t.completed}
                                            </SelectItem>
                                            <SelectItem value="processing">
                                                {t.processing}
                                            </SelectItem>
                                            <SelectItem value="cancelled">
                                                {t.cancelled}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
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
        //setTimeRange("monthly") //This line is commented out because 'setTimeRange' is not defined in the original code.  Adding it would require further changes.
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {t.title}
                    </h1>
                    <p className="text-muted-foreground">{t.subtitle}</p>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Download className="mr-2 h-4 w-4" />
                    {t.export}
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>{t.title}</CardTitle>
                    <CardDescription>{t.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
                        <div className="relative w-full md:w-1/3">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={t.search}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <div className="w-full md:w-2/3 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                            <DatePickerWithRange
                                date={dateRange}
                                setDate={setDateRange}
                            />
                            <Button onClick={resetFilters} variant="outline">
                                {t.reset}
                            </Button>
                        </div>
                    </div>
                    <DataTable columns={columns} data={filteredOrders} />
                </CardContent>
            </Card>
        </div>
    );
}
