"use client"

import { useState } from "react"
import { useLanguage } from "../../context/LanguageContext"
import { Search, Plus, Pencil, Trash2, ArrowUpDown } from "lucide-react"
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
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

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
    title: "Gestión de Proveedores",
    subtitle: "Optimiza tu cadena de suministro eficientemente",
    search: "Buscar proveedores",
    name: "Nombre",
    contact: "Contacto",
    phone: "Teléfono",
    actions: "Acciones",
    addProvider: "Añadir Proveedor",
    editProvider: "Editar Proveedor",
    deleteProvider: "Eliminar Proveedor",
    confirmDelete: "¿Estás seguro de que quieres eliminar este proveedor?",
    cancel: "Cancelar",
    save: "Guardar",
    delete: "Eliminar",
    nameLabel: "Nombre del Proveedor",
    contactLabel: "Persona de Contacto",
    phonePlaceholder: "Ingrese número de teléfono",
    successAdd: "Proveedor añadido exitosamente",
    successEdit: "Proveedor actualizado exitosamente",
    successDelete: "Proveedor eliminado exitosamente",
  },
  fr: {
    title: "Gestion des Fournisseurs",
    subtitle: "Optimisez votre chaîne d'approvisionnement efficacement",
    search: "Rechercher des fournisseurs",
    name: "Nom",
    contact: "Contact",
    phone: "Téléphone",
    actions: "Actions",
    addProvider: "Ajouter un Fournisseur",
    editProvider: "Modifier le Fournisseur",
    deleteProvider: "Supprimer le Fournisseur",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer ce fournisseur ?",
    cancel: "Annuler",
    save: "Enregistrer",
    delete: "Supprimer",
    nameLabel: "Nom du Fournisseur",
    contactLabel: "Personne à Contacter",
    phonePlaceholder: "Entrez le numéro de téléphone",
    successAdd: "Fournisseur ajouté avec succès",
    successEdit: "Fournisseur mis à jour avec succès",
    successDelete: "Fournisseur supprimé avec succès",
  },
  it: {
    title: "Gestione Fornitori",
    subtitle: "Ottimizza la tua catena di fornitura in modo efficiente",
    search: "Cerca fornitori",
    name: "Nome",
    contact: "Contatto",
    phone: "Telefono",
    actions: "Azioni",
    addProvider: "Aggiungi Fornitore",
    editProvider: "Modifica Fornitore",
    deleteProvider: "Elimina Fornitore",
    confirmDelete: "Sei sicuro di voler eliminare questo fornitore?",
    cancel: "Annulla",
    save: "Salva",
    delete: "Elimina",
    nameLabel: "Nome Fornitore",
    contactLabel: "Persona di Contatto",
    phonePlaceholder: "Inserisci numero di telefono",
    successAdd: "Fornitore aggiunto con successo",
    successEdit: "Fornitore aggiornato con successo",
    successDelete: "Fornitore eliminato con successo",
  },
  de: {
    title: "Lieferantenverwaltung",
    subtitle: "Optimieren Sie Ihre Lieferkette effizient",
    search: "Lieferanten suchen",
    name: "Name",
    contact: "Kontakt",
    phone: "Telefon",
    actions: "Aktionen",
    addProvider: "Lieferant hinzufügen",
    editProvider: "Lieferant bearbeiten",
    deleteProvider: "Lieferant löschen",
    confirmDelete: "Sind Sie sicher, dass Sie diesen Lieferanten löschen möchten?",
    cancel: "Abbrechen",
    save: "Speichern",
    delete: "Löschen",
    nameLabel: "Lieferantenname",
    contactLabel: "Ansprechpartner",
    phonePlaceholder: "Telefonnummer eingeben",
    successAdd: "Lieferant erfolgreich hinzugefügt",
    successEdit: "Lieferant erfolgreich aktualisiert",
    successDelete: "Lieferant erfolgreich gelöscht",
  },
  pt: {
    title: "Gestão de Fornecedores",
    subtitle: "Otimize sua cadeia de suprimentos de forma eficiente",
    search: "Buscar fornecedores",
    name: "Nome",
    contact: "Contato",
    phone: "Telefone",
    actions: "Ações",
    addProvider: "Adicionar Fornecedor",
    editProvider: "Editar Fornecedor",
    deleteProvider: "Excluir Fornecedor",
    confirmDelete: "Tem certeza que deseja excluir este fornecedor?",
    cancel: "Cancelar",
    save: "Salvar",
    delete: "Excluir",
    nameLabel: "Nome do Fornecedor",
    contactLabel: "Pessoa de Contato",
    phonePlaceholder: "Digite o número de telefone",
    successAdd: "Fornecedor adicionado com sucesso",
    successEdit: "Fornecedor atualizado com sucesso",
    successDelete: "Fornecedor excluído com sucesso",
  },
}

