"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { format } from "date-fns";
import { Plus, Pencil, Trash2, ArrowUpDown, Search } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
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

type TranslationType = {
    title: string;
    subtitle: string;
    search: string;
    name: string;
    description: string;
    amount: string;
    type: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    createdAt: string;
    updatedAt: string;
    filterByType: string;
    sortBy: string;
    loading: string;
    required: string;
    invalidAmount: string;
    invalidType: string;
    actions: string;
    addFee: string;
    editFee: string;
    deleteFee: string;
    fixed: string;
    percentage: string;
    save: string;
    cancel: string;
    confirmDelete: string;
    delete: string;
    feeAdded: string;
    feeUpdated: string;
    feeDeleted: string;
    nameLabel: string;
    amountLabel: string;
    typeLabel: string;
    namePlaceholder: string;
    amountPlaceholder: string;
    typePlaceholder: string;
    next: string;
    previous: string;
};

const translations: Record<string, TranslationType> = {
    en: {
        title: "Fee Management",
        subtitle: "Manage your pricing structure efficiently",
        search: "Search fees",
        name: "Name",
        description: "Description",
        amount: "Amount",
        type: "Type",
        descriptionLabel: "Fee Description",
        descriptionPlaceholder: "Enter fee description",
        createdAt: "Created",
        updatedAt: "Last Updated",
        filterByType: "Filter by type",
        sortBy: "Sort by",
        loading: "Loading...",
        required: "This field is required",
        invalidAmount: "Please enter a valid amount",
        invalidType: "Please select a valid type",
        actions: "Actions",
        addFee: "Add Fee",
        editFee: "Edit Fee",
        deleteFee: "Delete Fee",
        fixed: "Fixed",
        percentage: "Percentage",
        save: "Save",
        cancel: "Cancel",
        confirmDelete: "Are you sure you want to delete this fee?",
        delete: "Delete",
        feeAdded: "Fee added successfully",
        feeUpdated: "Fee updated successfully",
        feeDeleted: "Fee deleted successfully",
        nameLabel: "Fee Name",
        amountLabel: "Fee Amount",
        typeLabel: "Fee Type",
        namePlaceholder: "Enter fee name",
        amountPlaceholder: "Enter amount",
        typePlaceholder: "Select fee type",
        next: "Next",
        previous: "Previous",
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

const feeFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    amount: z.number().min(0, "Amount must be positive"),
    type: z.enum(["Fixed", "Percentage"], {
        required_error: "Type is required",
    }),
});

type FeeSchema = z.infer<typeof feeFormSchema>;

type Fee = FeeSchema & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};

