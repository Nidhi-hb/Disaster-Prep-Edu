"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"student" | "admin">("student")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email, userType }))
      router.push(userType === "admin" ? "/admin-dashboard" : "/dashboard")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent mb-2">
            DisasterPrep
          </h1>
          <p className="text-slate-600">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-8 mb-6">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* User Type Selection */}
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setUserType("student")}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  userType === "student"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setUserType("admin")}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  userType === "admin"
                    ? "bg-pink-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Admin
              </button>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-50 border-slate-300"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-50 border-slate-300"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full h-12 font-semibold text-white ${
                userType === "admin" ? "bg-pink-600 hover:bg-pink-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Sign In
            </Button>

            {/* Demo Info */}
            <div className="pt-4 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-600 mb-2">Demo credentials:</p>
              <p className="text-xs text-slate-500">
                Email: demo@disasterprep.com
                <br />
                Password: demo123
              </p>
            </div>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <button onClick={() => router.push("/")} className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Home
          </button>
        </div>
      </div>
    </main>
  )
}
