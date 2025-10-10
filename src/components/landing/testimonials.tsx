import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-muted">
      <div className="container">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12">Ce que disent nos clients</h2>
        <Carousel className="max-w-[90%] mx-auto">
          <CarouselContent>
            <CarouselItem>
              <Card>
                <CardContent className="space-y-4 p-6">
                  <Quote className="h-8 w-8 text-primary" alt="Icône Quote" />
                  <p>"CryptoConsult Pro a transformé notre approche des investissements crypto. Leurs conseils sont inestimables."</p>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="Avatar de John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">John Doe</p>
                      <p className="text-sm text-muted-foreground">Investisseur Institutionnel</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            {/* Ajoutez d'autres témoignages similaires */}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}