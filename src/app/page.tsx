"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Credenciais fixas para login
        const validEmail = "takk8is";
        const validPassword = "takk8is";

        if (email === validEmail && password === validPassword) {
            // Store authentication state
            document.cookie = "isAuthenticated=true; path=/";
            sessionStorage.setItem("isAuthenticated", "true");
            // Redirect to dashboard
            router.push("/dashboard");
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-background dark:bg-gradient-to-br from-background to-secondary">
            <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-8 shadow-xl"
            >
                <div>
                    <h1 className="text-center text-4xl font-bold text-card-foreground"
                    >
                        Welcome Back
                    </h1>
                    <h2 className="mt-6 text-center text-2xl font-bold text-muted-foreground">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4 rounded-md">
                        <div className="relative">
                            <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                required
                                className="pl-8 bg-background border-input hover:border-input-hover text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter your username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="pl-8 bg-background border-input hover:border-input-hover text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-primary hover:text-primary-hover"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {error && (
                        <p className="text-center text-sm text-red-500"
                        >
                            {error}
                        </p>
                    )}

                    <div>
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
                        >
                            Log In
                        </Button>
                    </div>
                </form>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                    New user?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-primary hover:text-primary-hover"
                    >
                        Create account
                    </Link>
                </p>
            </div>
        </main>
    );
}
