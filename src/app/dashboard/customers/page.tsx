"use client";

import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useLocalStorage } from "@/hooks/use-local-storage";
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
    // ... outras traduções
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
    // ... outros clientes iniciais
];

export default function Customers() {
    const { language } = useLanguage();
    const [customers, setCustomers] = useLocalStorage<Customer[]>(
        "hipos_customers",
        initialCustomers,
    );
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
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {t.name}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
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

    const handleAdd = async (newCustomer: Omit<Customer, "id">) => {
        setIsLoading(true);
        try {
            // Simulating API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const id = Math.max(...customers.map((c) => c.id)) + 1;
            const customerToAdd = { ...newCustomer, id };
            setCustomers([...customers, customerToAdd]);
            setIsAddDialogOpen(false);
            toast({
                title: t.successAdd,
                description: `${newCustomer.name} has been added to the customer list.`,
            });
        } catch (error) {
            console.error("Error adding customer:", error);
            toast({
                title: "Error",
                description: "Failed to add customer",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (customer: Customer) => {
        setCurrentCustomer(customer);
        setIsEditDialogOpen(true);
    };

    const handleUpdate = async (updatedCustomer: Customer) => {
        setIsLoading(true);
        try {
            // Simulating API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setCustomers(
                customers.map((c) =>
                    c.id === updatedCustomer.id ? updatedCustomer : c,
                ),
            );
            setIsEditDialogOpen(false);
            setCurrentCustomer(null);
            toast({
                title: t.successEdit,
                description: `${updatedCustomer.name}'s information has been updated.`,
            });
        } catch (error) {
            console.error("Error updating customer:", error);
            toast({
                title: "Error",
                description: "Failed to update customer",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (customer: Customer) => {
        setCurrentCustomer(customer);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!currentCustomer) return;

        setIsLoading(true);
        try {
            // Simulating API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setCustomers(customers.filter((c) => c.id !== currentCustomer.id));
            setIsDeleteDialogOpen(false);
            setCurrentCustomer(null);
            toast({
                title: t.successDelete,
                description: `${currentCustomer.name} has been removed from the customer list.`,
            });
        } catch (error) {
            console.error("Error deleting customer:", error);
            toast({
                title: "Error",
                description: "Failed to delete customer",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
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
                <div className="flex flex-col md:flex-row justify-between gap-6">
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
                                <Plus className="mr-2 h-4 w-4" />{" "}
                                {t.addCustomer}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <AddEditCustomerForm
                                mode="add"
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
                        {isLoading ? (
                            <CustomerTableSkeleton />
                        ) : (
                            <DataTable
                                columns={columns}
                                data={filteredCustomers}
                            />
                        )}
                    </CardContent>
                </Card>
            </section>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    {currentCustomer && (
                        <AddEditCustomerForm
                            mode="edit"
                            customer={currentCustomer}
                            onSubmit={handleUpdate}
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

function AddEditCustomerForm({
    mode,
    customer,
    onSubmit,
    isLoading,
    t,
}: {
    mode: "add" | "edit";
    customer?: Customer;
    onSubmit: (data: any) => void;
    isLoading: boolean;
    t: any;
}) {
    return (
        <>
            <DialogHeader>
                <DialogTitle>
                    {mode === "add" ? t.addCustomer : t.editCustomer}
                </DialogTitle>
                <DialogDescription>{t.subtitle}</DialogDescription>
            </DialogHeader>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const data = {
                        name: formData.get("name") as string,
                        email: formData.get("email") as string,
                        phone: formData.get("phone") as string,
                    };
                    if (mode === "edit" && customer) {
                        onSubmit({ ...data, id: customer.id });
                    } else {
                        onSubmit(data);
                    }
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
                            defaultValue={customer?.name}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            {t.emailLabel}
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={customer?.email}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                            {t.phone}
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            defaultValue={customer?.phone}
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
        </>
    );
}
function CustomerTableSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between border-b py-4"
                >
                    <div className="flex space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                    </div>
                </div>
            ))}
        </div>
    );
}
