"use client"

import Navigation from "@/components/navigation"
import AdminNav from "@/components/admin/admin-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Zap, Activity, AlertCircle, Download } from "lucide-react"
import {
  LineChart,
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
} from "recharts"

const overviewStats = [
  { label: "Total Students", value: "2,450", change: "+12%", icon: Users, color: "from-blue-500 to-cyan-500" },
  { label: "Module Completion", value: "78%", change: "+5%", icon: BookOpen, color: "from-green-500 to-emerald-500" },
  { label: "Drills Completed", value: "156", change: "+24%", icon: Zap, color: "from-orange-500 to-yellow-500" },
  { label: "Avg Preparedness", value: "82%", change: "+3%", icon: Activity, color: "from-purple-500 to-pink-500" },
]

const enrollmentData = [
  { month: "Jan", students: 1200, completion: 65 },
  { month: "Feb", students: 1450, completion: 70 },
  { month: "Mar", students: 1680, completion: 74 },
  { month: "Apr", students: 1890, completion: 76 },
  { month: "May", students: 2100, completion: 79 },
  { month: "Jun", students: 2450, completion: 82 },
]

const drillParticipation = [
  { name: "Earthquake", value: 450, color: "#FF6B6B" },
  { name: "Fire", value: 420, color: "#FFA500" },
  { name: "Flood", value: 380, color: "#4ECDC4" },
  { name: "Medical", value: 320, color: "#95E1D3" },
  { name: "Cyclone", value: 280, color: "#A8D8EA" },
]

const topPerformingModules = [
  { name: "Fire Emergency", students: 2100, avgScore: 88 },
  { name: "First Aid Basics", students: 1800, avgScore: 85 },
  { name: "Earthquake Response", students: 1250, avgScore: 82 },
  { name: "Flood Safety", students: 980, avgScore: 79 },
]

const recentActivities = [
  { type: "drill", title: "Earthquake Drill Completed", description: "450 students participated", time: "2 hours ago" },
  { type: "module", title: "New Module Published", description: "Cyclone Preparedness Module", time: "5 hours ago" },
  { type: "achievement", title: "Milestone Reached", description: "50,000 total learning points", time: "1 day ago" },
  { type: "drill", title: "Fire Drill Scheduled", description: "Scheduled for Jan 18, 2026", time: "2 days ago" },
]

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <AdminNav />
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-foreground/70">School-wide disaster preparedness metrics and insights</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {overviewStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="bg-card border-border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-green-400">{stat.change}</span>
                  </div>
                  <p className="text-foreground/70 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </Card>
              )
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Enrollment Trend */}
            <Card className="bg-card border-border p-6 lg:col-span-2">
              <h3 className="text-xl font-bold text-foreground mb-4">Enrollment & Completion Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(20,20,20,0.8)", border: "1px solid rgba(255,255,255,0.2)" }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="students" stroke="#4ECDC4" strokeWidth={2} name="Enrolled Students" />
                  <Line type="monotone" dataKey="completion" stroke="#FF6B6B" strokeWidth={2} name="Completion %" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Drill Participation */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Drill Participation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={drillParticipation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
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
            </Card>
          </div>

          {/* Module Performance & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Modules */}
            <Card className="bg-card border-border p-6 lg:col-span-2">
              <h3 className="text-xl font-bold text-foreground mb-4">Top Performing Modules</h3>
              <div className="space-y-4">
                {topPerformingModules.map((module, index) => (
                  <div key={index} className="flex items-center gap-4 pb-4 border-b border-border last:border-0">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{module.name}</h4>
                      <p className="text-sm text-foreground/60">{module.students.toLocaleString()} students enrolled</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{module.avgScore}%</p>
                      <p className="text-xs text-foreground/60">Avg Score</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="pb-4 border-b border-border last:border-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg flex-shrink-0">
                        {activity.type === "drill" && "🔥"}
                        {activity.type === "module" && "📚"}
                        {activity.type === "achievement" && "🏆"}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm">{activity.title}</h4>
                        <p className="text-xs text-foreground/60 mt-1">{activity.description}</p>
                        <p className="text-xs text-foreground/40 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Alert Box */}
          <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 p-6 mt-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-foreground mb-2">Action Required</h3>
                <p className="text-foreground/70 text-sm mb-4">
                  15 students have not completed their initial safety training. Consider sending them a reminder
                  notification.
                </p>
                <Button className="text-sm bg-yellow-500/20 hover:bg-yellow-500/30 text-foreground border border-yellow-500/30">
                  Send Notification
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
