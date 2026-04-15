"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
            DisasterPrep
          </h1>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => router.push("/login")}>
              Sign In
            </Button>
            <Button onClick={() => router.push("/login")} className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-slate-900">
            Prepare for Disasters
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
              Build Resilience
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Interactive disaster preparedness training designed for schools and colleges. Learn, practice, and earn
            achievements.
          </p>
          <Button
            size="lg"
            onClick={() => router.push("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
          >
            Start Learning
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              title: "Interactive Learning",
              desc: "Comprehensive disaster education modules",
              color: "from-blue-500 to-blue-600",
            },
            {
              title: "Virtual Drills",
              desc: "Practice emergency response scenarios",
              color: "from-purple-500 to-purple-600",
            },
            {
              title: "Gamification",
              desc: "Earn badges and track progress",
              color: "from-pink-500 to-pink-600",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${feature.color} text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow`}
            >
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/90">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-lg p-12 border border-slate-200">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">10K+</p>
              <p className="text-slate-600">Active Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">500+</p>
              <p className="text-slate-600">Drills Completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-pink-600">95%</p>
              <p className="text-slate-600">Completion Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-600">50+</p>
              <p className="text-slate-600">Schools Partnered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 DisasterPrep. Building disaster-resilient communities.</p>
        </div>
      </footer>
    </main>
  )
}
