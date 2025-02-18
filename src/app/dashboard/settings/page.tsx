"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../../context/LanguageContext"
import { useUser } from "../../context/UserContext"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
  { code: "de", name: "Deutsch" },
  { code: "pt", name: "Português" },
]

const countries = [
  { code: "ES", name: "Spain" },
  { code: "MX", name: "Mexico" },
  { code: "AR", name: "Argentina" },
  { code: "US", name: "United States" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "DE", name: "Germany" },
  { code: "PT", name: "Portugal" },
]

const translations = {
  en: {
    title: "Settings",
    subtitle: "Customize your account settings and preferences",
    avatar: "Profile Picture",
    changeAvatar: "Change Picture",
    personalInfo: "Personal Details",
    accountSettings: "Account",
    preferences: "Preferences",
    username: "Username",
    email: "Email",
    firstName: "First Name",
    lastName: "Last Name",
    phone: "Phone",
    country: "Country",
    language: "Language",
    theme: "Theme",
    save: "Save",
    avatarDescription: "Upload a photo to personalize your profile",
    usernamePlaceholder: "Enter username",
    emailPlaceholder: "Enter email address",
    firstNamePlaceholder: "Enter first name",
    lastNamePlaceholder: "Enter last name",
    phonePlaceholder: "Enter phone number",
    countryPlaceholder: "Select your country",
    languagePlaceholder: "Choose display language",
    successMessage: "Settings updated successfully",
    errorMessage: "An error occurred. Please try again.",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  es: {
    title: "Ajustes",
    subtitle: "Personaliza la configuración de tu cuenta",
    avatar: "Foto de Perfil",
    changeAvatar: "Cambiar Foto",
    personalInfo: "Datos Personales",
    accountSettings: "Cuenta",
    preferences: "Preferencias",
    username: "Usuario",
    email: "Correo",
    firstName: "Nombre",
    lastName: "Apellido",
    phone: "Teléfono",
    country: "País",
    language: "Idioma",
    theme: "Tema",
    save: "Guardar",
    avatarDescription: "Sube una foto para personalizar tu perfil",
    usernamePlaceholder: "Ingresa usuario",
    emailPlaceholder: "Ingresa correo",
    firstNamePlaceholder: "Ingresa nombre",
    lastNamePlaceholder: "Ingresa apellido",
    phonePlaceholder: "Ingresa teléfono",
    countryPlaceholder: "Selecciona país",
    languagePlaceholder: "Elige idioma",
    successMessage: "Configuración actualizada",
    errorMessage: "Ocurrió un error. Por favor, intenta de nuevo.",
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
  },
  fr: {
    title: "Paramètres",
    subtitle: "Personnalisez les paramètres de votre compte",
    avatar: "Photo de Profil",
    changeAvatar: "Modifier Photo",
    personalInfo: "Informations",
    accountSettings: "Compte",
    preferences: "Préférences",
    username: "Identifiant",
    email: "E-mail",
    firstName: "Prénom",
    lastName: "Nom",
    phone: "Téléphone",
    country: "Pays",
    language: "Langue",
    theme: "Thème",
    save: "Enregistrer",
    avatarDescription: "Téléchargez une photo pour personnaliser votre profil",
    usernamePlaceholder: "Entrez identifiant",
    emailPlaceholder: "Entrez e-mail",
    firstNamePlaceholder: "Entrez prénom",
    lastNamePlaceholder: "Entrez nom",
    phonePlaceholder: "Entrez téléphone",
    countryPlaceholder: "Sélectionnez pays",
    languagePlaceholder: "Choisissez langue",
    successMessage: "Paramètres mis à jour",
    errorMessage: "Une erreur est survenue. Veuillez réessayer.",
    light: "Clair",
    dark: "Sombre",
    system: "Système",
  },
  it: {
    title: "Impostazioni",
    subtitle: "Personalizza le impostazioni del tuo account",
    avatar: "Foto Profilo",
    changeAvatar: "Cambia Foto",
    personalInfo: "Dati Personali",
    accountSettings: "Account",
    preferences: "Preferenze",
    username: "Username",
    email: "Email",
    firstName: "Nome",
    lastName: "Cognome",
    phone: "Telefono",
    country: "Paese",
    language: "Lingua",
    theme: "Tema",
    save: "Salva",
    avatarDescription: "Carica una foto per personalizzare il tuo profilo",
    usernamePlaceholder: "Inserisci username",
    emailPlaceholder: "Inserisci email",
    firstNamePlaceholder: "Inserisci nome",
    lastNamePlaceholder: "Inserisci cognome",
    phonePlaceholder: "Inserisci telefono",
    countryPlaceholder: "Seleziona paese",
    languagePlaceholder: "Scegli lingua",
    successMessage: "Impostazioni aggiornate",
    errorMessage: "Si è verificato un errore. Riprova.",
    light: "Chiaro",
    dark: "Scuro",
    system: "Sistema",
  },
  de: {
    title: "Einstellungen",
    subtitle: "Passen Sie Ihre Kontoeinstellungen an",
    avatar: "Profilbild",
    changeAvatar: "Bild Ändern",
    personalInfo: "Persönliches",
    accountSettings: "Konto",
    preferences: "Einstellungen",
    username: "Benutzername",
    email: "E-Mail",
    firstName: "Vorname",
    lastName: "Nachname",
    phone: "Telefon",
    country: "Land",
    language: "Sprache",
    theme: "Thema",
    save: "Speichern",
    avatarDescription: "Laden Sie ein Foto hoch, um Ihr Profil zu personalisieren",
    usernamePlaceholder: "Benutzername eingeben",
    emailPlaceholder: "E-Mail eingeben",
    firstNamePlaceholder: "Vorname eingeben",
    lastNamePlaceholder: "Nachname eingeben",
    phonePlaceholder: "Telefon eingeben",
    countryPlaceholder: "Land auswählen",
    languagePlaceholder: "Sprache wählen",
    successMessage: "Einstellungen aktualisiert",
    errorMessage: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    light: "Hell",
    dark: "Dunkel",
    system: "System",
  },
  pt: {
    title: "Configurações",
    subtitle: "Personalize as configurações da sua conta",
    avatar: "Foto de Perfil",
    changeAvatar: "Mudar Foto",
    personalInfo: "Dados Pessoais",
    accountSettings: "Conta",
    preferences: "Preferências",
    username: "Usuário",
    email: "E-mail",
    firstName: "Nome",
    lastName: "Sobrenome",
    phone: "Telefone",
    country: "País",
    language: "Idioma",
    theme: "Tema",
    save: "Salvar",
    avatarDescription: "Envie uma foto para personalizar seu perfil",
    usernamePlaceholder: "Digite usuário",
    emailPlaceholder: "Digite e-mail",
    firstNamePlaceholder: "Digite nome",
    lastNamePlaceholder: "Digite sobrenome",
    phonePlaceholder: "Digite telefone",
    countryPlaceholder: "Selecione país",
    languagePlaceholder: "Escolha idioma",
    successMessage: "Configurações atualizadas",
    errorMessage: "Ocorreu um erro. Por favor, tente novamente.",
    light: "Claro",
    dark: "Escuro",
    system: "Sistema",
  },
}

export default function Settings() {
  const { language, setLanguage } = useLanguage()
  const { avatar, username, setAvatar, setUsername } = useUser()
  const { theme, setTheme } = useTheme()
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setUserData({
          email: "user@example.com",
          firstName: "John",
          lastName: "Doe",
          phone: "+1 234 567 890",
          country: "US",
        })
      } catch (error) {
        console.error("Error fetching user data:", error)
        toast({
          title: t.errorMessage,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchUserData()
  }, [t.errorMessage])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "username") {
      setUsername(value)
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === "language") {
      setLanguage(value)
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: t.successMessage,
        duration: 3000,
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: t.errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">{t.accountSettings}</TabsTrigger>
          <TabsTrigger value="preferences">{t.preferences}</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="space-y-6">
        <Card>
            <CardHeader>
              <CardTitle>{t.avatar}</CardTitle>
              <CardDescription>{t.avatarDescription}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatar} alt={username} />
                <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Label
                htmlFor="avatar-upload"
                className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 h-10 px-4 py-2"
              >
                {t.changeAvatar}
                <Input
                  id="avatar-upload"
                  type="file"
                  className="hidden"
                  onChange={handleAvatarChange}
                  accept="image/*"
                />
              </Label>
            </CardContent>
        </Card>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>{t.personalInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <SettingsFormSkeleton />
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">{t.username}</Label>
                        <Input
                          id="username"
                          name="username"
                          value={username}
                          onChange={handleInputChange}
                          placeholder={t.usernamePlaceholder}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t.email}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          placeholder={t.emailPlaceholder}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t.firstName}</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={userData.firstName}
                          onChange={handleInputChange}
                          placeholder={t.firstNamePlaceholder}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t.lastName}</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={userData.lastName}
                          onChange={handleInputChange}
                          placeholder={t.lastNamePlaceholder}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t.phone}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={userData.phone}
                          onChange={handleInputChange}
                          placeholder={t.phonePlaceholder}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">{t.country}</Label>
                        <Select
                          name="country"
                          value={userData.country}
                          onValueChange={(value) => handleSelectChange("country", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t.countryPlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading || isSaving}>
                  {isSaving ? "Saving..." : t.save}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
        <TabsContent value="preferences" className="space-y-6">
        <Card>
            <CardHeader>
              <CardTitle>{t.preferences}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">{t.language}</Label>
                <Select
                  name="language"
                  value={language}
                  onValueChange={(value) => handleSelectChange("language", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.languagePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="theme">{t.theme}</Label>
                <Select name="theme" value={theme} onValueChange={(value) => setTheme(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.theme} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">{t.light}</SelectItem>
                    <SelectItem value="dark">{t.dark}</SelectItem>
                    <SelectItem value="system">{t.system}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
        </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SettingsFormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

