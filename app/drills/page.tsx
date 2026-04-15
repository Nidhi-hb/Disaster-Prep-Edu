"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Users, AlertCircle, CheckCircle, Zap, TrendingUp, ChevronRight } from "lucide-react"

const drills = [
  {
    id: 1,
    type: "Earthquake Evacuation",
    icon: "📍",
    status: "Scheduled",
    date: "January 15, 2026",
    time: "2:00 PM - 2:30 PM",
    participants: 450,
    color: "from-red-600 to-red-700",
    description: "Practice earthquake evacuation procedures with real-time participant tracking.",
  },
  {
    id: 2,
    type: "Fire Emergency Drill",
    icon: "🔥",
    status: "Scheduled",
    date: "January 18, 2026",
    time: "3:30 PM - 4:00 PM",
    participants: 420,
    color: "from-orange-600 to-orange-700",
    description: "Participate in a fire evacuation simulation with assembly point verification.",
  },
  {
    id: 3,
    type: "Flood Response Simulation",
    icon: "💧",
    status: "Completed",
    date: "January 8, 2026",
    time: "10:00 AM - 10:45 AM",
    participants: 480,
    color: "from-blue-600 to-blue-700",
    description: "Completed flood response drill with 92% completion rate.",
  },
  {
    id: 4,
    type: "Medical Emergency Response",
    icon: "🏥",
    status: "Scheduled",
    date: "January 22, 2026",
    time: "1:00 PM - 1:45 PM",
    participants: 350,
    color: "from-green-600 to-green-700",
    description: "Practice emergency medical response and first aid procedures.",
  },
  {
    id: 5,
    type: "Cyclone Warning Response",
    icon: "🌪️",
    status: "Scheduled",
    date: "January 25, 2026",
    time: "11:00 AM - 11:30 AM",
    participants: 280,
    color: "from-purple-600 to-purple-700",
    description: "Understand cyclone warnings and shelter procedures during severe weather.",
  },
  {
    id: 6,
    type: "Campus Lockdown Procedure",
    icon: "🔒",
    status: "Completed",
    date: "January 5, 2026",
    time: "2:00 PM - 2:30 PM",
    participants: 490,
    color: "from-indigo-600 to-indigo-700",
    description: "Completed campus lockdown procedure drill with all safety measures verified.",
  },
]

export default function DrillsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [registeredDrills, setRegisteredDrills] = useState<number[]>([])

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
      const stored = localStorage.getItem("registeredDrills")
      if (stored) setRegisteredDrills(JSON.parse(stored))
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  const drillsWithStatus = drills.map((drill) => ({
    ...drill,
    liveParticipants:
      drill.status === "Scheduled" ? Math.floor(Math.random() * drill.participants) : drill.participants,
    completionRate: drill.status === "Completed" ? Math.floor(Math.random() * 40 + 70) : 0,
  }))

  const upcomingDrills = drillsWithStatus.filter((d) => d.status === "Scheduled")

  const handleRegister = (drillId: number) => {
    if (!registeredDrills.includes(drillId)) {
      const updated = [...registeredDrills, drillId]
      setRegisteredDrills(updated)
      localStorage.setItem("registeredDrills", JSON.stringify(updated))
    }
  }

  const handleViewDrill = (drillId: number) => {
    router.push(`/drills/${drillId}`)
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 p-8 bg-gradient-to-b from-white to-slate-50">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Virtual Disaster Drills</h1>
            <p className="text-slate-600">Participate in realistic emergency simulations with real-time tracking</p>
          </div>

          {/* Upcoming Drills Alert */}
          {upcomingDrills.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Upcoming Drills</h3>
                  <p className="text-slate-700 text-sm mb-4">
                    {upcomingDrills.length} drill{upcomingDrills.length > 1 ? "s" : ""} scheduled. Register now to
                    participate!
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {drillsWithStatus.map((drill) => (
              <div
                key={drill.id}
                className={`bg-white border-l-4 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all`}
                style={{
                  borderLeftColor: drill.color.startsWith("from-red")
                    ? "rgb(220, 38, 38)"
                    : drill.color.startsWith("from-orange")
                      ? "rgb(234, 88, 12)"
                      : drill.color.startsWith("from-blue")
                        ? "rgb(37, 99, 235)"
                        : drill.color.startsWith("from-green")
                          ? "rgb(22, 163, 74)"
                          : drill.color.startsWith("from-purple")
                            ? "rgb(124, 58, 237)"
                            : "rgb(67, 56, 202)",
                }}
              >
                <div className={`bg-gradient-to-r ${drill.color} text-white p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <p className="text-5xl">{drill.icon}</p>
                      <div>
                        <h3 className="text-2xl font-bold">{drill.type}</h3>
                        <p className="text-white/80 mt-1">
                          {drill.status === "Completed" ? "Completed on" : "Scheduled for"} {drill.date}
                        </p>
                        <p className="text-white/80 text-sm mt-1">{drill.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        {drill.status === "Completed" ? (
                          <CheckCircle className="w-5 h-5 text-green-300" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-300" />
                        )}
                        <span className="text-sm font-bold">{drill.status === "Completed" ? "COMPLETED" : "LIVE"}</span>
                      </div>
                      {drill.status === "Scheduled" && (
                        <p className="text-sm">
                          {drill.liveParticipants}/{drill.participants} participants
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-600 mb-1">Time</p>
                      <p className="font-bold text-slate-900">{drill.time}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-xs text-slate-600 mb-1">Participants</p>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <p className="font-bold text-slate-900">
                          {drill.status === "Completed" ? drill.participants : drill.liveParticipants}/
                          {drill.participants}
                        </p>
                      </div>
                    </div>
                    {drill.status === "Completed" && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-xs text-slate-600 mb-1">Completion Rate</p>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <p className="font-bold text-green-700">{drill.completionRate}%</p>
                        </div>
                      </div>
                    )}
                    {drill.status === "Scheduled" && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-xs text-slate-600 mb-1">Status</p>
                        <p className="font-bold text-blue-700">Live in {Math.floor(Math.random() * 24)} hrs</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {drill.status === "Scheduled" ? (
                      <>
                        <Button
                          onClick={() => handleRegister(drill.id)}
                          className={`flex-1 font-semibold flex items-center justify-center gap-2 ${
                            registeredDrills.includes(drill.id)
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          {registeredDrills.includes(drill.id) ? "✓ Registered" : "Register Now"}
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleViewDrill(drill.id)}
                          variant="outline"
                          className="flex-1 text-slate-700 hover:bg-slate-50"
                        >
                          View Details
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => handleViewDrill(drill.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                      >
                        View Results
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
