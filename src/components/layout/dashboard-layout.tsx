"use client"

import type React from "react"

import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
// "use client"

// import type React from "react"

// import { useRouter } from "next/navigation"
// import { useEffect } from "react"
// import { useAppSelector } from "@/redux/hooks"

// interface DashboardLayoutProps {
//   children: React.ReactNode
// }

// export function DashboardLayout({ children }: DashboardLayoutProps) {
//   const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
//   const router = useRouter()

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/auth/login")
//     }
//   }, [isAuthenticated, router])

//   if (!isAuthenticated) {
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="p-8">
//         <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//         {children}
//       </div>
//     </div>
//   )
// }
