export default function Features() {
  const features = [
    {
      icon: "📚",
      title: "Comprehensive Resources",
      description: "Complete study materials, notes, and resources curated by experienced engineers",
    },
    {
      icon: "🎥",
      title: "Video Tutorials",
      description: "High-quality YouTube tutorials and explanations for every topic",
    },
    {
      icon: "📝",
      title: "PDF Notes",
      description: "Well-organized PDF notes and study guides for quick reference",
    },
    {
      icon: "🔗",
      title: "External Links",
      description: "Curated links to additional resources and documentation",
    },
  ]

  return (
    <section className="py-20 bg-card/50 border-y border-border">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose BTech Hub?</h2>
          <p className="text-xl text-muted-foreground">Everything you need to master your BTech subjects</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
