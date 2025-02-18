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
        title: "Customer Management",
        subtitle: "View and manage your customer base efficiently",
        search: "Search customers",
        name: "Name",
        email: "Email",
        phone: "Phone",
        actions: "Actions",
        addCustomer: "Add Customer",
        editCustomer: "Edit Customer",
        deleteCustomer: "Delete Customer",
        confirmDelete: "Are you sure you want to delete this customer?",
        cancel: "Cancel",
        save: "Save",
        delete: "Delete",
        nameLabel: "Full Name",
        emailLabel: "Email Address",
        phonePlaceholder: "Enter phone number",
        successAdd: "Customer added successfully",
        successEdit: "Customer updated successfully",
        successDelete: "Customer deleted successfully",
    },
    es: {
        title: "Gestión de Clientes",
        subtitle: "Visualiza y gestiona tu base de clientes eficientemente",
        search: "Buscar clientes",
        name: "Nombre",
        email: "Correo",
        phone: "Teléfono",
        actions: "Acciones",
        addCustomer: "Añadir Cliente",
        editCustomer: "Editar Cliente",
        deleteCustomer: "Eliminar Cliente",
        confirmDelete: "¿Estás seguro de que quieres eliminar este cliente?",
        cancel: "Cancelar",
        save: "Guardar",
        delete: "Eliminar",
        nameLabel: "Nombre Completo",
        emailLabel: "Correo Electrónico",
        phonePlaceholder: "Ingrese número de teléfono",
        successAdd: "Cliente añadido exitosamente",
        successEdit: "Cliente actualizado exitosamente",
        successDelete: "Cliente eliminado exitosamente",
    },
    fr: {
        title: "Espace Clients",
        subtitle: "Gérez efficacement vos relations clients",
        search: "Rechercher des clients",
        name: "Nom",
        email: "Email",
        phone: "Téléphone",
        actions: "Actions",
        addCustomer: "Ajouter",
        editCustomer: "Modifier",
        deleteCustomer: "Supprimer",
        confirmDelete: "Supprimer ce client ?",
        cancel: "Annuler",
        save: "Enregistrer",
        delete: "Supprimer",
        nameLabel: "Nom Complet",
        emailLabel: "Adresse Email",
        phonePlaceholder: "Entrez le numéro de téléphone",
        successAdd: "Client ajouté",
        successEdit: "Client mis à jour",
        successDelete: "Client supprimé",
    },
    it: {
        title: "Hub Clienti",
        subtitle: "Gestisci efficacemente le relazioni con i clienti",
        search: "Cerca clienti",
        name: "Nome",
        email: "Email",
        phone: "Telefono",
        actions: "Azioni",
        addCustomer: "Aggiungi",
        editCustomer: "Modifica",
        deleteCustomer: "Rimuovi",
        confirmDelete: "Rimuovere questo cliente?",
        cancel: "Annulla",
        save: "Salva",
        delete: "Elimina",
        nameLabel: "Nome Completo",
        emailLabel: "Indirizzo Email",
        phonePlaceholder: "Inserisci numero di telefono",
        successAdd: "Cliente aggiunto",
        successEdit: "Cliente aggiornato",
        successDelete: "Cliente rimosso",
    },
    de: {
        title: "Kundenzentrale",
        subtitle: "Verwalten Sie Ihre Kundenbeziehungen effektiv",
        search: "Kunden suchen",
        name: "Name",
        email: "E-Mail",
        phone: "Telefon",
        actions: "Aktionen",
        addCustomer: "Hinzufügen",
        editCustomer: "Bearbeiten",
        deleteCustomer: "Entfernen",
        confirmDelete: "Diesen Kunden entfernen?",
        cancel: "Abbrechen",
        save: "Speichern",
        delete: "Löschen",
        nameLabel: "Vollständiger Name",
        emailLabel: "E-Mail-Adresse",
        phonePlaceholder: "Telefonnummer eingeben",
        successAdd: "Kunde hinzugefügt",
        successEdit: "Kunde aktualisiert",
        successDelete: "Kunde entfernt",
    },
    pt: {
        title: "Central de Clientes",
        subtitle: "Gerencie seus relacionamentos com clientes de forma eficaz",
        search: "Buscar clientes",
        name: "Nome",
        email: "E-mail",
        phone: "Telefone",
        actions: "Ações",
        addCustomer: "Adicionar",
        editCustomer: "Editar",
        deleteCustomer: "Remover",
        confirmDelete: "Remover este cliente?",
        cancel: "Cancelar",
        save: "Salvar",
        delete: "Excluir",
        nameLabel: "Nome Completo",
        emailLabel: "Endereço de E-mail",
        phonePlaceholder: "Digite o número de telefone",
        successAdd: "Cliente adicionado",
        successEdit: "Cliente atualizado",
        successDelete: "Cliente removido",
    },
};

