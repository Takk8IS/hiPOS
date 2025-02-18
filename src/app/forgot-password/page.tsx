'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { useLanguage } from '../context/LanguageContext'

const translations = {
  en: {
    title: "Forgot Password",
    subtitle: "Enter your email to reset your password",
    emailPlaceholder: "Enter your email",
    resetButton: "Reset Password",
    backToLogin: "Back to Login",
    successMessage: "If your email is registered, you will receive reset instructions shortly.",
  },
  es: {
    title: "Olvidé mi Contraseña",
    subtitle: "Ingresa tu correo para restablecer tu contraseña",
    emailPlaceholder: "Ingresa tu correo",
    resetButton: "Restablecer Contraseña",
    backToLogin: "Volver al Inicio de Sesión",
    successMessage: "Si tu correo está registrado, recibirás instrucciones para restablecer tu contraseña en breve.",
  },
  fr: {
    title: "Mot de Passe Oublié",
    subtitle: "Entrez votre e-mail pour réinitialiser votre mot de passe",
    emailPlaceholder: "Entrez votre e-mail",
    resetButton: "Réinitialiser le Mot de Passe",
    backToLogin: "Retour à la Connexion",
    successMessage: "Si votre e-mail est enregistré, vous recevrez bientôt des instructions de réinitialisation.",
  },
  it: {
    title: "Password Dimenticata",
    subtitle: "Inserisci la tua email per reimpostare la password",
    emailPlaceholder: "Inserisci la tua email",
    resetButton: "Reimposta Password",
    backToLogin: "Torna al Login",
    successMessage: "Se la tua email è registrata, riceverai a breve le istruzioni per reimpostare la password.",
  },
  de: {
    title: "Passwort Vergessen",
    subtitle: "Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen",
    emailPlaceholder: "E-Mail eingeben",
    resetButton: "Passwort Zurücksetzen",
    backToLogin: "Zurück zum Login",
    successMessage: "Wenn Ihre E-Mail-Adresse registriert ist, erhalten Sie in Kürze Anweisungen zum Zurücksetzen.",
  },
  pt: {
    title: "Esqueci a Senha",
    subtitle: "Digite seu e-mail para redefinir sua senha",
    emailPlaceholder: "Digite seu e-mail",
    resetButton: "Redefinir Senha",
    backToLogin: "Voltar para o Login",
    successMessage: "Se seu e-mail estiver registrado, você receberá instruções de redefinição em breve.",
  }
}

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const { language } = useLanguage()
  const t = translations[language as keyof typeof translations]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your backend to initiate the password reset process
    // For now, we'll just show a success message
    toast({
      title: t.successMessage,
      duration: 5000,
    })
    setEmail('')
  }

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
            {t.title}
          </motion.h1>
        <h2 className="mt-6 text-center text-2xl font-bold text-muted-foreground">{t.subtitle}</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md">
            <div className="relative">
              <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="pl-8 bg-background border-input hover:border-input-hover text-foreground placeholder:text-muted-foreground"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
            >
              {t.resetButton}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center">
        <Link href="/" className="flex items-center justify-center text-sm text-primary hover:text-primary-hover">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.backToLogin}
          </Link>
        </div>
      </motion.div>
    </main>
  )
}

