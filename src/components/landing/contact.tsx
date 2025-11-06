"use client"

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { contactFormSubmit, type ContactFormInput } from "@/ai/flows/contact-flow";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères."),
  email: z.string().email("Veuillez saisir une adresse e-mail valide."),
  subject: z.string().min(5, "Le sujet doit comporter au moins 5 caractères."),
  message: z.string().min(10, "Le message doit comporter au moins 10 caractères.").max(500, "Le message doit comporter moins de 500 caractères."),
});

export default function Contact() {
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const result = await contactFormSubmit(values as ContactFormInput);
        if (result.success) {
            toast({
              title: "Message envoyé!",
              description: "Merci de nous avoir contactés. Nous vous répondrons sous peu.",
            });
            form.reset();
        } else {
            throw new Error("Submission failed");
        }
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Oh oh! Quelque chose s'est mal passé.",
            description: "Impossible d'envoyer votre message. Veuillez réessayer plus tard.",
        });
    }
  }

  function handleBooking() {
    if (date) {
        toast({
            title: "Réservation confirmée!",
            description: `Votre séance de consultation gratuite est réservée pour ${date.toLocaleDateString()}.`,
        });
    } else {
        toast({
            variant: "destructive",
            title: "La réservation a échoué",
            description: "Veuillez sélectionner une date pour votre consultation.",
        });
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Prenons Contact</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Vous avez une question ou souhaitez démarrer un projet ? N'hésitez pas à nous contacter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="p-6 bg-background rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold font-headline mb-4">Informations de contact</h3>
                <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-center gap-4">
                        <MapPin className="h-6 w-6 text-primary" />
                        <span>Calle Principal, Big Creek, Isla Colon , Bocas del Toro, PANAMA</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-primary" />
                        <a href="mailto:cryptoconsultme@gmail.com" className="hover:text-primary">cryptoconsultme@gmail.com</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-primary" />
                        <a href="tel:+50764708636" className="hover:text-primary">+507 6470-8636</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-primary" />
                        <a href="tel:+23054741839" className="hover:text-primary">+230 5474-1839</a>
                    </div>
                </div>
            </div>
            <div className="p-6 bg-background rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold font-headline mb-4">Réservez une consultation gratuite</h3>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md"
                />
                <Button onClick={handleBooking} className="w-full mt-4">
                  Réservez une consultation gratuite
                </Button>
            </div>
          </div>
          <div className="p-6 sm:p-8 bg-background rounded-lg shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse e-mail</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sujet</FormLabel>
                      <FormControl>
                        <Input placeholder="Demande de renseignements sur la stratégie d'investissement" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Dites-nous comment nous pouvons vous aider..." className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
