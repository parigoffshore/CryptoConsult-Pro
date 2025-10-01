// (garde tes imports existants)
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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters.").max(500, "Message must be less than 500 characters."),
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
            </div>
            <div className="p-6 bg-background rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold font-headline mb-4">Book a Free Consulting</h3>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md"
                />
                <Button onClick={handleBooking} className="w-full mt-4">
                  Book Free Consulting
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
                      <FormLabel>Full Name</FormLabel>
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
                      <FormLabel>Email Address</FormLabel>
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
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Investment Strategy Inquiry" {...field} />
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
                        <Textarea placeholder="Tell us how we can help..." className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
