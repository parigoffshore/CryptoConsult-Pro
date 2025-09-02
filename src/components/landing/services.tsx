import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart3, ShieldCheck, Briefcase, Landmark, Scaling } from 'lucide-react';

const services = [
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: "Investment Strategies",
    description: "Tailored crypto investment strategies to meet your financial goals, from long-term holding to active trading.",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "Portfolio Management",
    description: "Expert management of your digital asset portfolio to optimize growth and balance risk in a volatile market.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Risk Assessment",
    description: "Comprehensive risk analysis and mitigation strategies to protect your investments from market fluctuations and threats.",
  },
  {
    icon: <Scaling className="h-10 w-10 text-primary" />,
    title: "DeFi & NFT Advisory",
    description: "Navigate the world of Decentralized Finance and Non-Fungible Tokens with our specialized advisory services.",
  },
  {
    icon: <Landmark className="h-10 w-10 text-primary" />,
    title: "Regulatory Compliance",
    description: "Stay ahead of the curve with expert guidance on the evolving crypto regulatory landscape.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Our Expertise</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            We provide a comprehensive suite of consulting services to empower your journey in the crypto space.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
