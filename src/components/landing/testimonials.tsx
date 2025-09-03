"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Client Marc Furlan",
    role: "Investisseur particulier",
    avatar: "MF",
    image: "https://picsum.photos/100/100?random=4",
    dataAiHint: "professional headshot",
    quote: "Grâce aux conseils de CryptoConsult Pro, j'ai pu structurer mon portefeuille crypto et réaliser des gains significatifs en seulement 6 mois.",
  },
  {
    name: "Client Sofia Martinez",
    role: "Restauratrice",
    avatar: "SM",
    image: "https://picsum.photos/100/100?random=5",
    dataAiHint: "professional headshot",
    quote: "Leurs conseils m'ont permis de diversifier mes investissements et de sécuriser mes actifs tout en maximisant mes rendements.",
  },
  {
    name: "Client Thomas Van Steiner",
    role: "Entrepreneur",
    avatar: "TVS",
    image: "https://picsum.photos/100/100?random=6",
    dataAiHint: "professional headshot",
    quote: "J'ai appris énormément sur la sécurité et la diversification. Maintenant, j'investis en crypto avec beaucoup plus de confiance.",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Ce que disent nos clients</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Histoires vraies de clients qui se sont associés à nous.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="h-full flex flex-col justify-between">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
