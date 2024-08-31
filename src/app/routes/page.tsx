import RoutesPage, { getRoutesPageProps } from "@/pages/RoutesPage";

export default async function Routes() {
	const { props } = await getRoutesPageProps();
	return (
		<>
			<RoutesPage allRoutes={props.allRoutes}/>
		</>
	);
}
