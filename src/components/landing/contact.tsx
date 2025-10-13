<<<<<<< HEAD
"use client";

import { Phone, Mail, MapPin, Calendar, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
=======
// (garde tes imports existants)
import * as React from "react";
>>>>>>> 6cb80e51d618dc6cfa1a4c2c2df3f050a6155d67
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
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

<<<<<<< HEAD
  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    toast("Success", "Your message has been sent!", {
      action: {
        label: "Undo",
        onClick: () => console.log("Undo action"),
      },
    });
  };

  return (
    <div className="container mx-auto p-0">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="space-y-6 p-0">
          <h2 className="font-headline text-2xl font-bold">Contact Information</h2>
          <div className="space-y-4 p-0">
            <div className="flex items-start space-x-3 p-0">
              <MapPin className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
              <div className="p-0">
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">Calle Principal, Big Creek, Isla Colón, Bocas del Toro, Panama</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-0">
              <Mail className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
              <div className="p-0">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">cryptoconsultme@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-0">
              <Phone className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
              <div className="p-0">
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">+507 6740-8636</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-0">
              <Phone className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
              <div className="p-0">
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">+507 6740-8636</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6 p-0">
          <h2 className="font-headline text-2xl font-bold">Send Message</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-0">
            <div className="p-0">
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
            <div className="p-0">
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
            <div className="p-0">
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
=======
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

  // Si l'utilisateur clique sur "Book Free Consulting", on envoie aussi un email (récupère les valeurs du formulaire si présentes)
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
>>>>>>> 6cb80e51d618dc6cfa1a4c2c2df3f050a6155d67
            </div>
            <div className="p-0">
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
            <Button type="submit" className="w-full p-0">
              Send message
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-12 space-y-6 p-0">
        <h2 className="font-headline text-2xl font-bold text-center">Book a Free Consulting</h2>
        <div className="grid md:grid-cols-2 gap-0 p-0">
          <div className="space-y-4 p-0">
            <div className="flex items-center space-x-2 p-0">
              <Calendar className="h-5 w-5 text-primary" />
              <span>October 2025</span>
            </div>
            <div className="grid grid-cols-7 gap-0 text-center text-sm p-0">
              <div>Su</div>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
              <div className="p-2 rounded bg-muted">28</div>
              <div className="p-2 rounded bg-muted">29</div>
              <div className="p-2 rounded bg-muted">30</div>
              <div className="p-2 rounded bg-muted">1</div>
              <div className="p-2 rounded bg-muted">2</div>
              <div className="p-2 rounded bg-muted">3</div>
              <div className="p-2 rounded bg-muted">4</div>
              <div className="p-2 rounded bg-muted">5</div>
              <div className="p-2 rounded bg-muted">6</div>
              <div className="p-2 rounded bg-muted">7</div>
              <div className="p-2 rounded bg-muted">8</div>
              <div className="p-2 rounded bg-muted">9</div>
              <div className="p-2 rounded bg-muted">10</div>
              <div className="p-2 rounded bg-muted">11</div>
              <div className="p-2 rounded bg-muted">12</div>
              <div className="p-2 rounded bg-muted">13</div>
              <div className="p-2 rounded bg-muted">14</div>
              <div className="p-2 rounded bg-muted">15</div>
              <div className="p-2 rounded bg-muted">16</div>
              <div className="p-2 rounded bg-muted">17</div>
              <div className="p-2 rounded bg-muted">18</div>
              <div className="p-2 rounded bg-muted">19</div>
              <div className="p-2 rounded bg-muted">20</div>
              <div className="p-2 rounded bg-muted">21</div>
              <div className="p-2 rounded bg-muted">22</div>
              <div className="p-2 rounded bg-muted">23</div>
              <div className="p-2 rounded bg-muted">24</div>
              <div className="p-2 rounded bg-muted">25</div>
              <div className="p-2 rounded bg-muted">26</div>
              <div className="p-2 rounded bg-muted">27</div>
              <div className="p-2 rounded bg-muted">28</div>
              <div className="p-2 rounded bg-muted">29</div>
              <div className="p-2 rounded bg-muted">30</div>
              <div className="p-2 rounded bg-muted">31</div>
            </div>
          </div>
          <div className="space-y-4 p-0">
            <div className="flex items-center space-x-2 p-0">
              <Clock className="h-5 w-5 text-primary" />
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <p className="text-muted-foreground p-0">Nous répondons à tous les messages dans les 24h.</p>
          </div>
        </div>
      </div>
    </div>
  );
}