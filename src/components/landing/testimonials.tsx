import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "CryptoConsult Pro a transformé notre approche des investissements crypto. Leurs conseils sont inestimables.",
    name: "John Doe",
    role: "Investisseur Institutionnel",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    fallback: "JD",
  },
  // Ajoutez d'autres témoignages ici si nécessaire
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-muted" aria-label="Témoignages de nos clients">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12">
          Ce que disent nos clients
        </h2>
        <Carousel className="max-w-[90%] mx-auto" aria-live="polite">
          <CarouselContent>
            {testimonials.map(({ quote, name, role, image, fallback }, index) => (
              <CarouselItem key={index}>
                <Card className="transition-all hover:shadow-lg">
                  <CardContent className="space-y-4 p-6">
                    <Quote className="h-8 w-8 text-primary" aria-hidden="true" />
                    <p className="text-lg">{quote}</p>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={image}
                          alt={`${name}, ${role}`}
                          loading="lazy"
                          className="object-cover"
                        />
                        <AvatarFallback>{fallback}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">{name}</p>
                        <p className="text-sm text-muted-foreground">{role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}