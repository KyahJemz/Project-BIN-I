import { RoutesService } from '@/services/routes.service';
import RoutesModel, { IRoutesDocument } from '@/models/routes';
import RoutesSection from '@/components/RoutesSection/RoutesSection';
import { LatLngExpression } from 'leaflet';

export interface RoutesPageProps {
	allRoutes: IRoutesDocument[];
}

export const getRoutesPageProps = async () => {
	const routesService = new RoutesService(RoutesModel);

    try {
        const [allRoutes] = await Promise.all([
			routesService.getAllRoutes(),
        ]);

        return {
            props: {
				allRoutes
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
				allRoutes: []
            },
        };
    } 
};

export default function RoutesPage({
	allRoutes
}: RoutesPageProps) {

    function getAllRoutes(array: IRoutesDocument[] = []) {
        const routes: LatLngExpression[] = [];
        array.forEach((route) => {
            routes.push(route.pickupPoints as unknown as LatLngExpression);
        })
        return routes;
    }

    const allRoutesGathered = getAllRoutes(allRoutes);

	return (
		<div className="min-h-screen bg-gray-100">

            {/* Routes Section */}
            <RoutesSection data={allRoutesGathered.reverse() as unknown as LatLngExpression[][]}  />

        </div>
	);
}