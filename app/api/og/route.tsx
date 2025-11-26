import React from "react";
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "DealMitra";
  const subtitle =
    searchParams.get("subtitle") || "Best Deals · Price Comparison";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0F172A, #1E293B)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: 54,
          fontWeight: 700,
          padding: "50px",
          textAlign: "center",
        }}
      >
        <img
          src="https://dealmitra.online/logo.png"
          width="140"
          style={{ marginBottom: 30 }}
          alt="DealMitra"
        />
        <div style={{ maxWidth: "80%", lineHeight: 1.1 }}>{title}</div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            marginTop: 20,
            opacity: 0.85,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
