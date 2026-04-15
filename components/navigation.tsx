"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DP</span>
            </div>
            <span className="text-xl font-bold text-foreground">DisasterPrep</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-foreground/70 hover:text-foreground transition">
              Features
            </Link>
            <Link href="#dashboard" className="text-foreground/70 hover:text-foreground transition">
              Dashboard
            </Link>
            <Link href="#drills" className="text-foreground/70 hover:text-foreground transition">
              Drills
            </Link>
            <Link href="#admin" className="text-foreground/70 hover:text-foreground transition">
              Admin
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
