"use client";

import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Search, Plus, Pencil, Trash2, ArrowUpDown } from "lucide-react";
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
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const translations = {
    en: {
        title: "Inventory Management",
        subtitle: "Track and manage your product inventory efficiently",
        search: "Search items",
        name: "Name",
        sku: "SKU",
        quantity: "Quantity",
        price: "Price",
        status: "Status",
        actions: "Actions",
        addProduct: "Add Item",
        editProduct: "Edit Item",
        deleteProduct: "Remove Item",
        save: "Save",
        cancel: "Cancel",
        confirmDelete: "Are you sure you want to remove this item?",
        delete: "Remove",
        nameLabel: "Item Name",
        skuLabel: "SKU",
        quantityLabel: "Quantity",
        priceLabel: "Price",
        statusLabel: "Status",
        namePlaceholder: "Enter item name",
        skuPlaceholder: "Enter SKU",
        quantityPlaceholder: "Enter quantity",
        pricePlaceholder: "Enter price",
        successAdd: "Item added successfully",
        successEdit: "Item updated successfully",
        successDelete: "Item removed successfully",
        inStock: "In Stock",
        lowStock: "Low Stock",
        outOfStock: "Out of Stock",
    },
    es: {
        title: "Gestión de Inventario",
        subtitle:
            "Rastrea y administra tu inventario de productos eficientemente",
        search: "Buscar artículos",
        name: "Nombre",
        sku: "SKU",
        quantity: "Cantidad",
        price: "Precio",
        status: "Estado",
        actions: "Acciones",
        addProduct: "Añadir Artículo",
        editProduct: "Editar Artículo",
        deleteProduct: "Eliminar Artículo",
        save: "Guardar",
        cancel: "Cancelar",
        confirmDelete: "¿Estás seguro de que quieres eliminar este artículo?",
        delete: "Eliminar",
        nameLabel: "Nombre del Artículo",
        skuLabel: "SKU",
        quantityLabel: "Cantidad",
        priceLabel: "Precio",
        statusLabel: "Estado",
        namePlaceholder: "Ingrese nombre del artículo",
        skuPlaceholder: "Ingrese SKU",
        quantityPlaceholder: "Ingrese cantidad",
        pricePlaceholder: "Ingrese precio",
        successAdd: "Artículo añadido exitosamente",
        successEdit: "Artículo actualizado exitosamente",
        successDelete: "Artículo eliminado exitosamente",
        inStock: "En Stock",
        lowStock: "Stock Bajo",
        outOfStock: "Agotado",
    },
    fr: {
        title: "Gestion des Stocks",
        subtitle: "Suivez et gérez efficacement votre inventaire de produits",
        search: "Rechercher des articles",
        name: "Nom",
        sku: "UGS",
        quantity: "Quantité",
        price: "Prix",
        status: "Statut",
        actions: "Actions",
        addProduct: "Ajouter un Article",
        editProduct: "Modifier l'Article",
        deleteProduct: "Supprimer l'Article",
        save: "Enregistrer",
        cancel: "Annuler",
        confirmDelete: "Êtes-vous sûr de vouloir supprimer cet article ?",
        delete: "Supprimer",
        nameLabel: "Nom de l'Article",
        skuLabel: "UGS",
        quantityLabel: "Quantité",
        priceLabel: "Prix",
        statusLabel: "Statut",
        namePlaceholder: "Entrez le nom de l'article",
        skuPlaceholder: "Entrez l'UGS",
        quantityPlaceholder: "Entrez la quantité",
        pricePlaceholder: "Entrez le prix",
        successAdd: "Article ajouté avec succès",
        successEdit: "Article mis à jour avec succès",
        successDelete: "Article supprimé avec succès",
        inStock: "En Stock",
        lowStock: "Stock Faible",
        outOfStock: "Rupture de Stock",
    },
    it: {
        title: "Gestione Inventario",
        subtitle:
            "Traccia e gestisci efficacemente l'inventario dei tuoi prodotti",
        search: "Cerca articoli",
        name: "Nome",
        sku: "SKU",
        quantity: "Quantità",
        price: "Prezzo",
        status: "Stato",
        actions: "Azioni",
        addProduct: "Aggiungi Articolo",
        editProduct: "Modifica Articolo",
        deleteProduct: "Rimuovi Articolo",
        save: "Salva",
        cancel: "Annulla",
        confirmDelete: "Sei sicuro di voler rimuovere questo articolo?",
        delete: "Rimuovi",
        nameLabel: "Nome Articolo",
        skuLabel: "SKU",
        quantityLabel: "Quantità",
        priceLabel: "Prezzo",
        statusLabel: "Stato",
        namePlaceholder: "Inserisci nome articolo",
        skuPlaceholder: "Inserisci SKU",
        quantityPlaceholder: "Inserisci quantità",
        pricePlaceholder: "Inserisci prezzo",
        successAdd: "Articolo aggiunto con successo",
        successEdit: "Articolo aggiornato con successo",
        successDelete: "Articolo rimosso con successo",
        inStock: "Disponibile",
        lowStock: "Scorta Bassa",
        outOfStock: "Esaurito",
    },
    de: {
        title: "Bestandsverwaltung",
        subtitle: "Verfolgen und verwalten Sie Ihren Produktbestand effizient",
        search: "Artikel suchen",
        name: "Name",
        sku: "Artikelnummer",
        quantity: "Menge",
        price: "Preis",
        status: "Status",
        actions: "Aktionen",
        addProduct: "Artikel hinzufügen",
        editProduct: "Artikel bearbeiten",
        deleteProduct: "Artikel entfernen",
        save: "Speichern",
        cancel: "Abbrechen",
        confirmDelete:
            "Sind Sie sicher, dass Sie diesen Artikel entfernen möchten?",
        delete: "Entfernen",
        nameLabel: "Artikelname",
        skuLabel: "Artikelnummer",
        quantityLabel: "Menge",
        priceLabel: "Preis",
        statusLabel: "Status",
        namePlaceholder: "Artikelname eingeben",
        skuPlaceholder: "Artikelnummer eingeben",
        quantityPlaceholder: "Menge eingeben",
        pricePlaceholder: "Preis eingeben",
        successAdd: "Artikel erfolgreich hinzugefügt",
        successEdit: "Artikel erfolgreich aktualisiert",
        successDelete: "Artikel erfolgreich entfernt",
        inStock: "Auf Lager",
        lowStock: "Geringer Bestand",
        outOfStock: "Nicht verfügbar",
    },
    pt: {
        title: "Gestão de Estoque",
        subtitle:
            "Acompanhe e gerencie seu estoque de produtos de forma eficiente",
        search: "Buscar itens",
        name: "Nome",
        sku: "SKU",
        quantity: "Quantidade",
        price: "Preço",
        status: "Status",
        actions: "Ações",
        addProduct: "Adicionar Item",
        editProduct: "Editar Item",
        deleteProduct: "Remover Item",
        save: "Salvar",
        cancel: "Cancelar",
        confirmDelete: "Tem certeza que deseja remover este item?",
        delete: "Remover",
        nameLabel: "Nome do Item",
        skuLabel: "SKU",
        quantityLabel: "Quantidade",
        priceLabel: "Preço",
        statusLabel: "Status",
        namePlaceholder: "Digite o nome do item",
        skuPlaceholder: "Digite o SKU",
        quantityPlaceholder: "Digite a quantidade",
        pricePlaceholder: "Digite o preço",
        successAdd: "Item adicionado com sucesso",
        successEdit: "Item atualizado com sucesso",
        successDelete: "Item removido com sucesso",
        inStock: "Em Estoque",
        lowStock: "Estoque Baixo",
        outOfStock: "Fora de Estoque",
    },
};

