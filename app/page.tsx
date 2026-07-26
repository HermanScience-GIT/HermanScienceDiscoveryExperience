import type { Metadata } from "next";
import { DiscoveryExperience } from "./DiscoveryExperience";

export const metadata: Metadata = {
  title: "HermanScience | Human intelligence for better AI",
  description:
    "Explore how HermanScience helps people direct AI with greater quality, efficiency, and confidence.",
};

export default function Home() {
  return <DiscoveryExperience />;
}
