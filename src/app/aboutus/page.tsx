
import Link from "next/link";

export default function AboutPage() {
	return (
		<div className="max-w-4xl mx-auto p-8 text-white">
			<h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
				About India Sales
			</h1>

			<p className="text-lg text-center ">
			India Sales, the company known for its value addition, is operating in the Manchester of the East since 1989. A dedicated group from Kanpur, India, with a simple goal of offering the best assortment of Equestrian products, we believe in integrating advance technology to manufacture finest quality of our products. Our gamut of products includes Saddle pad, Horse Rugs, Nylon Halter, and other pet apparels and accessories.
			</p>

			<div className="mt-10">
				<h2 className="text-2xl font-semibold  mb-4">🏇 Our Mission</h2>
				<p className="">
				We are dedicated to understand and cater to the needs of the pets. The mission of India Sales is to offer the best quality products at competitive prices. The finest names in the sports, equestrian and pet accessories market. We offer the best quality manufactured in our own manufacturing premises.
				</p>
			</div>

			<div className="mt-8">
				<h2 className="text-2xl font-semibold  mb-4">🛍️ Our Team</h2>
				<p className="list-disc list-inside ">
				We retain a base of talented and qualified employees who are motivated to understand and care about the needs. With minute detailing and experience in handling the manufacturing of products, we pride in our human resources to deliver the best products and services to our valued customers.
				</p>
			</div>
			<div className="mt-8">
				<h2 className="text-2xl font-semibold  mb-4">🛍️ Our Capabilities</h2>
				<p className="list-disc list-inside ">
				At India Sales, we know how important technology is. The latest trends developed each season meet the needs of our buyers and reflect our future business plan.  Product development department with a mix of industrial engineers, merchandisers, cost accountants, quality controllers, pattern masters and skilled workers who are completely free from the day to day operations and style of production.s.
				</p>
			</div>

			<div className="mt-8">
				<h2 className="text-2xl font-semibold mb-4">🌍 Why Choose Us?</h2>
				<ul className="list-disc list-inside ">
					<li>✅ Handpicked materials for durability and comfort</li>
					<li>✅ Competitive pricing for top-quality products</li>
					<li>✅ Trusted by professional riders and horse lovers</li>
					<li>✅ Fast shipping across India</li>
				</ul>
			</div>

			<div className="mt-8 text-center">
				<h2 className="text-2xl font-semibold  mb-4">📞 Contact Us</h2>
				<p className="">
					Have questions or need recommendations? Reach out to us at{" "}
					<strong>support@indiasales.com</strong> or call us at **+91 98765 43210**.
				</p>
			</div>

			<div className="text-center mt-10">
				<Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg">
					Explore Our Collection
				</Link>
			</div>

		</div>
	);
}
