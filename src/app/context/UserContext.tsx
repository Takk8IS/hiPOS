"use client"

import React, { createContext, useContext, useState, type ReactNode } from "react"

type UserContextType = {
  avatar: string
  username: string
  setAvatar: (avatar: string) => void
  setUsername: (username: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [avatar, setAvatar] = useState("/placeholder.svg")
  const [username, setUsername] = useState("User")

  return <UserContext.Provider value={{ avatar, username, setAvatar, setUsername }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

