"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Lock, Star, Trophy, Flame, Target } from "lucide-react"

const badges = [
  {
    id: 1,
    name: "Quick Learner",
    description: "Complete 3 modules in one week",
    icon: "⚡",
    category: "Learning",
    rarity: "Common",
    earned: true,
    earnedDate: "Dec 15, 2025",
    progress: 100,
  },
  {
    id: 2,
    name: "Emergency Ready",
    description: "Complete your first emergency drill",
    icon: "🚨",
    category: "Drills",
    rarity: "Common",
    earned: true,
    earnedDate: "Dec 20, 2025",
    progress: 100,
  },
  {
    id: 3,
    name: "Knowledge Master",
    description: "Score 90%+ on 5 different quizzes",
    icon: "📚",
    category: "Learning",
    rarity: "Rare",
    earned: true,
    earnedDate: "Jan 2, 2026",
    progress: 100,
  },
  {
    id: 4,
    name: "Drill Warrior",
    description: "Complete 10 emergency drills",
    icon: "🔥",
    category: "Drills",
    rarity: "Rare",
    earned: false,
    progress: 70,
  },
  {
    id: 5,
    name: "Perfect Score",
    description: "Get 100% on any module quiz",
    icon: "💯",
    category: "Learning",
    rarity: "Epic",
    earned: false,
    progress: 60,
  },
  {
    id: 6,
    name: "Community Hero",
    description: "Help 10 classmates with learning",
    icon: "👥",
    category: "Community",
    rarity: "Rare",
    earned: false,
    progress: 40,
  },
  {
    id: 7,
    name: "Unstoppable",
    description: "Maintain a 14-day learning streak",
    icon: "🔥",
    category: "Streaks",
    rarity: "Epic",
    earned: false,
    progress: 85,
  },
  {
    id: 8,
    name: "Master Preparedness",
    description: "Complete all disaster preparedness modules",
    icon: "👑",
    category: "Learning",
    rarity: "Legendary",
    earned: false,
    progress: 75,
  },
  {
    id: 9,
    name: "Speed Demon",
    description: "Complete a module in under 20 minutes",
    icon: "⏱️",
    category: "Learning",
    rarity: "Common",
    earned: true,
    earnedDate: "Jan 3, 2026",
    progress: 100,
  },
  {
    id: 10,
    name: "Safety Champion",
    description: "Achieve 95%+ on 3 consecutive drills",
    icon: "🏆",
    category: "Drills",
    rarity: "Legendary",
    earned: false,
    progress: 50,
  },
  {
    id: 11,
    name: "Weekend Warrior",
    description: "Complete 5 modules on weekends",
    icon: "💪",
    category: "Learning",
    rarity: "Rare",
    earned: false,
    progress: 20,
  },
  {
    id: 12,
    name: "Guardian Angel",
    description: "Score highest in your class",
    icon: "😇",
    category: "Leaderboard",
    rarity: "Legendary",
    earned: false,
    progress: 10,
  },
]

const rarityColors = {
  Common: "from-slate-500 to-slate-600",
  Rare: "from-blue-600 to-blue-700",
  Epic: "from-purple-600 to-purple-700",
  Legendary: "from-yellow-500 to-orange-600",
}

