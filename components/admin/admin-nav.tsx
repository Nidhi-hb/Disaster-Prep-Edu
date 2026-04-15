"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, BookOpen, Zap, Settings, LogOut, GraduationCap } from "lucide-react"

const navItems = [
  { icon: BarChart3, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Students", href: "/admin/students" },
  { icon: BookOpen, label: "Modules", href: "/admin/modules" },
  { icon: Zap, label: "Drills", href: "/admin/drills" },
  { icon: GraduationCap, label: "Reports", href: "/admin/reports" },
]

const bottomItems = [
  { icon: Settings, label: "Settings", href: "/admin/settings" },
  { icon: LogOut, label: "Logout", href: "/logout" },
]

export default function AdminNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border min-h-screen p-6 flex flex-col">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">DP</span>
        </div>
        <span className="font-bold text-sidebar-foreground">Admin Panel</span>
      </Link>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="space-y-2 border-t border-sidebar-border pt-4">
        {bottomItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition"
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
