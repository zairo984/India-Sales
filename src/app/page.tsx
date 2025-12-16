import Hero from "@/components/Hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home | Premium Equestrian Products",
	description: "Discover premium equestrian products for horses and riders. Quality saddle pads, horse rugs, riding apparel & accessories from India Sales.",
};

export default function Home() {
	return (
		<div className="min-h-screen">
			<Hero />
		</div>
	);
}
