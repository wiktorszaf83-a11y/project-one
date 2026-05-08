"use client";
import dynamic from "next/dynamic";

const PlannerNoSSR = dynamic(() => import("@/components/Planner/Planner"), {
  ssr: false,
});

export default function Page() {
  return <PlannerNoSSR />;
}
