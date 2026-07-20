// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

import { contactFormSchema } from "@/components/contact/schema";
import { DISCORD_EMBED_COLOR } from "@/lib/constants";
import type { Result } from "@/types";

export async function POST(request: Request): Promise<NextResponse<Result<{ sent: true }>>> {
  const body: unknown = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form submission" },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, error: "Contact form is not configured. Missing DISCORD_WEBHOOK_URL." },
      { status: 500 },
    );
  }

  const { name, email, message } = parsed.data;

  const env = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown";
  const envEmoji = env === "production" ? "🟢" : env === "preview" ? "🟡" : "🔵";

  const discordResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: "📬 New Contact Message",
          description: `>>> ${message}`,
          color: DISCORD_EMBED_COLOR,
          fields: [
            { name: "👤 Name", value: name, inline: true },
            { name: "📧 Email", value: email, inline: true },
            { name: "🌍 Environment", value: `${envEmoji} \`${env}\``, inline: true },
          ],
          footer: { text: "muggleborn.dev • contact form" },
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!discordResponse.ok) {
    return NextResponse.json(
      { ok: false, error: "Failed to deliver message. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, data: { sent: true } }, { status: 200 });
}
