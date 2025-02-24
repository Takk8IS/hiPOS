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
import { useLocalStorage } from "@/hooks/use-local-storage";

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
        // Spanish translations kept as is
    },
    fr: {
        // French translations kept as is
    },
    it: {
        // Italian translations kept as is
    },
    de: {
        // German translations kept as is
    },
    pt: {
        // Portuguese translations kept as is
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
    const [inventory, setInventory] = useLocalStorage<Product[]>(
        "hipos_inventory",
        initialInventory,
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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
                            <span className="sr-only">{t.editProduct}</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product)}
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">{t.deleteProduct}</span>
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

    const handleAdd = async (newProduct: Omit<Product, "id">) => {
        setIsLoading(true);
        try {
            // Simulating API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const id = Math.max(...inventory.map((p) => p.id)) + 1;
            setInventory([...inventory, { ...newProduct, id }]);
            setIsAddDialogOpen(false);
            toast({
                title: t.successAdd,
                description: `${newProduct.name} has been added to the inventory.`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add product",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (product: Product) => {
        setCurrentProduct(product);
        setIsEditDialogOpen(true);
    };

    const handleUpdate = async (updatedProduct: Product) => {
        setIsLoading(true);
        try {
            // Simulating API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

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
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update product",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (product: Product) => {
        setCurrentProduct(product);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (currentProduct) {
            setIsLoading(true);
            try {
                // Simulating API call
                await new Promise((resolve) => setTimeout(resolve, 1000));

                setInventory(
                    inventory.filter((p) => p.id !== currentProduct.id),
                );
                setIsDeleteDialogOpen(false);
                setCurrentProduct(null);
                toast({
                    title: t.successDelete,
                    description: `${currentProduct.name} has been removed from the inventory.`,
                });
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to delete product",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
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
                            <ProductForm
                                onSubmit={handleAdd}
                                isLoading={isLoading}
                                t={t}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </section>

            <section className="bg-background rounded-lg shadow">
                <Card className="border-0">
                    <CardContent className="p-6">
                        <DataTable columns={columns} data={filteredInventory} />
                    </CardContent>
                </Card>
            </section>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t.editProduct}</DialogTitle>
                        <DialogDescription>{t.subtitle}</DialogDescription>
                    </DialogHeader>
                    {currentProduct && (
                        <ProductForm
                            onSubmit={(data) =>
                                handleUpdate({ ...data, id: currentProduct.id })
                            }
                            defaultValues={currentProduct}
                            isLoading={isLoading}
                            t={t}
                        />
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
                        <DialogDescription>{t.confirmDelete}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            disabled={isLoading}
                        >
                            {t.cancel}
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : t.delete}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

type ProductFormProps = {
    onSubmit: (data: Omit<Product, "id">) => void;
    defaultValues?: Product;
    isLoading?: boolean;
    t: any;
};

function ProductForm({
    onSubmit,
    defaultValues,
    isLoading,
    t,
}: ProductFormProps) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                onSubmit({
                    name: formData.get("name") as string,
                    sku: formData.get("sku") as string,
                    quantity: Number.parseInt(
                        formData.get("quantity") as string,
                    ),
                    price: Number.parseFloat(formData.get("price") as string),
                    status: formData.get("status") as
                        | "inStock"
                        | "lowStock"
                        | "outOfStock",
                });
            }}
        >
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        {t.nameLabel}
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        defaultValue={defaultValues?.name}
                        className="col-span-3"
                        placeholder={t.namePlaceholder}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sku" className="text-right">
                        {t.skuLabel}
                    </Label>
                    <Input
                        id="sku"
                        name="sku"
                        defaultValue={defaultValues?.sku}
                        className="col-span-3"
                        placeholder={t.skuPlaceholder}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                        {t.quantityLabel}
                    </Label>
                    <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        defaultValue={defaultValues?.quantity}
                        className="col-span-3"
                        placeholder={t.quantityPlaceholder}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                        {t.priceLabel}
                    </Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        defaultValue={defaultValues?.price}
                        className="col-span-3"
                        placeholder={t.pricePlaceholder}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                        {t.statusLabel}
                    </Label>
                    <Select
                        name="status"
                        defaultValue={defaultValues?.status || "inStock"}
                    >
                        <SelectTrigger className="col-span-3">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="inStock">{t.inStock}</SelectItem>
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
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : t.save}
                </Button>
            </DialogFooter>
        </form>
    );
}
