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
import { Skeleton } from "@/components/ui/skeleton";

const translations = {
    en: {
        title: "Vendor Management",
        subtitle: "Streamline your supply chain efficiently",
        search: "Search vendors",
        name: "Name",
        contact: "Contact",
        phone: "Phone",
        actions: "Actions",
        addProvider: "Add Vendor",
        editProvider: "Edit Vendor",
        deleteProvider: "Delete Vendor",
        confirmDelete: "Are you sure you want to delete this vendor?",
        cancel: "Cancel",
        save: "Save",
        delete: "Delete",
        nameLabel: "Vendor Name",
        contactLabel: "Contact Person",
        phonePlaceholder: "Enter phone number",
        successAdd: "Vendor added successfully",
        successEdit: "Vendor updated successfully",
        successDelete: "Vendor deleted successfully",
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

type Provider = {
    id: number;
    name: string;
    contact: string;
    phone: string;
};

const initialProviders: Provider[] = [
    { id: 1, name: "Acme Inc.", contact: "John Smith", phone: "123-456-7890" },
    { id: 2, name: "XYZ Corp.", contact: "Jane Doe", phone: "098-765-4321" },
    {
        id: 3,
        name: "Global Supplies",
        contact: "Bob Johnson",
        phone: "111-222-3333",
    },
    {
        id: 4,
        name: "Tech Solutions",
        contact: "Alice Brown",
        phone: "444-555-6666",
    },
    {
        id: 5,
        name: "Quality Goods",
        contact: "Charlie Davis",
        phone: "777-888-9999",
    },
];

export default function Providers() {
    const { language } = useLanguage();
    const [providers, setProviders] = useState<Provider[]>(initialProviders);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentProvider, setCurrentProvider] = useState<Provider | null>(
        null,
    );

    const t = translations[language as keyof typeof translations];

    const columns: ColumnDef<Provider>[] = [
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
            accessorKey: "contact",
            header: t.contact,
        },
        {
            accessorKey: "phone",
            header: t.phone,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const provider = row.original;
                return (
                    <div className="flex space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(provider)}
                        >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">{t.editProvider}</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(provider)}
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">{t.deleteProvider}</span>
                        </Button>
                    </div>
                );
            },
        },
    ];

    const filteredProviders = providers.filter(
        (provider) =>
            provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            provider.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
            provider.phone.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleAdd = async (newProvider: Omit<Provider, "id">) => {
        setIsLoading(true);
        try {
            // Simulating API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const id = Math.max(...providers.map((p) => p.id)) + 1;
            setProviders([...providers, { ...newProvider, id }]);
            setIsAddDialogOpen(false);
            toast({
                title: t.successAdd,
                description: `${newProvider.name} has been added to the vendor list.`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add vendor. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (provider: Provider) => {
        setCurrentProvider(provider);
        setIsEditDialogOpen(true);
    };

    const handleUpdate = async (updatedProvider: Provider) => {
        setIsLoading(true);
        try {
            // Simulating API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setProviders(
                providers.map((p) =>
                    p.id === updatedProvider.id ? updatedProvider : p,
                ),
            );
            setIsEditDialogOpen(false);
            setCurrentProvider(null);
            toast({
                title: t.successEdit,
                description: `${updatedProvider.name}'s information has been updated.`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update vendor. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (provider: Provider) => {
        setCurrentProvider(provider);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (currentProvider) {
            setIsLoading(true);
            try {
                // Simulating API call
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setProviders(
                    providers.filter((p) => p.id !== currentProvider.id),
                );
                setIsDeleteDialogOpen(false);
                setCurrentProvider(null);
                toast({
                    title: t.successDelete,
                    description: `${currentProvider.name} has been removed from the vendor list.`,
                });
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to delete vendor. Please try again.",
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
                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Plus className="mr-2 h-4 w-4" /> {t.addProvider}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t.addProvider}</DialogTitle>
                            <DialogDescription>{t.subtitle}</DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                handleAdd({
                                    name: formData.get("name") as string,
                                    contact: formData.get("contact") as string,
                                    phone: formData.get("phone") as string,
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
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="contact"
                                        className="text-right"
                                    >
                                        {t.contactLabel}
                                    </Label>
                                    <Input
                                        id="contact"
                                        name="contact"
                                        className="col-span-3"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="phone"
                                        className="text-right"
                                    >
                                        {t.phone}
                                    </Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        className="col-span-3"
                                        placeholder={t.phonePlaceholder}
                                        required
                                        disabled={isLoading}
                                    />
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
                </div>
            </section>

            <section className="bg-background rounded-lg shadow">
                <Card className="border-0">
                    <CardContent className="p-6">
                        {isLoading ? (
                            <ProviderTableSkeleton />
                        ) : (
                            <DataTable
                                columns={columns}
                                data={filteredProviders}
                            />
                        )}
                    </CardContent>
                </Card>
            </section>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t.editProvider}</DialogTitle>
                        <DialogDescription>{t.subtitle}</DialogDescription>
                    </DialogHeader>
                    {currentProvider && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                handleUpdate({
                                    id: currentProvider.id,
                                    name: formData.get("name") as string,
                                    contact: formData.get("contact") as string,
                                    phone: formData.get("phone") as string,
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
                                        defaultValue={currentProvider.name}
                                        className="col-span-3"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="edit-contact"
                                        className="text-right"
                                    >
                                        {t.contactLabel}
                                    </Label>
                                    <Input
                                        id="edit-contact"
                                        name="contact"
                                        defaultValue={currentProvider.contact}
                                        className="col-span-3"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="edit-phone"
                                        className="text-right"
                                    >
                                        {t.phone}
                                    </Label>
                                    <Input
                                        id="edit-phone"
                                        name="phone"
                                        defaultValue={currentProvider.phone}
                                        className="col-span-3"
                                        placeholder={t.phonePlaceholder}
                                        required
                                        disabled={isLoading}
                                    />
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

            {/* Delete Dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t.deleteProvider}</DialogTitle>
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
                            {isLoading ? "Deleting..." : t.delete}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function ProviderTableSkeleton() {
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
