import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 bg-background">
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/20 rounded-full border border-primary/40">
            <span className="text-sm font-semibold text-primary">Disaster Preparedness Platform</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
            Build a{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Disaster-Ready
            </span>{" "}
            Campus
          </h1>

          <p className="text-lg sm:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto text-balance">
            Interactive education, virtual drills, real-time alerts, and comprehensive preparedness training for
            students, staff, and administrators.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
              asChild
            >
              <a href="/dashboard">Explore Dashboard</a>
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg rounded-full border-foreground/20 hover:bg-foreground/5 bg-transparent"
              asChild
            >
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
