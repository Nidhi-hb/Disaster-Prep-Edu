"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Zap, Users, BarChart3, Settings, LogOut, Trophy, TrendingUp } from "lucide-react"

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Learning Modules", href: "/modules" },
  { icon: Zap, label: "Virtual Drills", href: "/drills" },
  { icon: Users, label: "Emergency Contacts", href: "/contacts" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Trophy, label: "Achievements", href: "/achievements" },
  { icon: TrendingUp, label: "Progress", href: "/progress" },
]

export default function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => {
    return pathname === href
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen p-6 flex flex-col shadow-sm">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-pink-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">DP</span>
        </div>
        <span className="font-bold text-slate-900">DisasterPrep</span>
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
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="space-y-2 border-t border-slate-200 pt-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-100 transition"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-red-50 hover:text-red-600 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}