const initialFees: Fee[] = [
    {
        id: 1,
        name: "Standard Fee",
        description: "Base fee applied to all transactions",
        amount: 10.0,
        type: "Fixed",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    // Additional initial fees...
];

export default function FeePage() {
    const { language } = useLanguage();
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get("page") ?? "1";
    const per_page = searchParams.get("per_page") ?? "10";
    const pageIndex = parseInt(page) - 1;
    const pageSize = parseInt(per_page);

    const [fees, setFees] = useLocalStorage<Fee[]>("hipos_fees", initialFees);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentFee, setCurrentFee] = useState<Fee | null>(null);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<FeeSchema>({
        resolver: zodResolver(feeFormSchema),
        defaultValues: {
            name: "",
            description: "",
            amount: 0,
            type: "Fixed",
        },
    });

    const t: TranslationType =
        translations[language as keyof typeof translations];

    const handleError = useCallback((error: unknown) => {
        const message =
            error instanceof Error ? error.message : "An error occurred";
        toast({
            variant: "destructive",
            title: "Error",
            description: message,
        });
    }, []);

    const columns: ColumnDef<Fee>[] = [
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
            accessorKey: "description",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        {t.description}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "amount",
            header: t.amount,
            cell: ({ row }) => {
                const amount = Number.parseFloat(row.getValue("amount"));
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
            accessorKey: "type",
            header: t.type,
            cell: ({ row }) => {
                const type = row.getValue("type") as string;
                return (
                    <Badge variant={type === "Fixed" ? "default" : "secondary"}>
                        {type === "Fixed" ? t.fixed : t.percentage}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "createdAt",
            header: t.createdAt,
            cell: ({ row }) =>
                format(new Date(row.getValue("createdAt")), "PPP"),
        },
        {
            accessorKey: "updatedAt",
            header: t.updatedAt,
            cell: ({ row }) =>
                format(new Date(row.getValue("updatedAt")), "PPP"),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const fee = row.original;
                return (
                    <div className="flex space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(fee)}
                        >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">{t.editFee}</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(fee)}
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">{t.deleteFee}</span>
                        </Button>
                    </div>
                );
            },
        },
    ];

    const filteredFees = fees.filter((fee) =>
        fee.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleAdd = (newFee: Omit<Fee, "id">) => {
        setIsLoading(true);
        try {
            setTimeout(() => {
                const id = Math.max(...fees.map((f) => f.id)) + 1;
                setFees([...fees, { ...newFee, id }]);
                form.reset();
                toast({
                    title: t.feeAdded,
                    description: `${newFee.name} has been added to the fee list.`,
                });
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (fee: Fee) => {
        setCurrentFee(fee);
        setIsEditDialogOpen(true);
    };

    const handleUpdate = (updatedFee: Fee) => {
        setIsLoading(true);
        setTimeout(() => {
            setFees(fees.map((f) => (f.id === updatedFee.id ? updatedFee : f)));
            setIsEditDialogOpen(false);
            setCurrentFee(null);
            setIsLoading(false);
            toast({
                title: t.feeUpdated,
                description: `${updatedFee.name} has been updated.`,
            });
        }, 1000);
    };

    const handleDelete = (fee: Fee) => {
        setCurrentFee(fee);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (currentFee) {
            setIsLoading(true);
            setTimeout(() => {
                setFees(fees.filter((f) => f.id !== currentFee.id));
                setIsDeleteDialogOpen(false);
                setCurrentFee(null);
                setIsLoading(false);
                toast({
                    title: t.feeDeleted,
                    description: `${currentFee.name} has been removed from the fee list.`,
                });
            }, 1000);
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
                </div>
            </section>

            <section className="bg-background rounded-lg shadow">
                <Card className="border-0">
                    <CardContent className="p-6">
                        {isLoading ? (
                            <FeeTableSkeleton />
                        ) : (
                            <>
                                <DataTable
                                    columns={columns}
                                    data={filteredFees.slice(
                                        pageIndex * pageSize,
                                        (pageIndex + 1) * pageSize,
                                    )}
                                />
                                <Pagination className="mt-4">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    router.push(
                                                        `?page=${Math.max(1, pageIndex)}&per_page=${pageSize}`,
                                                    )
                                                }
                                                disabled={pageIndex === 0}
                                            >
                                                {t.previous}
                                            </Button>
                                        </PaginationItem>
                                        {Array.from({
                                            length: Math.ceil(
                                                filteredFees.length / pageSize,
                                            ),
                                        }).map((_, i) => (
                                            <PaginationItem key={i}>
                                                <PaginationLink
                                                    onClick={() =>
                                                        router.push(
                                                            `?page=${i + 1}&per_page=${pageSize}`,
                                                        )
                                                    }
                                                    isActive={pageIndex === i}
                                                >
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        <PaginationItem>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    router.push(
                                                        `?page=${Math.min(
                                                            Math.ceil(
                                                                filteredFees.length /
                                                                    pageSize,
                                                            ),
                                                            pageIndex + 2,
                                                        )}&per_page=${pageSize}`,
                                                    )
                                                }
                                                disabled={
                                                    pageIndex >=
                                                    Math.ceil(
                                                        filteredFees.length /
                                                            pageSize,
                                                    ) -
                                                        1
                                                }
                                            >
                                                {t.next}
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </>
                        )}
                    </CardContent>
                </Card>
            </section>

            <div className="fixed bottom-8 right-8">
                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Plus className="mr-2 h-4 w-4" /> {t.addFee}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t.addFee}</DialogTitle>
                            <DialogDescription>{t.subtitle}</DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={form.handleSubmit((data) => {
                                try {
                                    handleAdd({
                                        ...data,
                                        createdAt: new Date(),
                                        updatedAt: new Date(),
                                    });
                                    setIsAddDialogOpen(false);
                                } catch (error) {
                                    handleError(error);
                                }
                            })}
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
                                        {...form.register("name")}
                                        className="col-span-3"
                                        placeholder={t.namePlaceholder}
                                        required
                                        aria-required="true"
                                        aria-invalid={
                                            form.formState.errors.name
                                                ? "true"
                                                : "false"
                                        }
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="description"
                                        className="text-right"
                                    >
                                        {t.descriptionLabel}
                                    </Label>
                                    <Input
                                        id="description"
                                        {...form.register("description")}
                                        className="col-span-3"
                                        placeholder={t.descriptionPlaceholder}
                                        required
                                        aria-required="true"
                                        aria-invalid={
                                            form.formState.errors.description
                                                ? "true"
                                                : "false"
                                        }
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="amount"
                                        className="text-right"
                                    >
                                        {t.amountLabel}
                                    </Label>
                                    <Input
                                        id="amount"
                                        {...form.register("amount", {
                                            valueAsNumber: true,
                                        })}
                                        type="number"
                                        step="0.01"
                                        className="col-span-3"
                                        placeholder={t.amountPlaceholder}
                                        required
                                        aria-required="true"
                                        aria-invalid={
                                            form.formState.errors.amount
                                                ? "true"
                                                : "false"
                                        }
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="type"
                                        className="text-right"
                                    >
                                        {t.typeLabel}
                                    </Label>
                                    <Select
                                        onValueChange={(value) =>
                                            form.setValue(
                                                "type",
                                                value as "Fixed" | "Percentage",
                                            )
                                        }
                                        defaultValue={form.getValues("type")}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue
                                                placeholder={t.typePlaceholder}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Fixed">
                                                {t.fixed}
                                            </SelectItem>
                                            <SelectItem value="Percentage">
                                                {t.percentage}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? t.loading : t.save}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t.editFee}</DialogTitle>
                        <DialogDescription>{t.subtitle}</DialogDescription>
                    </DialogHeader>
                    {currentFee && (
                        <form
                            onSubmit={form.handleSubmit((data) => {
                                try {
                                    handleUpdate({
                                        id: currentFee.id,
                                        ...data,
                                        createdAt: currentFee.createdAt,
                                        updatedAt: new Date(),
                                    });
                                } catch (error) {
                                    handleError(error);
                                }
                            })}
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
                                        {...form.register("name")}
                                        defaultValue={currentFee.name}
                                        className="col-span-3"
                                        placeholder={t.namePlaceholder}
                                        required
                                        aria-required="true"
                                        aria-invalid={
                                            form.formState.errors.name
                                                ? "true"
                                                : "false"
                                        }
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="edit-description"
                                        className="text-right"
                                    >
                                        {t.descriptionLabel}
                                    </Label>
                                    <Input
                                        id="edit-description"
                                        {...form.register("description")}
                                        defaultValue={currentFee.description}
                                        className="col-span-3"
                                        placeholder={t.descriptionPlaceholder}
                                        required
                                        aria-required="true"
                                        aria-invalid={
                                            form.formState.errors.description
                                                ? "true"
                                                : "false"
                                        }
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="edit-amount"
                                        className="text-right"
                                    >
                                        {t.amountLabel}
                                    </Label>
                                    <Input
                                        id="edit-amount"
                                        {...form.register("amount", {
                                            valueAsNumber: true,
                                        })}
                                        type="number"
                                        step="0.01"
                                        defaultValue={currentFee.amount}
                                        className="col-span-3"
                                        placeholder={t.amountPlaceholder}
                                        required
                                        aria-required="true"
                                        aria-invalid={
                                            form.formState.errors.amount
                                                ? "true"
                                                : "false"
                                        }
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="edit-type"
                                        className="text-right"
                                    >
                                        {t.typeLabel}
                                    </Label>
                                    <Select
                                        onValueChange={(value) =>
                                            form.setValue(
                                                "type",
                                                value as "Fixed" | "Percentage",
                                            )
                                        }
                                        defaultValue={currentFee.type}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue
                                                placeholder={t.typePlaceholder}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Fixed">
                                                {t.fixed}
                                            </SelectItem>
                                            <SelectItem value="Percentage">
                                                {t.percentage}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? t.loading : t.save}
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
                        <DialogTitle>{t.deleteFee}</DialogTitle>
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
                            {isLoading ? t.loading : t.delete}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function FeeTableSkeleton() {
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
