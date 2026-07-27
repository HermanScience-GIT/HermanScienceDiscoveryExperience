import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: {
      default: "HermanScience | Human intelligence for better AI",
      template: "%s | HermanScience",
    },
    description:
      "Explore how HermanScience personalizes human-AI interaction to improve quality, efficiency, and proficiency.",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "64x64" },
        {
          url: "/assets/hermanscience-face-icon.png",
          type: "image/png",
          sizes: "256x256",
        },
      ],
      shortcut: "/favicon.ico",
      apple: [
        {
          url: "/apple-touch-icon.png",
          type: "image/png",
          sizes: "180x180",
        },
      ],
    },
    openGraph: {
      title: "HermanScience | Teach your workforce how to drive AI",
      description:
        "Human intelligence for better AI quality, efficiency, and proficiency.",
      type: "website",
      images: [{ url: socialImage, width: 1745, height: 907 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "HermanScience | Teach your workforce how to drive AI",
      description:
        "Human intelligence for better AI quality, efficiency, and proficiency.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
