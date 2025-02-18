"use client";

import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    ArrowUpDown,
    Download,
} from "lucide-react";
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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { DateRange } from "react-day-picker";

const translations = {
    en: {
        title: "Procurement Management",
        subtitle: "Manage your supply chain efficiently",
        search: "Search orders",
        orderNumber: "Order ID",
        supplier: "Supplier",
        date: "Date",
        total: "Total",
        status: "Status",
        actions: "Actions",
        addProcurement: "New Order",
        editProcurement: "Edit Order",
        deleteProcurement: "Delete Order",
        save: "Save",
        cancel: "Cancel",
        confirmDelete: "Are you sure you want to delete this order?",
        delete: "Delete",
        filterByDate: "Date Filter",
        reset: "Reset",
        received: "Received",
        pending: "Pending",
        orderNumberLabel: "Order Number",
        supplierLabel: "Supplier",
        dateLabel: "Date",
        totalLabel: "Total",
        statusLabel: "Status",
        successAdd: "Order added successfully",
        successEdit: "Order updated successfully",
        successDelete: "Order deleted successfully",
        export: "Export",
    },
    es: {
        title: "Gestión de Compras",
        subtitle: "Administra tu cadena de suministro eficientemente",
        search: "Buscar pedidos",
        orderNumber: "ID Pedido",
        supplier: "Proveedor",
        date: "Fecha",
        total: "Total",
        status: "Estado",
        actions: "Acciones",
        addProcurement: "Nuevo Pedido",
        editProcurement: "Editar Pedido",
        deleteProcurement: "Eliminar Pedido",
        save: "Guardar",
        cancel: "Cancelar",
        confirmDelete: "¿Estás seguro de que quieres eliminar este pedido?",
        delete: "Eliminar",
        filterByDate: "Filtrar por Fecha",
        reset: "Reiniciar",
        received: "Recibido",
        pending: "Pendiente",
        orderNumberLabel: "Número de Pedido",
        supplierLabel: "Proveedor",
        dateLabel: "Fecha",
        totalLabel: "Total",
        statusLabel: "Estado",
        successAdd: "Pedido añadido exitosamente",
        successEdit: "Pedido actualizado exitosamente",
        successDelete: "Pedido eliminado exitosamente",
        export: "Exportar",
    },
    fr: {
        title: "Gestion des Achats",
        subtitle: "Gérez efficacement votre chaîne d'approvisionnement",
        search: "Rechercher des commandes",
        orderNumber: "ID Commande",
        supplier: "Fournisseur",
        date: "Date",
        total: "Total",
        status: "Statut",
        actions: "Actions",
        addProcurement: "Nouvelle Commande",
        editProcurement: "Modifier la Commande",
        deleteProcurement: "Supprimer la Commande",
        save: "Enregistrer",
        cancel: "Annuler",
        confirmDelete: "Êtes-vous sûr de vouloir supprimer cette commande ?",
        delete: "Supprimer",
        filterByDate: "Filtrer par Date",
        reset: "Réinitialiser",
        received: "Reçu",
        pending: "En attente",
        orderNumberLabel: "Numéro de Commande",
        supplierLabel: "Fournisseur",
        dateLabel: "Date",
        totalLabel: "Total",
        statusLabel: "Statut",
        successAdd: "Commande ajoutée avec succès",
        successEdit: "Commande mise à jour avec succès",
        successDelete: "Commande supprimée avec succès",
        export: "Exporter",
    },
    it: {
        title: "Gestione Acquisti",
        subtitle:
            "Gestisci efficientemente la tua catena di approvvigionamento",
        search: "Cerca ordini",
        orderNumber: "ID Ordine",
        supplier: "Fornitore",
        date: "Data",
        total: "Totale",
        status: "Stato",
        actions: "Azioni",
        addProcurement: "Nuovo Ordine",
        editProcurement: "Modifica Ordine",
        deleteProcurement: "Elimina Ordine",
        save: "Salva",
        cancel: "Annulla",
        confirmDelete: "Sei sicuro di voler eliminare questo ordine?",
        delete: "Elimina",
        filterByDate: "Filtra per Data",
        reset: "Reimposta",
        received: "Ricevuto",
        pending: "In attesa",
        orderNumberLabel: "Numero Ordine",
        supplierLabel: "Fornitore",
        dateLabel: "Data",
        totalLabel: "Totale",
        statusLabel: "Stato",
        successAdd: "Ordine aggiunto con successo",
        successEdit: "Ordine aggiornato con successo",
        successDelete: "Ordine eliminato con successo",
        export: "Esporta",
    },
    de: {
        title: "Beschaffungsmanagement",
        subtitle: "Verwalten Sie Ihre Lieferkette effizient",
        search: "Bestellungen suchen",
        orderNumber: "Bestellnummer",
        supplier: "Lieferant",
        date: "Datum",
        total: "Gesamt",
        status: "Status",
        actions: "Aktionen",
        addProcurement: "Neue Bestellung",
        editProcurement: "Bestellung bearbeiten",
        deleteProcurement: "Bestellung löschen",
        save: "Speichern",
        cancel: "Abbrechen",
        confirmDelete:
            "Sind Sie sicher, dass Sie diese Bestellung löschen möchten?",
        delete: "Löschen",
        filterByDate: "Nach Datum filtern",
        reset: "Zurücksetzen",
        received: "Erhalten",
        pending: "Ausstehend",
        orderNumberLabel: "Bestellnummer",
        supplierLabel: "Lieferant",
        dateLabel: "Datum",
        totalLabel: "Gesamt",
        statusLabel: "Status",
        successAdd: "Bestellung erfolgreich hinzugefügt",
        successEdit: "Bestellung erfolgreich aktualisiert",
        successDelete: "Bestellung erfolgreich gelöscht",
        export: "Exportieren",
    },
    pt: {
        title: "Gestão de Compras",
        subtitle: "Gerencie sua cadeia de suprimentos de forma eficiente",
        search: "Buscar pedidos",
        orderNumber: "ID do Pedido",
        supplier: "Fornecedor",
        date: "Data",
        total: "Total",
        status: "Status",
        actions: "Ações",
        addProcurement: "Novo Pedido",
        editProcurement: "Editar Pedido",
        deleteProcurement: "Excluir Pedido",
        save: "Salvar",
        cancel: "Cancelar",
        confirmDelete: "Tem certeza que deseja excluir este pedido?",
        delete: "Excluir",
        filterByDate: "Filtrar por Data",
        reset: "Redefinir",
        received: "Recebido",
        pending: "Pendente",
        orderNumberLabel: "Número do Pedido",
        supplierLabel: "Fornecedor",
        dateLabel: "Data",
        totalLabel: "Total",
        statusLabel: "Status",
        successAdd: "Pedido adicionado com sucesso",
        successEdit: "Pedido atualizado com sucesso",
        successDelete: "Pedido excluído com sucesso",
        export: "Exportar",
    },
};

