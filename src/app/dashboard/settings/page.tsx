"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { useUser } from "../../context/UserContext";
import { useTheme } from "next-themes";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

import {
    UserCircle,
    Settings as SettingsIcon,
    Palette,
    Database,
    Link as LinkIcon,
    Receipt,
    Save,
    Upload,
} from "lucide-react";

const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "it", name: "Italiano" },
    { code: "de", name: "Deutsch" },
    { code: "pt", name: "Português" },
];

const countries = [
    { code: "ES", name: "Spain" },
    { code: "MX", name: "Mexico" },
    { code: "AR", name: "Argentina" },
    { code: "US", name: "United States" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "DE", name: "Germany" },
    { code: "PT", name: "Portugal" },
];

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

export default function Settings() {
    const { language, setLanguage } = useLanguage();
    const { avatar, username, setAvatar, setUsername } = useUser();
    const { theme, setTheme } = useTheme();
    const [userData, setUserData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        country: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const t = translations[language as keyof typeof translations];

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                // Simulating API call
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setUserData({
                    email: "user@example.com",
                    firstName: "John",
                    lastName: "Doe",
                    phone: "+1 234 567 890",
                    country: "US",
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast({
                    title: t.errorMessage,
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, [t.errorMessage]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else {
            setUserData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        if (name === "language") {
            setLanguage(value);
        } else {
            setUserData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            // Simulating API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast({
                title: t.successMessage,
                duration: 3000,
            });
        } catch (error) {
            console.error("Error saving settings:", error);
            toast({
                title: t.errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
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

            <Tabs defaultValue="account" className="space-y-6">
                <TabsList className="mb-4">
                    <TabsTrigger
                        value="account"
                        className="flex items-center gap-2"
                    >
                        <UserCircle className="h-4 w-4" />
                        {t.accountSettings}
                    </TabsTrigger>
                    <TabsTrigger
                        value="preferences"
                        className="flex items-center gap-2"
                    >
                        <SettingsIcon className="h-4 w-4" />
                        {t.preferences}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="account" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t.avatar}</CardTitle>
                            <CardDescription>
                                {t.avatarDescription}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center space-x-4">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={avatar} alt={username} />
                                <AvatarFallback>
                                    {username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <Label
                                htmlFor="avatar-upload"
                                className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 h-10 px-4 py-2"
                            >
                                <Upload className="mr-2 h-4 w-4" />
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
                                    <PersonalInfoForm
                                        t={t}
                                        userData={userData}
                                        username={username}
                                        handleInputChange={handleInputChange}
                                        handleSelectChange={handleSelectChange}
                                        countries={countries}
                                    />
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button
                                    type="submit"
                                    disabled={isLoading || isSaving}
                                >
                                    <Save className="mr-2 h-4 w-4" />
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
                                    onValueChange={(value) =>
                                        handleSelectChange("language", value)
                                    }
                                >
                                    <SelectTrigger id="language">
                                        <SelectValue
                                            placeholder={t.languagePlaceholder}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languages.map((lang) => (
                                            <SelectItem
                                                key={lang.code}
                                                value={lang.code}
                                            >
                                                {lang.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="theme">{t.theme}</Label>
                                <Select
                                    name="theme"
                                    value={theme}
                                    onValueChange={(value) => setTheme(value)}
                                >
                                    <SelectTrigger id="theme">
                                        <SelectValue placeholder={t.theme} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">
                                            {t.light}
                                        </SelectItem>
                                        <SelectItem value="dark">
                                            {t.dark}
                                        </SelectItem>
                                        <SelectItem value="system">
                                            {t.system}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function PersonalInfoForm({
    t,
    userData,
    username,
    handleInputChange,
    handleSelectChange,
    countries,
}: any) {
    return (
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
                        onValueChange={(value) =>
                            handleSelectChange("country", value)
                        }
                    >
                        <SelectTrigger id="country">
                            <SelectValue placeholder={t.countryPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map((country: any) => (
                                <SelectItem
                                    key={country.code}
                                    value={country.code}
                                >
                                    {country.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </>
    );
}

function SettingsFormSkeleton() {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </div>
    );
}
