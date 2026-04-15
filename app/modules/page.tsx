"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Clock, Users, BarChart2, ChevronRight } from "lucide-react"

const disasterTypes = {
  earthquake: { name: "Earthquake", color: "from-red-600 to-red-700", icon: "🏚️" },
  flood: { name: "Flood", color: "from-blue-600 to-blue-700", icon: "💧" },
  fire: { name: "Fire", color: "from-orange-600 to-orange-700", icon: "🔥" },
  cyclone: { name: "Cyclone", color: "from-purple-600 to-purple-700", icon: "🌪️" },
  landslide: { name: "Landslide", color: "from-green-600 to-green-700", icon: "⛰️" },
  medical: { name: "First Aid", color: "from-pink-600 to-pink-700", icon: "🏥" },
}

const modules = [
  {
    id: 1,
    title: "Earthquake Response",
    disaster: "earthquake",
    description: "Learn how to identify earthquake types, understand safety protocols, and respond during tremors.",
    region: "Seismic Zones",
    duration: "45 min",
    students: 1250,
    difficulty: "Intermediate",
    progress: 75,
    completed: false,
    lessons: 5,
    quizzes: 2,
  },
  {
    id: 2,
    title: "Flood Safety Protocol",
    disaster: "flood",
    description: "Comprehensive guide to flood awareness, evacuation procedures, and emergency response.",
    region: "Coastal & River Areas",
    duration: "50 min",
    students: 980,
    difficulty: "Beginner",
    progress: 40,
    completed: false,
    lessons: 4,
    quizzes: 2,
  },
  {
    id: 3,
    title: "Fire Emergency Management",
    disaster: "fire",
    description: "Master fire safety, evacuation routes, assembly points, and emergency response procedures.",
    region: "All Regions",
    duration: "40 min",
    students: 2100,
    difficulty: "Beginner",
    progress: 60,
    completed: false,
    lessons: 4,
    quizzes: 1,
  },
  {
    id: 4,
    title: "Cyclone Preparedness",
    disaster: "cyclone",
    description: "Understand cyclone warnings, shelter procedures, and safety measures during severe weather.",
    region: "Coastal Regions",
    duration: "55 min",
    students: 750,
    difficulty: "Advanced",
    progress: 0,
    completed: false,
    lessons: 6,
    quizzes: 3,
  },
  {
    id: 5,
    title: "Landslide Awareness",
    disaster: "landslide",
    description: "Learn about landslide risks, identification signs, and evacuation procedures.",
    region: "Hilly Regions",
    duration: "35 min",
    students: 620,
    difficulty: "Intermediate",
    progress: 0,
    completed: false,
    lessons: 3,
    quizzes: 1,
  },
  {
    id: 6,
    title: "First Aid Basics",
    disaster: "medical",
    description: "Essential medical response training including CPR, bandaging, and emergency care.",
    region: "All Regions",
    duration: "60 min",
    students: 1800,
    difficulty: "Beginner",
    progress: 30,
    completed: false,
    lessons: 5,
    quizzes: 2,
  },
]

export default function ModulesPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 p-8 bg-gradient-to-b from-white to-slate-50">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Learning Modules</h1>
            <p className="text-slate-600">Master disaster preparedness with comprehensive, interactive modules</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const disaster = disasterTypes[module.disaster as keyof typeof disasterTypes]
              return (
                <div
                  key={module.id}
                  className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer"
                  onClick={() => router.push(`/modules/${module.id}`)}
                >
                  <div className={`h-24 bg-gradient-to-br ${disaster.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                      <p className="text-5xl">{disaster.icon}</p>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                        {disaster.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{module.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{module.description}</p>

                    {/* Module Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm text-slate-700">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{module.duration}</span>
                        </div>
                        <span className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-medium text-xs">
                          {module.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users className="w-4 h-4" />
                        <span>{module.students.toLocaleString()} students enrolled</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <BarChart2 className="w-4 h-4" />
                        <span className="font-semibold text-blue-600">{module.region}</span>
                      </div>

                      <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-blue-50 px-2 py-1.5 rounded">
                          <p className="font-semibold text-blue-700">{module.lessons} Lessons</p>
                        </div>
                        <div className="bg-purple-50 px-2 py-1.5 rounded">
                          <p className="font-semibold text-purple-700">{module.quizzes} Quizzes</p>
                        </div>
                      </div>
                    </div>

                    {module.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-600">Progress</span>
                          <span className="text-xs font-semibold text-blue-600">{module.progress}% Complete</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${disaster.color}`}
                            style={{ width: `${module.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {module.progress === 100 && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-xs font-semibold text-green-700">✓ Completed</p>
                      </div>
                    )}

                    <Button
                      className={`w-full font-semibold flex items-center justify-center gap-2 ${
                        module.progress > 0
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-slate-900 hover:bg-black text-white"
                      }`}
                    >
                      {module.progress > 0 ? "Continue Learning" : "Start Module"}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