type Product = {
    id: number;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    status: "inStock" | "lowStock" | "outOfStock";
};

const initialInventory: Product[] = [
    {
        id: 1,
        name: "Laptop",
        sku: "LPT001",
        quantity: 50,
        price: 999.99,
        status: "inStock",
    },
    {
        id: 2,
        name: "Smartphone",
        sku: "SPH001",
        quantity: 100,
        price: 499.99,
        status: "inStock",
    },
    {
        id: 3,
        name: "Headphones",
        sku: "HPH001",
        quantity: 5,
        price: 99.99,
        status: "lowStock",
    },
    {
        id: 4,
        name: "Mouse",
        sku: "MOU001",
        quantity: 0,
        price: 29.99,
        status: "outOfStock",
    },
    {
        id: 5,
        name: "Keyboard",
        sku: "KBD001",
        quantity: 30,
        price: 59.99,
        status: "inStock",
    },
];

export default function Inventory() {
    const { language } = useLanguage();
    const [inventory, setInventory] = useState<Product[]>(initialInventory);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

    const t = translations[language as keyof typeof translations];

    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        {t.name}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "sku",
            header: t.sku,
        },
        {
            accessorKey: "quantity",
            header: t.quantity,
        },
        {
            accessorKey: "price",
            header: t.price,
            cell: ({ row }) => {
                const price = Number.parseFloat(row.getValue("price"));
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(price);
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
                            status === "inStock"
                                ? "success"
                                : status === "lowStock"
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
                const product = row.original;
                return (
                    <div className="flex space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(product)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const filteredInventory = inventory.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleAdd = (newProduct: Omit<Product, "id">) => {
        const id = Math.max(...inventory.map((p) => p.id)) + 1;
        setInventory([...inventory, { ...newProduct, id }]);
        setIsAddDialogOpen(false);
        toast({
            title: t.successAdd,
            description: `${newProduct.name} has been added to the inventory.`,
        });
    };

    const handleEdit = (product: Product) => {
        setCurrentProduct(product);
        setIsEditDialogOpen(true);
    };

    const handleUpdate = (updatedProduct: Product) => {
        setInventory(
            inventory.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p,
            ),
        );
        setIsEditDialogOpen(false);
        setCurrentProduct(null);
        toast({
            title: t.successEdit,
            description: `${updatedProduct.name} has been updated.`,
        });
    };

    const handleDelete = (product: Product) => {
        setCurrentProduct(product);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (currentProduct) {
            setInventory(inventory.filter((p) => p.id !== currentProduct.id));
            setIsDeleteDialogOpen(false);
            setCurrentProduct(null);
            toast({
                title: t.successDelete,
                description: `${currentProduct.name} has been removed from the inventory.`,
            });
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            {t.title}
                        </h2>
                        <p className="text-muted-foreground">{t.subtitle}</p>
                    </div>
                    <Dialog
                        open={isAddDialogOpen}
                        onOpenChange={setIsAddDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                <Plus className="mr-2 h-4 w-4" /> {t.addProduct}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{t.addProduct}</DialogTitle>
                                <DialogDescription>
                                    {t.subtitle}
                                </DialogDescription>
                            </DialogHeader>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(
                                        e.currentTarget,
                                    );
                                    handleAdd({
                                        name: formData.get("name") as string,
                                        sku: formData.get("sku") as string,
                                        quantity: Number.parseInt(
                                            formData.get("quantity") as string,
                                        ),
                                        price: Number.parseFloat(
                                            formData.get("price") as string,
                                        ),
                                        status: formData.get("status") as
                                            | "inStock"
                                            | "lowStock"
                                            | "outOfStock",
                                    });
                                }}
                            >
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="name"
                                            className="text-right"
                                        >
                                            {t.nameLabel}
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            className="col-span-3"
                                            placeholder={t.namePlaceholder}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="sku"
                                            className="text-right"
                                        >
                                            {t.skuLabel}
                                        </Label>
                                        <Input
                                            id="sku"
                                            name="sku"
                                            className="col-span-3"
                                            placeholder={t.skuPlaceholder}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="quantity"
                                            className="text-right"
                                        >
                                            {t.quantityLabel}
                                        </Label>
                                        <Input
                                            id="quantity"
                                            name="quantity"
                                            type="number"
                                            className="col-span-3"
                                            placeholder={t.quantityPlaceholder}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="price"
                                            className="text-right"
                                        >
                                            {t.priceLabel}
                                        </Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            className="col-span-3"
                                            placeholder={t.pricePlaceholder}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="status"
                                            className="text-right"
                                        >
                                            {t.statusLabel}
                                        </Label>
                                        <Select
                                            name="status"
                                            defaultValue="inStock"
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="inStock">
                                                    {t.inStock}
                                                </SelectItem>
                                                <SelectItem value="lowStock">
                                                    {t.lowStock}
                                                </SelectItem>
                                                <SelectItem value="outOfStock">
                                                    {t.outOfStock}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">{t.save}</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t.search}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>{t.title}</CardTitle>
                        <CardDescription>{t.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={filteredInventory} />
                    </CardContent>
                </Card>
                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                >
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{t.editProduct}</DialogTitle>
                            <DialogDescription>{t.subtitle}</DialogDescription>
                        </DialogHeader>
                        {currentProduct && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(
                                        e.currentTarget,
                                    );
                                    handleUpdate({
                                        id: currentProduct.id,
                                        name: formData.get("name") as string,
                                        sku: formData.get("sku") as string,
                                        quantity: Number.parseInt(
                                            formData.get("quantity") as string,
                                        ),
                                        price: Number.parseFloat(
                                            formData.get("price") as string,
                                        ),
                                        status: formData.get("status") as
                                            | "inStock"
                                            | "lowStock"
                                            | "outOfStock",
                                    });
                                }}
                            >
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="edit-name"
                                            className="text-right"
                                        >
                                            {t.nameLabel}
                                        </Label>
                                        <Input
                                            id="edit-name"
                                            name="name"
                                            defaultValue={currentProduct.name}
                                            className="col-span-3"
                                            placeholder={t.namePlaceholder}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="edit-sku"
                                            className="text-right"
                                        >
                                            {t.skuLabel}
                                        </Label>
                                        <Input
                                            id="edit-sku"
                                            name="sku"
                                            defaultValue={currentProduct.sku}
                                            className="col-span-3"
                                            placeholder={t.skuPlaceholder}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="edit-quantity"
                                            className="text-right"
                                        >
                                            {t.quantityLabel}
                                        </Label>
                                        <Input
                                            id="edit-quantity"
                                            name="quantity"
                                            type="number"
                                            defaultValue={
                                                currentProduct.quantity
                                            }
                                            className="col-span-3"
                                            placeholder={t.quantityPlaceholder}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="edit-price"
                                            className="text-right"
                                        >
                                            {t.priceLabel}
                                        </Label>
                                        <Input
                                            id="edit-price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            defaultValue={currentProduct.price}
                                            className="col-span-3"
                                            placeholder={t.pricePlaceholder}
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
                                            defaultValue={currentProduct.status}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="inStock">
                                                    {t.inStock}
                                                </SelectItem>
                                                <SelectItem value="lowStock">
                                                    {t.lowStock}
                                                </SelectItem>
                                                <SelectItem value="outOfStock">
                                                    {t.outOfStock}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">{t.save}</Button>
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
                            <DialogTitle>{t.deleteProduct}</DialogTitle>
                            <DialogDescription>
                                {t.confirmDelete}
                            </DialogDescription>
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
                            >
                                {t.delete}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
