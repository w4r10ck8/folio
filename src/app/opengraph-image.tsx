// src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";

import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

export const runtime = "edge";
export const alt = SITE_AUTHOR;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0a0a",
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <p style={{ color: "#a78bfa", fontSize: 20, margin: 0, marginBottom: 16 }}>{SITE_URL}</p>
      <h1
        style={{
          color: "#fafafa",
          fontSize: 72,
          margin: 0,
          lineHeight: 1.1,
          fontWeight: 700,
        }}
      >
        {SITE_AUTHOR}
      </h1>
      <p
        style={{
          color: "#a1a1aa",
          fontSize: 28,
          margin: 0,
          marginTop: 24,
          lineHeight: 1.5,
        }}
      >
        {SITE_DESCRIPTION}
      </p>
    </div>,
    { ...size },
  );
}
