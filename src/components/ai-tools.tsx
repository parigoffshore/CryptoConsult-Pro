"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handleGenerateMarketingContent, handleGenerateServiceDescriptions } from "@/app/tools/actions";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { GenerateMarketingContentInput } from "@/ai/flows/generate-marketing-content";
import type { GenerateServiceDescriptionsInput } from "@/ai/flows/generate-service-descriptions";

const marketingSchema = z.object({
  companyName: z.string().min(1, "Company name is required."),
  serviceDescription: z.string().min(10, "Service description must be at least 10 characters."),
  targetAudience: z.string().min(1, "Target audience is required."),
  tone: z.string().min(1, "Tone is required."),
});

const serviceSchema = z.object({
  serviceName: z.string().min(1, "Service name is required."),
  targetAudience: z.string().min(1, "Target audience is required."),
  keyBenefits: z.string().min(1, "Key benefits are required."),
  style: z.string().min(1, "Style is required."),
});

export default function AITools() {
  const { toast } = useToast();
  const [marketingResult, setMarketingResult] = useState("");
  const [serviceResult, setServiceResult] = useState("");
  const [isMarketingLoading, setMarketingLoading] = useState(false);
  const [isServiceLoading, setServiceLoading] = useState(false);

  const marketingForm = useForm<z.infer<typeof marketingSchema>>({
    resolver: zodResolver(marketingSchema),
    defaultValues: { companyName: "CryptoConsult Pro", serviceDescription: "", targetAudience: "", tone: "Professional" },
  });

  const serviceForm = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { serviceName: "", targetAudience: "", keyBenefits: "", style: "Engaging" },
  });

  const onMarketingSubmit: SubmitHandler<z.infer<typeof marketingSchema>> = async (data) => {
  if (isMarketingLoading) return;
  setMarketingLoading(true);
  setMarketingResult("");
  try {
    const input: GenerateMarketingContentInput = {
      companyName: data.companyName,
      serviceDescription: data.serviceDescription,
      targetAudience: data.targetAudience,
      tone: data.tone,
    };
    const result = await handleGenerateMarketingContent(input);
    setMarketingResult(result?.marketingContent ?? "No content generated.");
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to generate marketing content.",
    });
  } finally {
    setMarketingLoading(false);
  }
};

  const onServiceSubmit: SubmitHandler<z.infer<typeof serviceSchema>> = async (data) => {
    if (isServiceLoading) return; // Évite les soumissions multiples
    setServiceLoading(true);
    setServiceResult("");
    try {
      const input: GenerateServiceDescriptionsInput = {
        serviceName: data.serviceName,
        targetAudience: data.targetAudience,
        keyBenefits: data.keyBenefits,
        style: data.style,
      };
      const result = await handleGenerateServiceDescriptions(input);
      setServiceResult(result?.description ?? "No description generated."); // Utilise ?? pour gérer null/undefined
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate service description.",
      });
    } finally {
      setServiceLoading(false);
    }
  };

  return (
    <Tabs defaultValue="marketing-content" className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto">
        <TabsTrigger value="marketing-content">Marketing Content</TabsTrigger>
        <TabsTrigger value="service-description">Service Description</TabsTrigger>
      </TabsList>
      <TabsContent value="marketing-content">
        <Card>
          <CardHeader>
            <CardTitle>Marketing Content Generator</CardTitle>
            <CardDescription>Draft compelling marketing content tailored to attract potential clients.</CardDescription>
          </CardHeader>
          <Form {...marketingForm}>
            <form onSubmit={marketingForm.handleSubmit(onMarketingSubmit)} className="space-y-4">
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={marketingForm.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={marketingForm.control}
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Institutional Investors" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={marketingForm.control}
                  name="serviceDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the consulting services offered..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={marketingForm.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tone</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Professional, Engaging, Informative" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {marketingResult && (
                  <div className="space-y-2">
                    <FormLabel>Generated Content</FormLabel>
                    <Textarea readOnly value={marketingResult} className="min-h-[200px] bg-secondary" />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isMarketingLoading}>
                  {isMarketingLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Generate Content
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </TabsContent>
      <TabsContent value="service-description">
        <Card>
          <CardHeader>
            <CardTitle>Service Description Generator</CardTitle>
            <CardDescription>Create clear and persuasive descriptions for your consulting services.</CardDescription>
          </CardHeader>
          <Form {...serviceForm}>
            <form onSubmit={serviceForm.handleSubmit(onServiceSubmit)} className="space-y-4">
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={serviceForm.control}
                    name="serviceName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., DeFi Yield Farming" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={serviceForm.control}
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., High-Net-Worth Individuals" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={serviceForm.control}
                  name="keyBenefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Benefits (comma-separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., High APY, Risk Mitigation, Portfolio Diversification" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={serviceForm.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Style</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Professional, Engaging, Persuasive" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {serviceResult && (
                  <div className="space-y-2">
                    <FormLabel>Generated Description</FormLabel>
                    <Textarea readOnly value={serviceResult} className="min-h-[200px] bg-secondary" />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isServiceLoading}>
                  {isServiceLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Generate Description
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}