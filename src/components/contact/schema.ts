// src/components/contact/schema.ts
import { z } from "zod";

import {
  CONTACT_EMAIL_MAX_LENGTH,
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_MESSAGE_MIN_LENGTH,
  CONTACT_NAME_MAX_LENGTH,
  CONTACT_NAME_MIN_LENGTH,
} from "./constants";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(CONTACT_NAME_MIN_LENGTH, "Name is required")
    .max(CONTACT_NAME_MAX_LENGTH, `Name must be ${CONTACT_NAME_MAX_LENGTH} characters or fewer`),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(CONTACT_EMAIL_MAX_LENGTH, `Email must be ${CONTACT_EMAIL_MAX_LENGTH} characters or fewer`),
  message: z
    .string()
    .trim()
    .min(CONTACT_MESSAGE_MIN_LENGTH, "Message is too short")
    .max(
      CONTACT_MESSAGE_MAX_LENGTH,
      `Message must be ${CONTACT_MESSAGE_MAX_LENGTH} characters or fewer`,
    ),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
