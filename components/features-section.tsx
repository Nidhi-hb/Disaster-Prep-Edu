import { Card } from "@/components/ui/card"
import { BookOpen, Zap, Users, BarChart3, AlertCircle, Trophy } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Interactive Learning Modules",
    description: "Engaging, region-specific disaster education content integrated into the curriculum",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Virtual Disaster Drills",
    description: "Conduct realistic emergency simulations and track participation across campus",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: AlertCircle,
    title: "Real-Time Alerts",
    description: "Instant location-specific emergency notifications and safety protocols",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Emergency Contacts",
    description: "Centralized directory with quick access to emergency responders and support",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description: "Earn badges, unlock achievements, and climb the preparedness leaderboard",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Admin Analytics",
    description: "Comprehensive dashboards for tracking preparedness scores and drill metrics",
    color: "from-indigo-500 to-blue-500",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Complete Preparedness Solution</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Everything you need to make your institution disaster-ready
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="bg-card border-border p-6 hover:border-primary/50 transition-colors group">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/60">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
