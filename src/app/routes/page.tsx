import RoutesPage, { getRoutesPageProps } from "@/pages/RoutesPage";

export default async function Routes() {
	const { props } = await getRoutesPageProps();
	return (
		<main>
			<RoutesPage allRoutes={props.allRoutes}/>
		</main>
	);
}
