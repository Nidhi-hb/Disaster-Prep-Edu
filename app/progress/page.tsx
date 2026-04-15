"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import { Button } from "@/components/ui/button"
import { TrendingUp, Clock, CheckCircle2, Activity } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const weeklyActivity = [
  { day: "Mon", modules: 2, drills: 1, points: 320 },
  { day: "Tue", modules: 1, drills: 0, points: 180 },
  { day: "Wed", modules: 3, drills: 1, points: 540 },
  { day: "Thu", modules: 2, drills: 0, points: 360 },
  { day: "Fri", modules: 1, drills: 2, points: 410 },
  { day: "Sat", modules: 2, drills: 1, points: 380 },
  { day: "Sun", modules: 2, drills: 0, points: 280 },
]

const pointsHistory = [
  { date: "Dec 1", points: 1200 },
  { date: "Dec 8", points: 1850 },
  { date: "Dec 15", points: 2650 },
  { date: "Dec 22", points: 3450 },
  { date: "Dec 29", points: 2950 },
  { date: "Jan 5", points: 3850 },
  { date: "Jan 12", points: 4450 },
]

const moduleProgress = [
  { name: "Earthquake Response", progress: 75, sessions: 5, avgScore: 82, drillsCompleted: 2 },
  { name: "Flood Safety", progress: 40, sessions: 2, avgScore: 78, drillsCompleted: 1 },
  { name: "Fire Management", progress: 60, sessions: 4, avgScore: 85, drillsCompleted: 1 },
  { name: "First Aid Basics", progress: 30, sessions: 1, avgScore: 88, drillsCompleted: 0 },
  { name: "Cyclone Prep", progress: 0, sessions: 0, avgScore: null, drillsCompleted: 0 },
  { name: "Landslide Awareness", progress: 15, sessions: 1, avgScore: 75, drillsCompleted: 0 },
]

const drillsProgress = [
  { name: "Earthquake", value: 2, color: "#DC2626" },
  { name: "Fire", value: 1, color: "#EA580C" },
  { name: "Flood", value: 1, color: "#2563EB" },
  { name: "Medical", value: 0, color: "#16A34A" },
  { name: "Cyclone", value: 0, color: "#7C3AED" },
]

export default function ProgressPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [timeRange, setTimeRange] = useState("week")

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

  const totalPoints = pointsHistory[pointsHistory.length - 1].points
  const completedModules = moduleProgress.filter((m) => m.progress === 100).length
  const totalDrillsCompleted = drillsProgress.reduce((sum, d) => sum + d.value, 0)
  const avgScore = Math.round(
    moduleProgress.filter((m) => m.avgScore).reduce((sum, m) => sum + (m.avgScore || 0), 0) /
      moduleProgress.filter((m) => m.avgScore).length,
  )

  return (
    <main className="min-h-screen bg-white">
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 p-8 bg-gradient-to-b from-white to-slate-50">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Your Progress</h1>
              <p className="text-slate-600">Track your learning journey and achievements</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setTimeRange("week")}
                className={`${timeRange === "week" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"}`}
              >
                Week
              </Button>
              <Button
                onClick={() => setTimeRange("month")}
                className={`${timeRange === "month" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"}`}
              >
                Month
              </Button>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-white/20">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-green-200">+15%</span>
              </div>
              <p className="text-blue-100 text-sm mb-1">Total Points</p>
              <p className="text-3xl font-bold">{totalPoints.toLocaleString()}</p>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-white/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-green-200">+1</span>
              </div>
              <p className="text-green-100 text-sm mb-1">Modules Completed</p>
              <p className="text-3xl font-bold">{completedModules} of 6</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-white/20">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-green-200">+2</span>
              </div>
              <p className="text-purple-100 text-sm mb-1">Drills Completed</p>
              <p className="text-3xl font-bold">{totalDrillsCompleted}</p>
            </div>

            <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-white/20">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-orange-100">Avg</span>
              </div>
              <p className="text-orange-100 text-sm mb-1">Average Score</p>
              <p className="text-3xl font-bold">{avgScore}%</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Weekly Activity */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="day" stroke="rgba(0,0,0,0.5)" />
                  <YAxis stroke="rgba(0,0,0,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.95)",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="modules" fill="#2563EB" name="Modules" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="drills" fill="#DC2626" name="Drills" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Points Trend */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Points Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={pointsHistory}>
                  <defs>
                    <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(0,0,0,0.5)" />
                  <YAxis stroke="rgba(0,0,0,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.95)",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Area type="monotone" dataKey="points" stroke="#2563EB" fillOpacity={1} fill="url(#colorPoints)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Drills Completion Pie Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm lg:col-span-1">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Drills Completed</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={drillsProgress}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {drillsProgress.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Module Progress */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm lg:col-span-2">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Module Progress</h3>
              <div className="space-y-6">
                {moduleProgress.map((module, index) => (
                  <div key={index} className="pb-6 border-b border-slate-200 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-slate-900">{module.name}</h4>
                      <span className="text-sm font-bold text-blue-600">{module.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 mb-3">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-pink-600"
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-700">
                      <div className="flex gap-4">
                        <span>{module.sessions} lessons</span>
                        <span>Drills: {module.drillsCompleted}</span>
                        <span>{module.avgScore ? `Score: ${module.avgScore}%` : "Not started"}</span>
                      </div>
                      <Button className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white">
                        {module.progress === 100 ? "Completed" : "Continue"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