export default function AchievementsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [filterCategory, setFilterCategory] = useState("All")

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

  const categories = ["All", "Learning", "Drills", "Community", "Streaks", "Leaderboard"]
  const filteredBadges = badges.filter((badge) => filterCategory === "All" || badge.category === filterCategory)
  const earnedCount = badges.filter((b) => b.earned).length
  const completionPercentage = Math.round((earnedCount / badges.length) * 100)

  return (
    <main className="min-h-screen bg-white">
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 p-8 bg-gradient-to-b from-white to-slate-50">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Achievements & Badges</h1>
            <p className="text-slate-600">Earn badges and unlock rewards as you complete learning activities</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-pink-50 border border-blue-200 rounded-lg p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-bold text-slate-900">Your Progress</h3>
                </div>
                <p className="text-4xl font-bold text-slate-900 mb-2">
                  {earnedCount}/{badges.length}
                </p>
                <p className="text-slate-600">badges earned</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-8 h-8 text-pink-600" />
                  <h3 className="text-xl font-bold text-slate-900">Completion</h3>
                </div>
                <p className="text-4xl font-bold text-slate-900 mb-2">{completionPercentage}%</p>
                <p className="text-slate-600">of all badges</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Flame className="w-8 h-8 text-orange-600" />
                  <h3 className="text-xl font-bold text-slate-900">Current Streak</h3>
                </div>
                <p className="text-4xl font-bold text-slate-900 mb-2">7</p>
                <p className="text-slate-600">days in a row</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-blue-200">
              <p className="text-sm text-slate-700 mb-3">Badge Completion Progress</p>
              <div className="w-full bg-slate-200 rounded-full h-4">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`whitespace-nowrap transition-all ${
                  filterCategory === category
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBadges.map((badge) => {
              const bgColor = rarityColors[badge.rarity as keyof typeof rarityColors]
              return (
                <div
                  key={badge.id}
                  className={`bg-gradient-to-br ${bgColor} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all relative overflow-hidden`}
                >
                  {/* Rarity Label */}
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white/20`}>{badge.rarity}</span>
                  </div>

                  {/* Badge Icon */}
                  <div className="mb-6 flex items-center justify-center relative">
                    {badge.earned ? (
                      <div className="relative">
                        <div className="text-6xl mb-2 relative">
                          <span className="absolute -top-2 -right-2 text-3xl">✨</span>
                          {badge.icon}
                        </div>
                        <div className="flex justify-center">
                          <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="text-6xl mb-2 opacity-40">{badge.icon}</div>
                        <div className="flex justify-center">
                          <Lock className="w-5 h-5 text-white/40" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Badge Info */}
                  <h3
                    className={`text-lg font-bold text-center mb-2 ${!badge.earned ? "text-white/80" : "text-white"}`}
                  >
                    {badge.name}
                  </h3>
                  <p className="text-sm text-white/90 text-center mb-4 min-h-10">{badge.description}</p>

                  {/* Category Badge */}
                  <div className="text-center mb-4">
                    <span className="text-xs px-2 py-1 bg-white/20 rounded-full text-white/90">{badge.category}</span>
                  </div>

                  {/* Progress or Earned Date */}
                  {badge.earned ? (
                    <p className="text-xs text-center text-white/80">Earned on {badge.earnedDate}</p>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-white/70 mb-1">
                        <span>Progress</span>
                        <span className="font-semibold">{badge.progress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="h-full rounded-full bg-white/50" style={{ width: `${badge.progress}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Leaderboard Section */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Global Leaderboard
            </h2>
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="p-4 text-left text-slate-700 font-semibold">Rank</th>
                      <th className="p-4 text-left text-slate-700 font-semibold">Student</th>
                      <th className="p-4 text-left text-slate-700 font-semibold">Points</th>
                      <th className="p-4 text-left text-slate-700 font-semibold">Badges</th>
                      <th className="p-4 text-left text-slate-700 font-semibold">Streak</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { rank: 1, name: "Sarah Khan", points: 5200, badges: 10, streak: 14, badge: "🥇" },
                      { rank: 2, name: "Raj Patel", points: 4950, badges: 9, streak: 12, badge: "🥈" },
                      { rank: 3, name: "Emma Wilson", points: 4750, badges: 8, streak: 11, badge: "🥉" },
                      { rank: 4, name: "You", points: 3450, badges: 4, streak: 7, badge: "#4" },
                      { rank: 5, name: "James Lee", points: 3200, badges: 4, streak: 5, badge: "#5" },
                    ].map((entry) => (
                      <tr
                        key={entry.rank}
                        className={`border-b border-slate-200 last:border-0 hover:bg-slate-50 transition ${
                          entry.rank === 4 ? "bg-blue-50" : ""
                        }`}
                      >
                        <td className="p-4">
                          <span className="text-xl">{entry.badge}</span>
                        </td>
                        <td className="p-4 font-semibold text-slate-900">{entry.name}</td>
                        <td className="p-4">
                          <span className="text-blue-600 font-bold">{entry.points}</span>
                        </td>
                        <td className="p-4 text-slate-700">{entry.badges} badges</td>
                        <td className="p-4 flex items-center gap-2 text-slate-700">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span>{entry.streak} days</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
