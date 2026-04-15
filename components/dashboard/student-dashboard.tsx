"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Zap, Trophy, MapPin, Clock } from "lucide-react"

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="p-8 bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome, Alex!</h1>
        <p className="text-slate-600">Let's build your disaster preparedness skills today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Learning Points</p>
              <p className="text-3xl font-bold">2,450</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Drills Completed</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <Zap className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-600 to-pink-700 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm mb-1">Badges Earned</p>
              <p className="text-3xl font-bold">8</p>
            </div>
            <Trophy className="w-8 h-8 text-pink-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm mb-1">Preparedness Score</p>
              <p className="text-3xl font-bold">85%</p>
            </div>
            <MapPin className="w-8 h-8 text-indigo-200" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-4 px-2 font-semibold transition ${activeTab === "overview" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-600"}`}
        >
          Active Modules
        </button>
        <button
          onClick={() => setActiveTab("drills")}
          className={`pb-4 px-2 font-semibold transition ${activeTab === "drills" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-600"}`}
        >
          Upcoming Drills
        </button>
        <button
          onClick={() => setActiveTab("achievements")}
          className={`pb-4 px-2 font-semibold transition ${activeTab === "achievements" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-600"}`}
        >
          Achievements
        </button>
      </div>

      {/* Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Continue Learning</h2>
            <div className="space-y-4">
              {[
                { title: "Earthquake Response", progress: 75, color: "from-red-600 to-red-700" },
                { title: "Flood Safety Protocol", progress: 40, color: "from-blue-600 to-blue-700" },
                { title: "Fire Emergency Management", progress: 60, color: "from-orange-600 to-orange-700" },
              ].map((module, index) => (
                <Card key={index} className="bg-white border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">{module.title}</h3>
                    <span className="text-sm text-slate-600">{module.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${module.color}`}
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Continue Module</Button>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Leaderboard</h2>
            <Card className="bg-gradient-to-br from-indigo-50 to-pink-50 border-slate-200 p-4 shadow-sm">
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Sarah Khan", points: 3200, badge: "🥇" },
                  { rank: 2, name: "Raj Patel", points: 2950, badge: "🥈" },
                  { rank: 3, name: "Emma Wilson", points: 2750, badge: "🥉" },
                  { rank: 4, name: "You", points: 2450, badge: "#4" },
                  { rank: 5, name: "James Lee", points: 2100, badge: "#5" },
                ].map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center justify-between p-2 rounded ${entry.rank === 4 ? "bg-blue-100 border border-blue-300" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{entry.badge}</span>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{entry.name}</p>
                      </div>
                    </div>
                    <span className="font-bold text-blue-600">{entry.points}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "drills" && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Upcoming Emergency Drills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                type: "Earthquake",
                date: "Jan 15, 2026",
                time: "2:00 PM",
                icon: "📍",
                color: "from-red-600 to-red-700",
              },
              {
                type: "Fire Evacuation",
                date: "Jan 18, 2026",
                time: "3:30 PM",
                icon: "🔥",
                color: "from-orange-600 to-orange-700",
              },
              {
                type: "Flood Response",
                date: "Jan 22, 2026",
                time: "10:00 AM",
                icon: "💧",
                color: "from-blue-600 to-blue-700",
              },
              {
                type: "Medical Emergency",
                date: "Jan 25, 2026",
                time: "1:00 PM",
                icon: "🏥",
                color: "from-green-600 to-green-700",
              },
            ].map((drill, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${drill.color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-3xl mb-2">{drill.icon}</p>
                    <h3 className="text-xl font-bold">{drill.type}</h3>
                  </div>
                  <span className="text-xs px-3 py-1 bg-white/20 rounded-full">Upcoming</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 mb-4">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {drill.date} at {drill.time}
                  </span>
                </div>
                <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-semibold">
                  Mark as Attending
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "achievements" && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "🎯", title: "Quick Learner", desc: "Complete 3 modules" },
              { emoji: "🏃", title: "Emergency Ready", desc: "Complete your first drill" },
              { emoji: "📚", title: "Knowledge Master", desc: "Score 90%+ on 5 quizzes" },
              { emoji: "👥", title: "Community Hero", desc: "Help 10 students" },
              { emoji: "🔥", title: "Drill Warrior", desc: "Complete 10 drills" },
              { emoji: "🌟", title: "Excellence", desc: "Reach 2500 points" },
              { emoji: "💪", title: "Unstoppable", desc: "Maintain 7-day streak" },
              { emoji: "🎖️", title: "Master", desc: "Complete all modules" },
            ].map((achievement, index) => (
              <div
                key={index}
                className="bg-white border-2 border-slate-200 p-4 rounded-lg text-center hover:border-blue-400 hover:shadow-md transition-all"
              >
                <p className="text-4xl mb-2">{achievement.emoji}</p>
                <h3 className="font-semibold text-slate-900 mb-1">{achievement.title}</h3>
                <p className="text-xs text-slate-600">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
