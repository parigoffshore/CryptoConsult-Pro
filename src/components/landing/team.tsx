import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const teamMembers = [
  {
    name: "Alex Thompson",
    role: "Founder & Chief Strategist",
    image: "https://picsum.photos/300/300?random=1",
    dataAiHint: "professional portrait",
    bio: "With over a decade in finance and a passion for blockchain, Alex leads our team with visionary strategies.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Samantha Chen",
    role: "Head of Research & Analysis",
    image: "https://picsum.photos/300/300?random=2",
    dataAiHint: "professional portrait",
    bio: "Samantha's deep-dive market analysis uncovers trends that drive our clients' success in the crypto market.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Michael Rodriguez",
    role: "Senior DeFi Consultant",
    image: "https://picsum.photos/300/300?random=3",
    dataAiHint: "professional portrait",
    bio: "An expert in decentralized finance, Michael helps clients navigate the complexities and opportunities of DeFi.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
];

export default function Team() {
  return (
    <section id="team" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Meet Our Experts</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Our team combines financial acumen with deep technological expertise to deliver unparalleled crypto consulting.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden text-center group">
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
                  <Link href={member.social.twitter} aria-label={`${member.name}'s Twitter`}>
                    <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
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
