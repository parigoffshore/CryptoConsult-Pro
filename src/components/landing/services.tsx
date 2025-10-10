import { Briefcase, PieChart, Globe, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Services() {
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="container">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12">Nos Services</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <Briefcase className="h-10 w-10 text-primary mb-4" alt="Icône Briefcase" />
              <CardTitle>Consulting Stratégique</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Stratégies personnalisées pour naviguer dans le marché crypto volatil.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <PieChart className="h-10 w-10 text-primary mb-4" alt="Icône PieChart" />
              <CardTitle>Analyse de Portefeuille</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Optimisation de votre portefeuille crypto pour maximiser les retours.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Globe className="h-10 w-10 text-primary mb-4" alt="Icône Globe" />
              <CardTitle>Expansion Internationale</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Conseils pour étendre vos opérations crypto à l'international.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-4" alt="Icône Shield" />
              <CardTitle>Gestion des Risques</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Stratégies pour minimiser les risques dans l'écosystème crypto.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}