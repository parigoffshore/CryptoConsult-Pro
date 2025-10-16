"use client";

import { Phone, Mail, MapPin, Calendar, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Full Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | null>(null);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const payload = {
        ...values,
        date: date ? date.toISOString() : null,
      };

      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast({
          title: "Message envoyé !",
          description: "Merci, nous reviendrons vers vous rapidement.",
        });
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        toast({
          variant: "destructive",
          title: "Erreur",
          description: json.error || "Impossible d’envoyer le message. Réessaie plus tard.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi.",
      });
      console.error("send error:", error);
    }
  }

  async function handleBooking() {
    if (!date) {
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: "Please select a date for your consultation.",
      });
      return;
    }

    const values = form.getValues();
    const payload = {
      name: values.name || "Non renseigné",
      email: values.email || "Non renseigné",
      subject: `Réservation - ${date.toLocaleDateString()}`,
      message: `Demande de RDV pour ${date.toLocaleString()}`,
      date: date.toISOString(),
    };

    try {
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast({
          title: "Booking Confirmed!",
          description: `Votre session gratuite est demandée pour ${date.toLocaleDateString()}. Nous vous contacterons pour confirmer.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Booking Failed",
          description: "Impossible d'envoyer la demande. Réessaie plus tard.",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: "Erreur lors de la demande.",
      });
      console.error(err);
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Prenons Contact</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Vous avez une question ou souhaitez démarrer un projet ? N'hésitez pas à nous contacter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="p-6 bg-background rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold font-headline mb-4">Contact Information</h3>
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
          </div>

          <div className="space-y-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="John Doe"
                  className="w-full"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="johndoe@example.com"
                  className="w-full"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  {...form.register("subject")}
                  placeholder="Investment Strategy Inquiry"
                  className="w-full"
                />
                {form.formState.errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.subject.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  {...form.register("message")}
                  placeholder="Tell us how we can help you..."
                  className="w-full"
                  rows={4}
                />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>

            <div className="mt-12 space-y-6">
              <h2 className="font-headline text-2xl font-bold text-center">Book a Free Consulting</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>October 2025</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-sm">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div key={day}>{day}</div>
                    ))}
                    {[28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={`p-2 rounded ${date?.getDate() === day ? "bg-primary text-white" : "bg-muted hover:bg-muted/50"}`}
                        onClick={() => setDate(new Date(2025, 9, day))}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <p className="text-muted-foreground">Nous répondons à tous les messages dans les 24h.</p>
                  <Button onClick={handleBooking} className="w-full">
                    Book Free Consulting
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}