type Customer = {
    id: number;
    name: string;
    email: string;
    phone: string;
};

const initialCustomers: Customer[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "098-765-4321",
    },
    {
        id: 3,
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "111-222-3333",
    },
    {
        id: 4,
        name: "Bob Williams",
        email: "bob@example.com",
        phone: "444-555-6666",
    },
    {
        id: 5,
        name: "Charlie Brown",
        email: "charlie@example.com",
        phone: "777-888-9999",
    },
];

export default function Customers() {
    const { language } = useLanguage();
    const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(
        null,
    );

    const t = translations[language as keyof typeof translations];

    const columns: ColumnDef<Customer>[] = [
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
            accessorKey: "email",
            header: t.email,
        },
        {
            accessorKey: "phone",
            header: t.phone,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const customer = row.original;
                return (
                    <div className="flex space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(customer)}
                        >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">{t.editCustomer}</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(customer)}
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">{t.deleteCustomer}</span>
                        </Button>
                    </div>
                );
            },
        },
    ];

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleAdd = (newCustomer: Omit<Customer, "id">) => {
        setIsLoading(true);
        // Simulating API call
        setTimeout(() => {
            const id = Math.max(...customers.map((c) => c.id)) + 1;
            setCustomers([...customers, { ...newCustomer, id }]);
            setIsAddDialogOpen(false);
            setIsLoading(false);
            toast({
                title: t.successAdd,
                description: `${newCustomer.name} has been added to the customer list.`,
            });
        }, 1000);
    };

    const handleEdit = (customer: Customer) => {
        setCurrentCustomer(customer);
        setIsEditDialogOpen(true);
    };

    const handleUpdate = (updatedCustomer: Customer) => {
        setIsLoading(true);
        // Simulating API call
        setTimeout(() => {
            setCustomers(
                customers.map((c) =>
                    c.id === updatedCustomer.id ? updatedCustomer : c,
                ),
            );
            setIsEditDialogOpen(false);
            setCurrentCustomer(null);
            setIsLoading(false);
            toast({
                title: t.successEdit,
                description: `${updatedCustomer.name}'s information has been updated.`,
            });
        }, 1000);
    };

    const handleDelete = (customer: Customer) => {
        setCurrentCustomer(customer);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (currentCustomer) {
            setIsLoading(true);
            // Simulating API call
            setTimeout(() => {
                setCustomers(
                    customers.filter((c) => c.id !== currentCustomer.id),
                );
                setIsDeleteDialogOpen(false);
                setCurrentCustomer(null);
                setIsLoading(false);
                toast({
                    title: t.successDelete,
                    description: `${currentCustomer.name} has been removed from the customer list.`,
                });
            }, 1000);
        }
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
                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Plus className="mr-2 h-4 w-4" /> {t.addCustomer}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t.addCustomer}</DialogTitle>
                            <DialogDescription>{t.subtitle}</DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                handleAdd({
                                    name: formData.get("name") as string,
                                    email: formData.get("email") as string,
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
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="email"
                                        className="text-right"
                                    >
                                        {t.emailLabel}
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="col-span-3"
                                        required
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
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>{t.title}</CardTitle>
                    <CardDescription>{t.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
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
                    {isLoading ? (
                        <CustomerTableSkeleton />
                    ) : (
                        <DataTable columns={columns} data={filteredCustomers} />
                    )}
                </CardContent>
            </Card>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t.editCustomer}</DialogTitle>
                        <DialogDescription>{t.subtitle}</DialogDescription>
                    </DialogHeader>
                    {currentCustomer && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                handleUpdate({
                                    id: currentCustomer.id,
                                    name: formData.get("name") as string,
                                    email: formData.get("email") as string,
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
                                        defaultValue={currentCustomer.name}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="edit-email"
                                        className="text-right"
                                    >
                                        {t.emailLabel}
                                    </Label>
                                    <Input
                                        id="edit-email"
                                        name="email"
                                        type="email"
                                        defaultValue={currentCustomer.email}
                                        className="col-span-3"
                                        required
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
                                        defaultValue={currentCustomer.phone}
                                        className="col-span-3"
                                        placeholder={t.phonePlaceholder}
                                        required
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
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t.deleteCustomer}</DialogTitle>
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

function CustomerTableSkeleton() {
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
