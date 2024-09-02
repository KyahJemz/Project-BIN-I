import IdNewsPage, { getIdNewsPageProps } from "@/pages/IdNewsPage";

export default async function NewsId({ params }: { params: { id: string } }) {
	const id = params.id;
	const { props } = await getIdNewsPageProps(id);
	return (
		<>
			<IdNewsPage idNews={props.idNews} />
		</>
	);
}
