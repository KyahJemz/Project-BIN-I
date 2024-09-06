import NewsPage, { getNewsPageProps } from "@/pages/NewsPage";

export default async function News() {
	const { props } = await getNewsPageProps();
	return (
		<main>
			<NewsPage allNews={props.allNews}/>
		</main>
	);
}
