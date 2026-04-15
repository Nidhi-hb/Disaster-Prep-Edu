const stats = [
  { label: "Schools Connected", value: "500+" },
  { label: "Students Trained", value: "50K+" },
  { label: "Drills Conducted", value: "1.2K" },
  { label: "Lives Potentially Saved", value: "∞" },
]

export default function StatsSection() {
  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
