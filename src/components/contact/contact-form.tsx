"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TOAST_DURATION_MS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Result } from "@/types";

import { type ContactFormValues, contactFormSchema } from "./schema";

const DEFAULT_VALUES: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

const FIELD_EASE = [0.16, 1, 0.3, 1] as const;
const LABEL_CLASS = "font-mono text-xs tracking-wider uppercase";
const CONTROL_CLASS =
  "border-border/60 bg-background/40 rounded-lg font-mono text-sm placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-primary/40 focus-visible:ring-offset-0";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result: Result<{ sent: true }> = await response.json();

      if (!result.ok) {
        toast.error(result.error, { duration: TOAST_DURATION_MS });
        return;
      }

      toast.success("Message sent. I'll get back to you soon.", {
        duration: TOAST_DURATION_MS,
      });
      form.reset(DEFAULT_VALUES);
    } catch {
      toast.error("Something went wrong. Please try again.", {
        duration: TOAST_DURATION_MS,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border-border/60 bg-background/60 space-y-6 rounded-2xl border p-6 backdrop-blur-sm sm:p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0, ease: FIELD_EASE }}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={LABEL_CLASS}>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    autoComplete="name"
                    className={CONTROL_CLASS}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.08, ease: FIELD_EASE }}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={LABEL_CLASS}>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={CONTROL_CLASS}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.16, ease: FIELD_EASE }}
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={LABEL_CLASS}>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What's on your mind?"
                    rows={6}
                    className={cn(CONTROL_CLASS, "min-h-32 resize-none")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.24, ease: FIELD_EASE }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg font-mono tracking-wide"
          >
            <span aria-hidden>$</span> {isSubmitting ? "sending..." : "send --message"}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
