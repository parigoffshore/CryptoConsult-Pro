import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart3, ShieldCheck, Briefcase, Landmark, Scaling } from 'lucide-react';

const services = [
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: "Stratégies d’investissement",
    description: "Maximisez vos rendements avec nos stratégies d'investissement personnalisées en crypto-monnaies. Notre équipe d'experts vous guide à chaque étape.",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "Conseil en gestion d'actifs",
    description: "Gestion experte de votre portefeuille d'actifs numériques pour optimiser la croissance et équilibrer les risques dans un marché volatil.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Gestion des risques",
    description: "Analyse complète des risques et stratégies d’atténuation pour protéger vos investissements contre les fluctuations et les menaces du marché.",
  },
  {
    icon: <Scaling className="h-10 w-10 text-primary" />,
    title: "Formation Crypto",
    description: "Une formation vous est proposée pour une meilleure compréhension de l’écosystème et des decisions que vous prendrez pour maximiser vos investissements.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Notre Expertise</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Nous proposons une gamme complète de services de conseil pour dynamiser votre parcours dans l’écosystème crypto.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
              <CardHeader className="p-0 mb-4">
                {service.icon}
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="text-xl font-bold mb-2">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
