"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Zap, Activity, AlertCircle, Download, TrendingUp } from "lucide-react"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts"

const overviewStats = [
  { label: "Total Students", value: 2450, change: "+12%", icon: Users, color: "from-blue-600 to-blue-700" },
  {
    label: "Module Completion",
    value: 78,
    change: "+5%",
    icon: BookOpen,
    color: "from-green-600 to-green-700",
    suffix: "%",
  },
  { label: "Drills Completed", value: 156, change: "+24%", icon: Zap, color: "from-orange-600 to-orange-700" },
  {
    label: "Avg Preparedness",
    value: 82,
    change: "+3%",
    icon: Activity,
    color: "from-purple-600 to-purple-700",
    suffix: "%",
  },
]

const enrollmentData = [
  { month: "Jan", students: 1200, completion: 65, drills: 20 },
  { month: "Feb", students: 1450, completion: 70, drills: 28 },
  { month: "Mar", students: 1680, completion: 74, drills: 35 },
  { month: "Apr", students: 1890, completion: 76, drills: 42 },
  { month: "May", students: 2100, completion: 79, drills: 50 },
  { month: "Jun", students: 2450, completion: 82, drills: 65 },
]

const drillParticipation = [
  { name: "Earthquake", value: 450, color: "#DC2626" },
  { name: "Fire", value: 420, color: "#EA580C" },
  { name: "Flood", value: 380, color: "#2563EB" },
  { name: "Medical", value: 320, color: "#16A34A" },
  { name: "Cyclone", value: 280, color: "#7C3AED" },
]

const moduleData = [
  { name: "Fire Emergency", students: 2100, avgScore: 88, completion: 85 },
  { name: "First Aid Basics", students: 1800, avgScore: 85, completion: 80 },
  { name: "Earthquake Response", students: 1250, avgScore: 82, completion: 75 },
  { name: "Flood Safety", students: 980, avgScore: 79, completion: 70 },
  { name: "Cyclone Prep", students: 750, avgScore: 76, completion: 65 },
  { name: "Landslide Awareness", students: 620, avgScore: 74, completion: 60 },
]

const recentActivities = [
  { type: "drill", title: "Earthquake Drill Completed", description: "450 students participated", time: "2 hours ago" },
  { type: "module", title: "New Module Published", description: "Cyclone Preparedness Module", time: "5 hours ago" },
  { type: "achievement", title: "Milestone Reached", description: "50,000 total learning points", time: "1 day ago" },
  { type: "drill", title: "Fire Drill Scheduled", description: "Scheduled for Jan 18, 2026", time: "2 days ago" },
]

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState(overviewStats)

  useEffect(() => {
    const user = localStorage.getItem("user")
    const parsedUser = user ? JSON.parse(user) : null
    if (!parsedUser || parsedUser.userType !== "admin") {
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
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
              <p className="text-slate-600">Real-time disaster preparedness analytics and insights</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Live Indicators */}
          <div className="mb-8 flex gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700">Live Data • Updated now</span>
            </div>
          </div>

          {/* Overview Stats with Real-time Updates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 transition-all">
                    {stat.value.toLocaleString()}
                    {(stat as any).suffix && <span className="text-lg ml-1">{(stat as any).suffix}</span>}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Enrollment Trend - Large Chart */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">Enrollment & Metrics Trend</h3>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  Last 6 Months
                </span>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={enrollmentData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(0,0,0,0.5)" />
                  <YAxis stroke="rgba(0,0,0,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.95)",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="#2563EB"
                    fill="url(#colorStudents)"
                    name="Enrolled Students"
                  />
                  <Line type="monotone" dataKey="completion" stroke="#DC2626" strokeWidth={2} name="Completion %" />
                  <Line type="monotone" dataKey="drills" stroke="#16A34A" strokeWidth={2} name="Drills Completed" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Drill Participation Pie */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Drill Participation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={drillParticipation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}`}
                    outerRadius={85}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {drillParticipation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Module Performance Chart */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Module Performance Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={moduleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="name" stroke="rgba(0,0,0,0.5)" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="rgba(0,0,0,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="students" fill="#2563EB" name="Students Enrolled" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avgScore" fill="#16A34A" name="Avg Score %" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completion" fill="#EA580C" name="Completion %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Modules & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Top Performing Modules */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm lg:col-span-2">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Top Performing Modules</h3>
              <div className="space-y-4">
                {moduleData.map((module, index) => (
                  <div key={index} className="flex items-center gap-4 pb-4 border-b border-slate-200 last:border-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">{module.name}</h4>
                      <p className="text-sm text-slate-600">{module.students.toLocaleString()} students</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-xl font-bold text-blue-600">{module.avgScore}%</p>
                      <p className="text-xs text-slate-600">Avg Score</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="pb-4 border-b border-slate-200 last:border-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg flex-shrink-0">
                        {activity.type === "drill" && "🔥"}
                        {activity.type === "module" && "📚"}
                        {activity.type === "achievement" && "🏆"}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 text-sm">{activity.title}</h4>
                        <p className="text-xs text-slate-600 mt-1">{activity.description}</p>
                        <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Alert */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Action Required</h3>
                <p className="text-slate-700 text-sm mb-4">
                  15 students have not completed their initial safety training. Consider sending them a reminder
                  notification.
                </p>
                <Button className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white">Send Notification</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
