"use client";

import { useState, useEffect } from "react";

const STORAGE_PREFIX = "@hipos:";

const isClient = typeof window !== "undefined";

export function useLocalStorage<T>(
    key: string,
    initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
    // Prefixar a chave para evitar colisões
    const prefixedKey = STORAGE_PREFIX + key;

    // Criar estado inicial de forma lazy para evitar execução desnecessária no servidor
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (!isClient) {
            return initialValue;
        }

        try {
            const item = localStorage.getItem(prefixedKey);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            return initialValue;
        }
    });

    // Effect para sincronizar o valor com localStorage quando mudar
    useEffect(() => {
        if (!isClient) {
            return;
        }

        try {
            localStorage.setItem(prefixedKey, JSON.stringify(storedValue));
        } catch (error) {
            console.error("Error writing to localStorage:", error);
        }
    }, [prefixedKey, storedValue]);

    // Função setValue que aceita tanto valor direto quanto função de atualização
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
        } catch (error) {
            console.error("Error setting localStorage value:", error);
        }
    };

    return [storedValue, setValue];
}
