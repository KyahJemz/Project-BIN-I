import { RoutesService } from '@/services/routes.service';
import RoutesModel, { IRoutesDocument } from '@/models/routes';
import RoutesSection from '@/components/RoutesSection/RoutesSection';
import { LatLngExpression } from 'leaflet';
import { routeColors } from '@/app/constants';

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

const RoutesTable = ({ routes }:{routes: IRoutesDocument[]}) => {
    return (
      <div className="overflow-x-auto bg-white p-4 rounded shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Route Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Color
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {routes.map((route: IRoutesDocument, index: number) => {
                const color = routeColors[index % routeColors.length];
                return(
                    <tr key={index}>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-black`}>
                            {route.routeName}
                        </td>
                        <td className={`px-6 py-4 font-bold whitespace-nowrap text-sm text-${route.status === 'active' ? 'green' : 'red'}-500`}>
                            {route.status}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-${color}-500`}>
                            ▄▄▄▄
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {route.description || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {route.notes || 'N/A'}
                        </td>
                    </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    );
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

            <section className="py-10 px-4 bg-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-2 text-dark-gray">Garbage Collection Routes</h2>
                    <p className="text-lg mb-3 text-dark-gray">Check the garbage collection routes in cavite city.</p>

                    {/* Routes Section */}
                    <RoutesSection data={allRoutesGathered.reverse() as unknown as LatLngExpression[][]} />

                    <RoutesTable routes={allRoutes} />

                </div>
            </section>

        </div>
	);
}