import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function CallToActionSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 border border-primary/40 p-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Make Your Campus Disaster-Ready?</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Join hundreds of educational institutions in creating a safer, more prepared community. Start your free
            trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
              asChild
            >
              <a href="/register">Start Free Trial</a>
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg rounded-lg border-foreground/20 hover:bg-foreground/5 bg-transparent"
              asChild
            >
              <a href="/contact">Schedule Demo</a>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
