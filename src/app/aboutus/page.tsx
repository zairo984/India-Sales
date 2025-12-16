import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Users, Award, Globe } from "lucide-react";

export const metadata: Metadata = {
	title: "About Us",
	description: "Learn about India Sales - a renowned manufacturer and supplier of premium equestrian products since 1989. Based in Kanpur, India.",
};

const FEATURES = [
	{
		icon: CheckCircle,
		title: "Uncompromising Quality",
		description: "We utilize only the finest materials, carefully selected to ensure durability and comfort.",
	},
	{
		icon: Award,
		title: "Competitive Pricing",
		description: "We offer top-quality products at prices that are highly competitive in the market.",
	},
	{
		icon: Users,
		title: "Trusted by Professionals",
		description: "Our products have earned the trust and loyalty of professional riders worldwide.",
	},
	{
		icon: Globe,
		title: "Global Shipping",
		description: "We provide efficient and reliable shipping services to customers across the globe.",
	},
];

const SECTIONS = [
	{
		icon: "📖",
		title: "Our Story",
		content: "Our journey is built on a foundation of dedication, expertise, and a passion for excellence. With a state-of-the-art manufacturing facility and a team of skilled professionals, we have established ourselves as a trusted partner in the equestrian industry.",
	},
	{
		icon: "🧭",
		title: "Our Mission",
		content: "At India Sales, our mission is to provide outstanding quality products at competitive prices, while ensuring unwavering customer satisfaction. We strive to understand and address the unique needs of pets and their owners.",
	},
	{
		icon: "👥",
		title: "Our Team",
		content: "We retain a base of talented and qualified employees who are motivated to understand and care about the needs. With minute detailing and experience in handling the manufacturing of products, we pride in our human resources.",
	},
	{
		icon: "⚙️",
		title: "Our Capabilities",
		content: "Our manufacturing capabilities are underpinned by a robust infrastructure, comprising a dedicated polyfill plant, multi-needle quilting machines, and a skilled workforce ensuring the highest standards of quality.",
	},
];

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-black">
			{/* Hero Section */}
			<section className="relative py-20 overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src="/aboutus.jpg"
						alt="About India Sales"
						fill
						className="object-cover opacity-30"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black" />
				</div>
				
				<div className="container mx-auto px-4 relative z-10">
					<h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-6">
						About India Sales
					</h1>
					<p className="text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
						A renowned manufacturer and supplier of high-quality equestrian products, 
						headquartered in Kanpur, India - a city esteemed for its rich industrial heritage since 1989.
					</p>
				</div>
			</section>

			{/* Main Content */}
			<div className="container mx-auto px-4 py-16">
				{/* Story Sections */}
				<div className="grid md:grid-cols-2 gap-8 mb-16">
					{SECTIONS.map((section) => (
						<article
							key={section.title}
							className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-yellow-400/50 transition-colors"
						>
							<div className="flex items-center gap-3 mb-4">
								<span className="text-3xl" role="img" aria-hidden="true">
									{section.icon}
								</span>
								<h2 className="text-2xl font-semibold text-white">
									{section.title}
								</h2>
							</div>
							<p className="text-gray-300 leading-relaxed">
								{section.content}
							</p>
						</article>
					))}
				</div>

				{/* Why Choose Us */}
				<section className="mb-16">
					<h2 className="text-3xl font-bold text-center text-white mb-12">
						🌍 Why Choose Us?
					</h2>
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{FEATURES.map(({ icon: Icon, title, description }) => (
							<div
								key={title}
								className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center group hover:from-yellow-400/10 hover:to-yellow-600/10 transition-all duration-300"
							>
								<div className="w-16 h-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-400/20 transition-colors">
									<Icon className="w-8 h-8 text-yellow-400" />
								</div>
								<h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
								<p className="text-gray-400 text-sm">{description}</p>
							</div>
						))}
					</div>
				</section>

				{/* CTA Section */}
				<section className="text-center bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-2xl p-12 border border-yellow-400/20">
					<h2 className="text-2xl font-bold text-white mb-4">📞 Get In Touch</h2>
					<p className="text-gray-300 mb-2">
						Have questions or need recommendations? We&apos;re here to help!
					</p>
					<p className="text-gray-400 mb-6">
						<strong className="text-white">faraz@indiasales.co</strong> | +91 8009005768
					</p>
					<Link
						href="/products"
						className="inline-block bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-yellow-300 transition-colors"
					>
						Explore Our Collection
					</Link>
				</section>
			</div>
		</div>
	);
}
