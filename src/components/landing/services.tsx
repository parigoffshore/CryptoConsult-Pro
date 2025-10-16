import { Briefcase, PieChart, Globe, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Briefcase,
    title: "Consulting Stratégique",
    description: "Stratégies personnalisées pour naviguer dans le marché crypto volatil.",
  },
  {
    icon: PieChart,
    title: "Analyse de Portefeuille",
    description: "Optimisation de votre portefeuille crypto pour maximiser les retours.",
  },
  {
    icon: Globe,
    title: "Expansion Internationale",
    description: "Conseils pour étendre vos opérations crypto à l'international.",
  },
  {
    icon: Shield,
    title: "Gestion des Risques",
    description: "Stratégies pour minimiser les risques dans l'écosystème crypto.",
  },
];

export default function Services() {
  return (
    <section className="py-20 md:py-32 bg-secondary" aria-label="Nos services">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12">
          Nos Services
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, description }, index) => (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <Icon className="h-10 w-10 text-primary mb-4" aria-hidden="true" />
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}