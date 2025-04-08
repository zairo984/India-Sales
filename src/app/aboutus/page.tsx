
// import { url } from "inspector";
import Link from "next/link";
import aboutus from "../../../public/aboutus.jpg"

export default function AboutPage() {
	return (
		<div className="max-w-4xl text-xl mx-auto p-8 text-white bg-cover bg-center" style={{ backgroundImage: `url(${aboutus})` }}
>
			<div className="">
			<h1 className="text-4xl font-bold text-center text-white mb-6">
				About India Sales
			</h1>

			<p className=" ">
			India Sales is a renowned manufacturer and supplier of high-quality equestrian products, headquartered in Kanpur, India - a city esteemed for its rich industrial heritage. Since our inception in 1989, we have consistently delivered exceptional products that cater to the evolving needs of our discerning customers.
			</p>
			</div>
			<div className="mt-10">
				<h2 className="text-2xl font-semibold  mb-4">📖 Our Story</h2>
				<p className="">
				Our journey is built on a foundation of dedication, expertise, and a passion for excellence. With a state-of-the-art manufacturing facility and a team of skilled professionals, we have established ourselves as a trusted partner in the equestrian industry. Our comprehensive product range encompasses saddle pads, horse rugs, nylon halters, and a variety of pet apparels and accessories.
				</p>
			</div>

			<div className="mt-10">
				<h2 className="text-2xl font-semibold  mb-4">🧭 Our Mission</h2>
				<p className="">
				At India Sales, our mission is to provide outstanding quality products at competitive prices, while ensuring unwavering customer satisfaction. We strive to understand and address the unique needs of pets and their owners, continually enhancing our products and services to meet the highest standards of excellence.
				</p>
			</div>

			<div className="mt-8">
				<h2 className="text-2xl font-semibold  mb-4">🛍️ Our Team</h2>
				<p className="list-disc list-inside ">
				We retain a base of talented and qualified employees who are motivated to understand and care about the needs. With minute detailing and experience in handling the manufacturing of products, we pride in our human resources to deliver the best products and services to our valued customers.
				</p>
			</div>
			<div className="mt-8">
				<h2 className="text-2xl font-semibold  mb-4">🛠️ Our Capabilities</h2>
				<p className="list-disc list-inside ">
				Our manufacturing capabilities are underpinned by a robust infrastructure, comprising a dedicated polyfill plant, multi-needle quilting machines, single-needle quilting machines, and a skilled workforce. Our product development department is staffed by a team of experienced industrial engineers, merchandisers, cost accountants, quality controllers, pattern masters, and skilled workers, ensuring that our products meet the highest standards of quality and functionality.
				</p>
			</div>

			<div className="mt-8">
				<h2 className="text-2xl font-semibold mb-4">🌍 Why Choose Us?</h2>
				<ul className="list-disc list-inside ">
					<li>✅ Uncompromising Quality: We utilize only the finest materials, carefully selected to ensure durability and comfort.</li>
					<li>✅ Competitive Pricing: We offer top-quality products at prices that are highly competitive in the market.</li>
					<li>✅ Trusted by Professionals: Our products have earned the trust and loyalty of professional riders and horse enthusiasts worldwide.</li>
					<li>✅ Global Shipping: We provide efficient and reliable shipping services to customers across the globe.</li>
				</ul>
			</div>

			<div className="mt-8">
				<h2 className="text-2xl font-semibold  mb-4">🤝 Our Commitment</h2>
				<p className="list-disc list-inside ">
				Our journey is built on a foundation of dedication, expertise, and a passion for excellence. With a state-of-the-art manufacturing facility and a team of skilled professionals, we have established ourselves as a trusted partner in the equestrian industry. Our comprehensive product range includes saddle pads, horse rugs, nylon halters, and a variety of pet apparel and accessories.
				</p>
			</div>

			<div className="mt-8 text-center">
				<h2 className="text-2xl font-semibold  mb-4">📞 Contact Us</h2>
				<p className="">
					Have questions or need recommendations? Reach out to us at{" "}
					<strong>faraz@indiasales.co</strong> or call us at +91 8009005768.
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
