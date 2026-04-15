"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Users, Clock, CheckCircle } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const drillsData: Record<number, any> = {
  1: {
    title: "Earthquake Evacuation",
    date: "January 15, 2026",
    time: "2:00 PM - 2:30 PM",
    totalCapacity: 450,
    status: "Scheduled",
    description: "Practice earthquake evacuation procedures with real-time participant tracking.",
    objectives: [
      "Evacuate to designated assembly point within 5 minutes",
      "Account for all participants",
      "Practice communication procedures",
      "Verify safe routes are clear",
    ],
    liveStats: [
      { time: "2:00 PM", registered: 120, active: 45 },
      { time: "2:05 PM", registered: 280, active: 200 },
      { time: "2:10 PM", registered: 380, active: 350 },
      { time: "2:15 PM", registered: 420, active: 410 },
      { time: "2:20 PM", registered: 440, active: 430 },
      { time: "2:25 PM", registered: 450, active: 450 },
    ],
  },
  2: {
    title: "Fire Emergency Drill",
    date: "January 18, 2026",
    time: "3:30 PM - 4:00 PM",
    totalCapacity: 420,
    status: "Scheduled",
    description: "Participate in a fire evacuation simulation with assembly point verification.",
    objectives: [
      "Evacuate via designated fire exits",
      "Report to assembly point",
      "Practice proper fire extinguisher use",
      "Verify all occupants accounted for",
    ],
    liveStats: [
      { time: "3:30 PM", registered: 100, active: 40 },
      { time: "3:35 PM", registered: 250, active: 180 },
      { time: "3:40 PM", registered: 350, active: 320 },
      { time: "3:45 PM", registered: 400, active: 395 },
      { time: "3:50 PM", registered: 410, active: 410 },
      { time: "3:55 PM", registered: 420, active: 420 },
    ],
  },
  3: {
    title: "Flood Response Simulation",
    date: "January 8, 2026",
    time: "10:00 AM - 10:45 AM",
    totalCapacity: 480,
    status: "Completed",
    description: "Completed flood response drill with 92% completion rate.",
    objectives: [
      "Respond to flood warnings",
      "Evacuate to higher ground",
      "Practice resource allocation",
      "Document damages",
    ],
    liveStats: [
      { time: "10:00 AM", registered: 150, active: 80 },
      { time: "10:10 AM", registered: 320, active: 290 },
      { time: "10:20 AM", registered: 430, active: 415 },
      { time: "10:30 AM", registered: 470, active: 460 },
      { time: "10:40 AM", registered: 480, active: 480 },
    ],
  },
  4: {
    title: "Medical Emergency Response",
    date: "January 22, 2026",
    time: "1:00 PM - 1:45 PM",
    totalCapacity: 350,
    status: "Scheduled",
    description: "Practice emergency medical response and first aid procedures.",
    objectives: [
      "Identify casualties",
      "Provide first aid",
      "Coordinate with emergency services",
      "Practice triage procedures",
    ],
    liveStats: [
      { time: "1:00 PM", registered: 80, active: 30 },
      { time: "1:10 PM", registered: 180, active: 140 },
      { time: "1:20 PM", registered: 280, active: 260 },
      { time: "1:30 PM", registered: 320, active: 310 },
      { time: "1:40 PM", registered: 350, active: 350 },
    ],
  },
  5: {
    title: "Cyclone Warning Response",
    date: "January 25, 2026",
    time: "11:00 AM - 11:30 AM",
    totalCapacity: 280,
    status: "Scheduled",
    description: "Understand cyclone warnings and shelter procedures during severe weather.",
    objectives: [
      "Respond to cyclone warnings",
      "Secure property",
      "Move to designated shelter",
      "Communicate status updates",
    ],
    liveStats: [
      { time: "11:00 AM", registered: 60, active: 25 },
      { time: "11:05 AM", registered: 140, active: 110 },
      { time: "11:10 AM", registered: 210, active: 195 },
      { time: "11:15 AM", registered: 260, active: 255 },
      { time: "11:20 AM", registered: 275, active: 275 },
    ],
  },
  6: {
    title: "Campus Lockdown Procedure",
    date: "January 5, 2026",
    time: "2:00 PM - 2:30 PM",
    totalCapacity: 490,
    status: "Completed",
    description: "Completed campus lockdown procedure drill with all safety measures verified.",
    objectives: [
      "Respond to lockdown alert",
      "Secure designated areas",
      "Practice silent communication",
      "Verify all personnel accounted for",
    ],
    liveStats: [
      { time: "2:00 PM", registered: 200, active: 120 },
      { time: "2:05 PM", registered: 350, active: 320 },
      { time: "2:10 PM", registered: 450, active: 440 },
      { time: "2:15 PM", registered: 480, active: 480 },
      { time: "2:20 PM", registered: 490, active: 490 },
    ],
  },
}

export default function DrillDetailPage() {
  const router = useRouter()
  const params = useParams()
  const drillId = Number.parseInt(params.id as string)
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

  const drill = drillsData[drillId]
  if (!drill) {
    return <div>Drill not found</div>
  }

  const currentStats = drill.liveStats[drill.liveStats.length - 1]

  return (
    <main className="min-h-screen bg-white">
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 p-8 bg-gradient-to-b from-white to-slate-50">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4 text-slate-700 hover:text-slate-900">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Drills
          </Button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{drill.title}</h1>
            <p className="text-slate-600">{drill.description}</p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-6 h-6" />
                <span className="text-sm font-semibold text-blue-100">Live</span>
              </div>
              <p className="text-3xl font-bold">{currentStats.active}</p>
              <p className="text-blue-100 text-sm">of {drill.totalCapacity} participants</p>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-6 h-6" />
                <span className="text-sm font-semibold text-green-100">Registered</span>
              </div>
              <p className="text-3xl font-bold">{currentStats.registered}</p>
              <p className="text-green-100 text-sm">
                {Math.round((currentStats.registered / drill.totalCapacity) * 100)}% registered
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-6 h-6" />
                <span className="text-sm font-semibold text-purple-100">Status</span>
              </div>
              <p className="text-3xl font-bold">{drill.status}</p>
              <p className="text-purple-100 text-sm">{drill.date}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Participation Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={drill.liveStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="time" stroke="rgba(0,0,0,0.5)" />
                  <YAxis stroke="rgba(0,0,0,0.5)" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "1px solid #e2e8f0" }} />
                  <Legend />
                  <Line type="monotone" dataKey="registered" stroke="#2563EB" strokeWidth={2} name="Registered" />
                  <Line type="monotone" dataKey="active" stroke="#16A34A" strokeWidth={2} name="Active" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Registration Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={drill.liveStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="time" stroke="rgba(0,0,0,0.5)" />
                  <YAxis stroke="rgba(0,0,0,0.5)" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "1px solid #e2e8f0" }} />
                  <Legend />
                  <Bar dataKey="registered" fill="#2563EB" name="Registered" />
                  <Bar dataKey="active" fill="#16A34A" name="Active" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Objectives */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Drill Objectives</h3>
            <div className="space-y-4">
              {drill.objectives.map((objective: string, index: number) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-slate-200 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-slate-700 pt-1">{objective}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6">
              Register for Drill
            </Button>
            <Button variant="outline" className="flex-1 text-slate-700 hover:bg-slate-50 py-6 bg-transparent">
              Download Materials
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
