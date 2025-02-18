/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    safelist: [
        'dark',
        'light',
        {
            pattern: /(bg|text|border)-(background|foreground|primary|secondary|muted|accent|destructive)/,
        },
    ],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        colors: {
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            'current-line': "hsl(var(--current-line))",
            selection: "hsl(var(--selection))",
            comment: "hsl(var(--comment))",
            cyan: "hsl(var(--cyan))",
            green: "hsl(var(--green))",
            orange: "hsl(var(--orange))",
            pink: "hsl(var(--pink))",
            purple: "hsl(var(--purple))",
            red: "hsl(var(--red))",
            yellow: "hsl(var(--yellow))",
            cursor: "hsl(var(--cursor))",
            'btn-primary': "hsl(var(--orange))",
            'btn-primary-hover': {
                light: "hsl(var(--orange-hover-light))",
                dark: "hsl(var(--orange-hover-dark))"
            },
            'btn-secondary': "transparent",
            'input-bg': {
                light: "hsl(var(--white))",
                dark: "hsl(var(--input-bg-dark))"
            },
            'input-border': {
                light: "hsl(var(--input-border-light))",
                dark: "hsl(var(--input-border-dark))"
            },
            'input-focus': "hsl(var(--cyan))",
            primary: {
                DEFAULT: "hsl(var(--primary))",
                foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
                DEFAULT: "hsl(var(--secondary))",
                foreground: "hsl(var(--secondary-foreground))",
            },
            destructive: {
                DEFAULT: "hsl(var(--destructive))",
                foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
                DEFAULT: "hsl(var(--muted))",
                foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
                DEFAULT: "hsl(var(--accent))",
                foreground: "hsl(var(--accent-foreground))",
            },
            popover: {
                DEFAULT: "hsl(var(--popover))",
                foreground: "hsl(var(--popover-foreground))",
            },
            card: {
                DEFAULT: "hsl(var(--card))",
                foreground: "hsl(var(--card-foreground))",
            },
        },
        borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
            "accordion-down": {
                from: { height: 0 },
                to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: 0 },
            },
        },
        animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
        }
    },
    plugins: [require("tailwindcss-animate")]
};
