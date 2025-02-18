"use client"

import { useState } from "react"
import { useLanguage } from "../../context/LanguageContext"
import { Plus, Pencil, Trash2, ArrowUpDown, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

const translations = {
  en: {
    title: "Fee Management",
    subtitle: "Manage your pricing structure efficiently",
    search: "Search fees",
    name: "Name",
    amount: "Amount",
    type: "Type",
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
  },
  es: {
    title: "Gestión de Tarifas",
    subtitle: "Administre su estructura de precios eficientemente",
    search: "Buscar tarifas",
    name: "Nombre",
    amount: "Monto",
    type: "Tipo",
    actions: "Acciones",
    addFee: "Añadir Tarifa",
    editFee: "Editar Tarifa",
    deleteFee: "Eliminar Tarifa",
    fixed: "Fija",
    percentage: "Porcentaje",
    save: "Guardar",
    cancel: "Cancelar",
    confirmDelete: "¿Está seguro de que desea eliminar esta tarifa?",
    delete: "Eliminar",
    feeAdded: "Tarifa añadida exitosamente",
    feeUpdated: "Tarifa actualizada exitosamente",
    feeDeleted: "Tarifa eliminada exitosamente",
    nameLabel: "Nombre de la Tarifa",
    amountLabel: "Monto de la Tarifa",
    typeLabel: "Tipo de Tarifa",
    namePlaceholder: "Ingrese el nombre de la tarifa",
    amountPlaceholder: "Ingrese el monto",
    typePlaceholder: "Seleccione el tipo de tarifa",
  },
  fr: {
    title: "Gestion des Frais",
    subtitle: "Gérez efficacement votre structure tarifaire",
    search: "Rechercher des frais",
    name: "Nom",
    amount: "Montant",
    type: "Type",
    actions: "Actions",
    addFee: "Ajouter des Frais",
    editFee: "Modifier les Frais",
    deleteFee: "Supprimer les Frais",
    fixed: "Fixe",
    percentage: "Pourcentage",
    save: "Enregistrer",
    cancel: "Annuler",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer ces frais ?",
    delete: "Supprimer",
    feeAdded: "Frais ajoutés avec succès",
    feeUpdated: "Frais mis à jour avec succès",
    feeDeleted: "Frais supprimés avec succès",
    nameLabel: "Nom des Frais",
    amountLabel: "Montant des Frais",
    typeLabel: "Type de Frais",
    namePlaceholder: "Entrez le nom des frais",
    amountPlaceholder: "Entrez le montant",
    typePlaceholder: "Sélectionnez le type de frais",
  },
  it: {
    title: "Gestione delle Tariffe",
    subtitle: "Gestisci in modo efficiente la tua struttura tariffaria",
    search: "Cerca tariffe",
    name: "Nome",
    amount: "Importo",
    type: "Tipo",
    actions: "Azioni",
    addFee: "Aggiungi Tariffa",
    editFee: "Modifica Tariffa",
    deleteFee: "Elimina Tariffa",
    fixed: "Fissa",
    percentage: "Percentuale",
    save: "Salva",
    cancel: "Annulla",
    confirmDelete: "Sei sicuro di voler eliminare questa tariffa?",
    delete: "Elimina",
    feeAdded: "Tariffa aggiunta con successo",
    feeUpdated: "Tariffa aggiornata con successo",
    feeDeleted: "Tariffa eliminata con successo",
    nameLabel: "Nome Tariffa",
    amountLabel: "Importo Tariffa",
    typeLabel: "Tipo Tariffa",
    namePlaceholder: "Inserisci il nome della tariffa",
    amountPlaceholder: "Inserisci l'importo",
    typePlaceholder: "Seleziona il tipo di tariffa",
  },
  de: {
    title: "Gebührenverwaltung",
    subtitle: "Verwalten Sie Ihre Preisstruktur effizient",
    search: "Gebühren suchen",
    name: "Name",
    amount: "Betrag",
    type: "Typ",
    actions: "Aktionen",
    addFee: "Gebühr hinzufügen",
    editFee: "Gebühr bearbeiten",
    deleteFee: "Gebühr löschen",
    fixed: "Fest",
    percentage: "Prozentual",
    save: "Speichern",
    cancel: "Abbrechen",
    confirmDelete: "Sind Sie sicher, dass Sie diese Gebühr löschen möchten?",
    delete: "Löschen",
    feeAdded: "Gebühr erfolgreich hinzugefügt",
    feeUpdated: "Gebühr erfolgreich aktualisiert",
    feeDeleted: "Gebühr erfolgreich gelöscht",
    nameLabel: "Gebührenname",
    amountLabel: "Gebührenbetrag",
    typeLabel: "Gebührentyp",
    namePlaceholder: "Geben Sie den Gebührennamen ein",
    amountPlaceholder: "Geben Sie den Betrag ein",
    typePlaceholder: "Wählen Sie den Gebührentyp",
  },
  pt: {
    title: "Gestão de Taxas",
    subtitle: "Gerencie sua estrutura de preços de forma eficiente",
    search: "Buscar taxas",
    name: "Nome",
    amount: "Valor",
    type: "Tipo",
    actions: "Ações",
    addFee: "Adicionar Taxa",
    editFee: "Editar Taxa",
    deleteFee: "Excluir Taxa",
    fixed: "Fixa",
    percentage: "Percentual",
    save: "Salvar",
    cancel: "Cancelar",
    confirmDelete: "Tem certeza que deseja excluir esta taxa?",
    delete: "Excluir",
    feeAdded: "Taxa adicionada com sucesso",
    feeUpdated: "Taxa atualizada com sucesso",
    feeDeleted: "Taxa excluída com sucesso",
    nameLabel: "Nome da Taxa",
    amountLabel: "Valor da Taxa",
    typeLabel: "Tipo de Taxa",
    namePlaceholder: "Digite o nome da taxa",
    amountPlaceholder: "Digite o valor",
    typePlaceholder: "Selecione o tipo de taxa",
  },
}

type Fee = {
  id: number
  name: string
  amount: number
  type: "Fixed" | "Percentage"
}

const initialFees: Fee[] = [
  { id: 1, name: "Standard Fee", amount: 10.0, type: "Fixed" },
  { id: 2, name: "Premium Fee", amount: 5.0, type: "Percentage" },
  { id: 3, name: "Express Fee", amount: 15.0, type: "Fixed" },
  { id: 4, name: "Loyalty Discount", amount: 2.0, type: "Percentage" },
  { id: 5, name: "Handling Fee", amount: 3.5, type: "Fixed" },
]

export default function Fee() {
  const { language } = useLanguage()
  const [fees, setFees] = useState<Fee[]>(initialFees)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentFee, setCurrentFee] = useState<Fee | null>(null)

  const t = translations[language as keyof typeof translations]

  const columns: ColumnDef<Fee>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            {t.name}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "amount",
      header: t.amount,
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("amount"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "type",
      header: t.type,
      cell: ({ row }) => {
        const type = row.getValue("type") as string
        return (
          <Badge variant={type === "Fixed" ? "default" : "secondary"}>
            {type === "Fixed" ? t.fixed : t.percentage}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const fee = row.original
        return (
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(fee)}>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">{t.editFee}</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(fee)}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">{t.deleteFee}</span>
            </Button>
          </div>
        )
      },
    },
  ]

  const filteredFees = fees.filter((fee) => fee.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAdd = (newFee: Omit<Fee, "id">) => {
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => {
      const id = Math.max(...fees.map((f) => f.id)) + 1
      setFees([...fees, { ...newFee, id }])
      setIsAddDialogOpen(false)
      setIsLoading(false)
      toast({
        title: t.feeAdded,
        description: `${newFee.name} has been added to the fee list.`,
      })
    }, 1000)
  }

  const handleEdit = (fee: Fee) => {
    setCurrentFee(fee)
    setIsEditDialogOpen(true)
  }

  const handleUpdate = (updatedFee: Fee) => {
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => {
      setFees(fees.map((f) => (f.id === updatedFee.id ? updatedFee : f)))
      setIsEditDialogOpen(false)
      setCurrentFee(null)
      setIsLoading(false)
      toast({
        title: t.feeUpdated,
        description: `${updatedFee.name} has been updated.`,
      })
    }, 1000)
  }

  const handleDelete = (fee: Fee) => {
    setCurrentFee(fee)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (currentFee) {
      setIsLoading(true)
      // Simulating API call
      setTimeout(() => {
        setFees(fees.filter((f) => f.id !== currentFee.id))
        setIsDeleteDialogOpen(false)
        setCurrentFee(null)
        setIsLoading(false)
        toast({
          title: t.feeDeleted,
          description: `${currentFee.name} has been removed from the fee list.`,
        })
      }, 1000)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleAdd({
                  name: formData.get("name") as string,
                  amount: Number.parseFloat(formData.get("amount") as string),
                  type: formData.get("type") as "Fixed" | "Percentage",
                })
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    {t.nameLabel}
                  </Label>
                  <Input id="name" name="name" className="col-span-3" placeholder={t.namePlaceholder} required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    {t.amountLabel}
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    className="col-span-3"
                    placeholder={t.amountPlaceholder}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    {t.typeLabel}
                  </Label>
                  <Select name="type" defaultValue="Fixed">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={t.typePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fixed">{t.fixed}</SelectItem>
                      <SelectItem value="Percentage">{t.percentage}</SelectItem>
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
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t.search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? <FeeTableSkeleton /> : <DataTable columns={columns} data={filteredFees} />}
        </CardContent>
      </Card>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.editFee}</DialogTitle>
            <DialogDescription>{t.subtitle}</DialogDescription>
          </DialogHeader>
          {currentFee && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleUpdate({
                  id: currentFee.id,
                  name: formData.get("name") as string,
                  amount: Number.parseFloat(formData.get("amount") as string),
                  type: formData.get("type") as "Fixed" | "Percentage",
                })
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    {t.nameLabel}
                  </Label>
                  <Input
                    id="edit-name"
                    name="name"
                    defaultValue={currentFee.name}
                    className="col-span-3"
                    placeholder={t.namePlaceholder}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-amount" className="text-right">
                    {t.amountLabel}
                  </Label>
                  <Input
                    id="edit-amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    defaultValue={currentFee.amount}
                    className="col-span-3"
                    placeholder={t.amountPlaceholder}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-type" className="text-right">
                    {t.typeLabel}
                  </Label>
                  <Select name="type" defaultValue={currentFee.type}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={t.typePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fixed">{t.fixed}</SelectItem>
                      <SelectItem value="Percentage">{t.percentage}</SelectItem>
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
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.deleteFee}</DialogTitle>
            <DialogDescription>{t.confirmDelete}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : t.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
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
  )
}