type Procurement = {
    id: number;
    orderNumber: string;
    supplier: string;
    date: string;
    total: number;
    status: "Received" | "Pending";
};

const initialProcurements: Procurement[] = [
    {
        id: 1,
        orderNumber: "PO-001",
        supplier: "Supplier A",
        date: "2023-06-01",
        total: 1500.0,
        status: "Received",
    },
    {
        id: 2,
        orderNumber: "PO-002",
        supplier: "Supplier B",
        date: "2023-06-02",
        total: 2750.5,
        status: "Pending",
    },
    {
        id: 3,
        orderNumber: "PO-003",
        supplier: "Supplier C",
        date: "2023-06-03",
        total: 1000.0,
        status: "Received",
    },
    {
        id: 4,
        orderNumber: "PO-004",
        supplier: "Supplier D",
        date: "2023-06-04",
        total: 3200.75,
        status: "Pending",
    },
    {
        id: 5,
        orderNumber: "PO-005",
        supplier: "Supplier E",
        date: "2023-06-05",
        total: 1800.25,
        status: "Received",
    },
];

export default function Procurements() {
    const { language } = useLanguage();
    const [procurements, setProcurements] =
        useState<Procurement[]>(initialProcurements);
    const [searchTerm, setSearchTerm] = useState("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        to: new Date(),
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentProcurement, setCurrentProcurement] =
        useState<Procurement | null>(null);

    const t = translations[language as keyof typeof translations];

    const columns: ColumnDef<Procurement>[] = [
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
            accessorKey: "supplier",
            header: t.supplier,
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
                        variant={status === "Received" ? "success" : "warning"}
                    >
                        {status === "Received" ? t.received : t.pending}
                    </Badge>
                );
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const procurement = row.original;
                return (
                    <div className="flex space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(procurement)}
                        >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">{t.editProcurement}</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(procurement)}
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">
                                {t.deleteProcurement}
                            </span>
                        </Button>
                    </div>
                );
            },
        },
    ];

    const filteredProcurements = procurements.filter(
        (procurement) =>
            (procurement.orderNumber
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
                procurement.supplier
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) &&
            (!dateRange?.from ||
                new Date(procurement.date) >= dateRange?.from) &&
            (!dateRange?.to || new Date(procurement.date) <= dateRange?.to),
    );

    const handleAdd = (newProcurement: Omit<Procurement, "id">) => {
        setIsLoading(true);
        // Simulating API call
        setTimeout(() => {
            const id = Math.max(...procurements.map((p) => p.id)) + 1;
            setProcurements([...procurements, { ...newProcurement, id }]);
            setIsAddDialogOpen(false);
            setIsLoading(false);
            toast({
                title: t.successAdd,
                description: `${newProcurement.orderNumber} has been added to the procurement list.`,
            });
        }, 1000);
    };

    const handleEdit = (procurement: Procurement) => {
        setCurrentProcurement(procurement);
        setIsEditDialogOpen(true);
    };

    const handleUpdate = (updatedProcurement: Procurement) => {
        setIsLoading(true);
        // Simulating API call
        setTimeout(() => {
            setProcurements(
                procurements.map((p) =>
                    p.id === updatedProcurement.id ? updatedProcurement : p,
                ),
            );
            setIsEditDialogOpen(false);
            setCurrentProcurement(null);
            setIsLoading(false);
            toast({
                title: t.successEdit,
                description: `${updatedProcurement.orderNumber} has been updated.`,
            });
        }, 1000);
    };

    const handleDelete = (procurement: Procurement) => {
        setCurrentProcurement(procurement);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (currentProcurement) {
            setIsLoading(true);
            // Simulating API call
            setTimeout(() => {
                setProcurements(
                    procurements.filter((p) => p.id !== currentProcurement.id),
                );
                setIsDeleteDialogOpen(false);
                setCurrentProcurement(null);
                setIsLoading(false);
                toast({
                    title: t.successDelete,
                    description: `${currentProcurement.orderNumber} has been removed from the procurement list.`,
                });
            }, 1000);
        }
    };

    const resetFilters = () => {
        setDateRange({
            from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            to: new Date(),
        });
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
                    {isLoading ? (
                        <ProcurementTableSkeleton />
                    ) : (
                        <DataTable
                            columns={columns}
                            data={filteredProcurements}
                        />
                    )}
                </CardContent>
            </Card>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" /> {t.addProcurement}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t.addProcurement}</DialogTitle>
                        <DialogDescription>{t.subtitle}</DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            handleAdd({
                                orderNumber: formData.get(
                                    "orderNumber",
                                ) as string,
                                supplier: formData.get("supplier") as string,
                                date: formData.get("date") as string,
                                total: Number.parseFloat(
                                    formData.get("total") as string,
                                ),
                                status: formData.get("status") as
                                    | "Received"
                                    | "Pending",
                            });
                        }}
                    >
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="orderNumber"
                                    className="text-right"
                                >
                                    {t.orderNumberLabel}
                                </Label>
                                <Input
                                    id="orderNumber"
                                    name="orderNumber"
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="supplier"
                                    className="text-right"
                                >
                                    {t.supplierLabel}
                                </Label>
                                <Input
                                    id="supplier"
                                    name="supplier"
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="date" className="text-right">
                                    {t.dateLabel}
                                </Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="total" className="text-right">
                                    {t.totalLabel}
                                </Label>
                                <Input
                                    id="total"
                                    name="total"
                                    type="number"
                                    step="0.01"
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">
                                    {t.statusLabel}
                                </Label>
                                <Select name="status" defaultValue="Pending">
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Received">
                                            {t.received}
                                        </SelectItem>
                                        <SelectItem value="Pending">
                                            {t.pending}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Saving..." : t.save}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t.editProcurement}</DialogTitle>
                        <DialogDescription>{t.subtitle}</DialogDescription>
                    </DialogHeader>
                    {currentProcurement && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                handleUpdate({
                                    id: currentProcurement.id,
                                    orderNumber: formData.get(
                                        "orderNumber",
                                    ) as string,
                                    supplier: formData.get(
                                        "supplier",
                                    ) as string,
                                    date: formData.get("date") as string,
                                    total: Number.parseFloat(
                                        formData.get("total") as string,
                                    ),
                                    status: formData.get("status") as
                                        | "Received"
                                        | "Pending",
                                });
                            }}
                        >
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="edit-orderNumber"
                                        className="text-right"
                                    >
                                        {t.orderNumberLabel}
                                    </Label>
                                    <Input
                                        id="edit-orderNumber"
                                        name="orderNumber"
                                        defaultValue={
                                            currentProcurement.orderNumber
                                        }
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="edit-supplier"
                                        className="text-right"
                                    >
                                        {t.supplierLabel}
                                    </Label>
                                    <Input
                                        id="edit-supplier"
                                        name="supplier"
                                        defaultValue={
                                            currentProcurement.supplier
                                        }
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="edit-date"
                                        className="text-right"
                                    >
                                        {t.dateLabel}
                                    </Label>
                                    <Input
                                        id="edit-date"
                                        name="date"
                                        type="date"
                                        defaultValue={currentProcurement.date}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="edit-total"
                                        className="text-right"
                                    >
                                        {t.totalLabel}
                                    </Label>
                                    <Input
                                        id="edit-total"
                                        name="total"
                                        type="number"
                                        step="0.01"
                                        defaultValue={currentProcurement.total}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="edit-status"
                                        className="text-right"
                                    >
                                        {t.statusLabel}
                                    </Label>
                                    <Select
                                        name="status"
                                        defaultValue={currentProcurement.status}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Received">
                                                {t.received}
                                            </SelectItem>
                                            <SelectItem value="Pending">
                                                {t.pending}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Saving..." : t.save}
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t.deleteProcurement}</DialogTitle>
                        <DialogDescription>{t.confirmDelete}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            {t.cancel}
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={isLoading}
                        >
                            {isLoading ? "Deleting..." : t.delete}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function ProcurementTableSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
        </div>
    );
}
