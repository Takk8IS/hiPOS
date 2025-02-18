"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { User, Mail, Lock, Phone, Globe } from "lucide-react";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
        country: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            country: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here would be the registration logic
        console.log("Registration data:", formData);
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-background dark:bg-gradient-to-br from-background to-secondary">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-8 shadow-xl"
            >
                <div>
                    <motion.h1
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center text-4xl font-bold text-card-foreground"
                    >
                        Join hiPOS
                    </motion.h1>
                    <h2 className="mt-6 text-center text-2xl font-bold text-muted-foreground">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md">
                        <div className="relative">
                            <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="pl-8 bg-background border-input hover:border-input-hover text-foreground placeholder:text-muted-foreground"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="pl-8 bg-background border-input hover:border-input-hover text-foreground placeholder:text-muted-foreground"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    className="pl-8 bg-background border-input hover:border-input-hover text-foreground placeholder:text-muted-foreground"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative">
                                <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    className="pl-8 bg-background border-input hover:border-input-hover text-foreground placeholder:text-muted-foreground"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="pl-8 bg-background border-input hover:border-input-hover text-foreground placeholder:text-muted-foreground"
                                placeholder="Create password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Select
                                    onValueChange={handleSelectChange}
                                    value={formData.country}
                                >
                                    <SelectTrigger className="pl-8 bg-background border-input hover:border-input-hover text-foreground">
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ES">
                                            Spain
                                        </SelectItem>
                                        <SelectItem value="MX">
                                            Mexico
                                        </SelectItem>
                                        <SelectItem value="AR">
                                            Argentina
                                        </SelectItem>
                                        <SelectItem value="US">
                                            United States
                                        </SelectItem>
                                        <SelectItem value="FR">
                                            France
                                        </SelectItem>
                                        <SelectItem value="IT">
                                            Italy
                                        </SelectItem>
                                        <SelectItem value="DE">
                                            Germany
                                        </SelectItem>
                                        <SelectItem value="PT">
                                            Portugal
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="relative">
                                <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    className="pl-8 bg-background border-input hover:border-input-hover text-foreground placeholder:text-muted-foreground"
                                    placeholder="Phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/"
                        className="font-medium text-primary hover:text-primary-hover"
                    >
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </main>
    );
}
