import Certificates from "@/components/certificate";

export default function AboutPage() {
	return (
		<div className="max-w-4xl mx-auto p-8 text-gray-800">
			<h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
				About India Sales
			</h1>

			<p className="text-lg text-center text-gray-700">
				Welcome to <strong>India Sales</strong>, your ultimate destination for high-quality{" "}
				<strong>horse wear</strong> and <strong>rider wear</strong>. We are passionate about 
				equestrian sports and dedicated to providing the best gear for both horses and riders.
			</p>

			<div className="mt-10">
				<h2 className="text-2xl font-semibold text-gray-900 mb-4">🏇 Our Mission</h2>
				<p className="text-gray-700">
					Our mission is to equip riders and their horses with premium-quality gear 
					that ensures comfort, durability, and style. Whether you are a competitive 
					equestrian or a casual rider, our products are designed to elevate your experience.
				</p>
			</div>

			<div className="mt-8">
				<h2 className="text-2xl font-semibold text-gray-900 mb-4">🛍️ What We Offer</h2>
				<ul className="list-disc list-inside text-gray-700">
					<li>Premium **Horse Rugs**, **Saddle Pads**, and **Fly Masks**</li>
					<li>High-quality **Breeches**, **Riding Tights**, and **Polo Wraps**</li>
					<li>Durable **Halter Sets**, **Lead Ropes**, and **Tendon Boots**</li>
					<li>Protective and comfortable gear for both horse and rider</li>
				</ul>
			</div>

			<div className="mt-8">
				<h2 className="text-2xl font-semibold text-gray-900 mb-4">🌍 Why Choose Us?</h2>
				<ul className="list-disc list-inside text-gray-700">
					<li>✅ Handpicked materials for durability and comfort</li>
					<li>✅ Competitive pricing for top-quality products</li>
					<li>✅ Trusted by professional riders and horse lovers</li>
					<li>✅ Fast shipping across India</li>
				</ul>
			</div>

			<div className="mt-8 text-center">
				<h2 className="text-2xl font-semibold text-gray-900 mb-4">📞 Contact Us</h2>
				<p className="text-gray-700">
					Have questions or need recommendations? Reach out to us at{" "}
					<strong>support@indiasales.com</strong> or call us at **+91 98765 43210**.
				</p>
			</div>

			<div className="text-center mt-10">
				<a href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg">
					Explore Our Collection
				</a>
			</div>
			<Certificates />
		</div>
	);
}
