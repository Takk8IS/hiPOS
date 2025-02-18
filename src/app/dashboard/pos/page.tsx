"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../../context/LanguageContext"
import { Search, ShoppingCart, Plus, Minus, Trash2, CreditCard } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const translations = {
  en: {
    pos: "Quick Sale",
    search: "Find items",
    cart: "Your Cart",
    total: "Total",
    checkout: "Pay Now",
    emptyCart: "Cart is empty",
    addToCart: "Add",
    categories: "Categories",
    allProducts: "All Items",
    itemAdded: "Item added to cart",
    itemRemoved: "Item removed from cart",
    orderComplete: "Order complete",
  },
  es: {
    pos: "Venta Rápida",
    search: "Buscar",
    cart: "Tu Carrito",
    total: "Total",
    checkout: "Pagar",
    emptyCart: "Carrito vacío",
    addToCart: "Añadir",
    categories: "Categorías",
    allProducts: "Todo",
    itemAdded: "Artículo añadido al carrito",
    itemRemoved: "Artículo eliminado del carrito",
    orderComplete: "Pedido completado",
  },
  fr: {
    pos: "Vente Rapide",
    search: "Rechercher",
    cart: "Panier",
    total: "Total",
    checkout: "Payer",
    emptyCart: "Panier vide",
    addToCart: "Ajouter",
    categories: "Catégories",
    allProducts: "Tous",
    itemAdded: "Article ajouté au panier",
    itemRemoved: "Article supprimé du panier",
    orderComplete: "Commande terminée",
  },
  it: {
    pos: "Vendita Veloce",
    search: "Cerca",
    cart: "Carrello",
    total: "Totale",
    checkout: "Paga Ora",
    emptyCart: "Carrello vuoto",
    addToCart: "Aggiungi",
    categories: "Categorie",
    allProducts: "Tutti",
    itemAdded: "Articolo aggiunto al carrello",
    itemRemoved: "Articolo rimosso dal carrello",
    orderComplete: "Ordine completato",
  },
  de: {
    pos: "Schnellverkauf",
    search: "Suchen",
    cart: "Warenkorb",
    total: "Gesamt",
    checkout: "Bezahlen",
    emptyCart: "Korb leer",
    addToCart: "Hinzufügen",
    categories: "Kategorien",
    allProducts: "Alle",
    itemAdded: "Artikel zum Warenkorb hinzugefügt",
    itemRemoved: "Artikel aus dem Warenkorb entfernt",
    orderComplete: "Bestellung abgeschlossen",
  },
  pt: {
    pos: "Venda Rápida",
    search: "Buscar",
    cart: "Seu Carrinho",
    total: "Total",
    checkout: "Pagar",
    emptyCart: "Carrinho vazio",
    addToCart: "Adicionar",
    categories: "Categorias",
    allProducts: "Todos",
    itemAdded: "Item adicionado ao carrinho",
    itemRemoved: "Item removido do carrinho",
    orderComplete: "Pedido concluído",
  },
}

const categories = [
  { id: "all", name: "All Items" },
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "books", name: "Books" },
  { id: "food", name: "Food & Drinks" },
]

const products = [
  { id: 1, name: "Laptop", price: 999.99, category: "electronics" },
  { id: 2, name: "Smartphone", price: 499.99, category: "electronics" },
  { id: 3, name: "T-shirt", price: 19.99, category: "clothing" },
  { id: 4, name: "Jeans", price: 49.99, category: "clothing" },
  { id: 5, name: "Novel", price: 14.99, category: "books" },
  { id: 6, name: "Cookbook", price: 24.99, category: "books" },
  { id: 7, name: "Coffee", price: 3.99, category: "food" },
  { id: 8, name: "Pizza", price: 11.99, category: "food" },
]

type CartItem = {
  product: (typeof products)[0]
  quantity: number
}

export default function POS() {
  const { language } = useLanguage()
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const t = translations[language as keyof typeof translations]

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "all" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addToCart = (product: (typeof products)[0]) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.product.id === product.id)
      if (existingItem) {
        return currentCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        return [...currentCart, { product, quantity: 1 }]
      }
    })
    toast({
      title: t.itemAdded,
      description: `${product.name} ${t.itemAdded.toLowerCase()}`,
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.product.id !== productId))
    toast({
      title: t.itemRemoved,
      description: `${products.find((p) => p.id === productId)?.name} ${t.itemRemoved.toLowerCase()}`,
    })
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const handleCheckout = () => {
    toast({
      title: t.orderComplete,
      description: `${t.total}: $${total.toFixed(2)}`,
    })
    setCart([])
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.pos}</h1>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="flex-1 space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
          </div>
          <ScrollArea className="h-[70vh]">
            <div className="flex space-x-2 pb-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t.categories} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {t[category.id as keyof typeof t] || category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => addToCart(product)}>
                      {t.addToCart}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>{t.cart}</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground">{t.emptyCart}</p>
              ) : (
                <ScrollArea className="h-[50vh]">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.product.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              )}
            </CardContent>
            <Separator className="my-4" />
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex justify-between w-full">
                <span className="font-semibold">{t.total}:</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full" onClick={handleCheckout} disabled={cart.length === 0}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t.checkout}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

