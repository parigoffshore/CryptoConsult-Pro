import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin } from 'lucide-react';
import Link from 'next/link';
import { XIcon } from '@/components/x-icon';

const teamMembers = [
  {
    name: "David Birota",
    role: "Founder, Analyst & DeFi Consultant",
    image: "https://images.unsplash.com/photo-1610415133614-e68d79c89654?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxidXJlYXUlMjBhZmZhaXJlJTIwYWR1bHRlJTIwcGhvdG9ncmFwaGllJTIwaG9tbWVzJTIwbm9pciUyMG9yZGluYXRldXIlMjAlMjBuJUMzJUE5Z29jaWFudCUyMHYlQzMlQUF0ZW1lbnRzJTIwZCVFMiU4MCU5OWFmZmFpcmVzJTIwfGVufDB8fHx8MTc1Njg3ODYzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "professional portrait",
    bio: "Je suis conseiller expert en crypto. Mon atout ? Une double casquette : Je suis formé à la finance traditionnelle , ce qui me donne une rigueur analytique et je suis plongé dans la Crypto depuis 2019. J'ai donc vécu tous les cycles de marché. Mon rôle est de servir de traducteur entre un écosystème crypto très technique et mes clients. Que vous soyez une entreprise qui veut diversifier sa trésorerie ou un particulier qui veut investir sereinement, je vous apporte un plan d'action clair et sur-mesure pour atteindre vos objectifs sans vous perdre en route. Contactez moi pour une première analyse gratuite de vos objectifs.",
    social: {
      linkedin: "https://www.linkedin.com/in/david-birota-cryptoconsultme/",
      twitter: "https://x.com/ParigOffshore",
    },
  },
];

export default function Team() {
  return (
    <section id="team" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">A propos de moi</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Je combine un sens aigu des finances avec une expertise technologique approfondie pour vous offrir des conseils en cryptographie.
          </p>
        </div>
        <div className="flex justify-center">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden text-center group max-w-sm">
              <div className="relative h-64 w-full">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={member.dataAiHint}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-headline">{member.name}</h3>
                <p className="text-primary font-semibold text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center gap-4">
                  <Link href={member.social.twitter} aria-label={`${member.name}'s X profile`}>
                    <XIcon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  </Link>
                  <Link href={member.social.linkedin} aria-label={`${member.name}'s LinkedIn`}>
                    <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