type Provider = {
  id: number
  name: string
  contact: string
  phone: string
}

const initialProviders: Provider[] = [
  { id: 1, name: "Acme Inc.", contact: "John Smith", phone: "123-456-7890" },
  { id: 2, name: "XYZ Corp.", contact: "Jane Doe", phone: "098-765-4321" },
  { id: 3, name: "Global Supplies", contact: "Bob Johnson", phone: "111-222-3333" },
  { id: 4, name: "Tech Solutions", contact: "Alice Brown", phone: "444-555-6666" },
  { id: 5, name: "Quality Goods", contact: "Charlie Davis", phone: "777-888-9999" },
]

export default function Providers() {
  const { language } = useLanguage()
  const [providers, setProviders] = useState<Provider[]>(initialProviders)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProvider, setCurrentProvider] = useState<Provider | null>(null)

  const t = translations[language as keyof typeof translations]

  const columns: ColumnDef<Provider>[] = [
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
        const provider = row.original
        return (
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(provider)}>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">{t.editProvider}</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(provider)}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">{t.deleteProvider}</span>
            </Button>
          </div>
        )
      },
    },
  ]

  const filteredProviders = providers.filter(
    (provider) =>
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.phone.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAdd = (newProvider: Omit<Provider, "id">) => {
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => {
      const id = Math.max(...providers.map((p) => p.id)) + 1
      setProviders([...providers, { ...newProvider, id }])
      setIsAddDialogOpen(false)
      setIsLoading(false)
      toast({
        title: t.successAdd,
        description: `${newProvider.name} has been added to the vendor list.`,
      })
    }, 1000)
  }

  const handleEdit = (provider: Provider) => {
    setCurrentProvider(provider)
    setIsEditDialogOpen(true)
  }

  const handleUpdate = (updatedProvider: Provider) => {
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => {
      setProviders(providers.map((p) => (p.id === updatedProvider.id ? updatedProvider : p)))
      setIsEditDialogOpen(false)
      setCurrentProvider(null)
      setIsLoading(false)
      toast({
        title: t.successEdit,
        description: `${updatedProvider.name}'s information has been updated.`,
      })
    }, 1000)
  }

  const handleDelete = (provider: Provider) => {
    setCurrentProvider(provider)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (currentProvider) {
      setIsLoading(true)
      // Simulating API call
      setTimeout(() => {
        setProviders(providers.filter((p) => p.id !== currentProvider.id))
        setIsDeleteDialogOpen(false)
        setCurrentProvider(null)
        setIsLoading(false)
        toast({
          title: t.successDelete,
          description: `${currentProvider.name} has been removed from the vendor list.`,
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
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleAdd({
                  name: formData.get("name") as string,
                  contact: formData.get("contact") as string,
                  phone: formData.get("phone") as string,
                })
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    {t.nameLabel}
                  </Label>
                  <Input id="name" name="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contact" className="text-right">
                    {t.contactLabel}
                  </Label>
                  <Input id="contact" name="contact" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    {t.phone}
                  </Label>
                  <Input id="phone" name="phone" className="col-span-3" placeholder={t.phonePlaceholder} required />
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
          {isLoading ? <ProviderTableSkeleton /> : <DataTable columns={columns} data={filteredProviders} />}
        </CardContent>
      </Card>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.editProvider}</DialogTitle>
            <DialogDescription>{t.subtitle}</DialogDescription>
          </DialogHeader>
          {currentProvider && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleUpdate({
                  id: currentProvider.id,
                  name: formData.get("name") as string,
                  contact: formData.get("contact") as string,
                  phone: formData.get("phone") as string,
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
                    defaultValue={currentProvider.name}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-contact" className="text-right">
                    {t.contactLabel}
                  </Label>
                  <Input
                    id="edit-contact"
                    name="contact"
                    defaultValue={currentProvider.contact}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-phone" className="text-right">
                    {t.phone}
                  </Label>
                  <Input
                    id="edit-phone"
                    name="phone"
                    defaultValue={currentProvider.phone}
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
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.deleteProvider}</DialogTitle>
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
  )
}

