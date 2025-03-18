

import Hero from "@/components/Hero";


export default function Home() {
	// const [categories, setCategories] = useState<string[]>([]);
	// const [subCategories, setSubCategories] = useState<
	// 	{ category: string; name: string }[]
	// >([]);

	// const fetchDropDownData = async () => {
	// 	try {
	// 		const response = await axios.get("/api/DropDownData");
	// 		setCategories(response.data.categories);
	// 		setSubCategories(response.data.subCategories);
	// 	} catch (err: any) {
	// 		console.error("error in fetching drop-down data: ", err);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchDropDownData();
	// }, []);

	return (
		<div className=" max-h-screen overflow-y-hidden">
			<Hero />
		</div>
	);
}
