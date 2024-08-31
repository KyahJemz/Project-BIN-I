import NewsPage, { getNewsPageProps } from "@/pages/NewsPage";

export default async function News() {
	const { props } = await getNewsPageProps();
	return (
		<>
			<NewsPage allNews={props.allNews}/>
		</>
	);
}
