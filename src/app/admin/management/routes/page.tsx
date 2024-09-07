"use client";

import {
	useGetAllRoutesHook,
	useDeleteRouteHook,
} from '@/hooks/routes.hooks';
import React, { useEffect, useState } from "react";
import { IRoutesDocument } from '@/models/routes';
import BiniTable from '@/components/BiniTable/BiniTable';
import { defaultPosition, routeColors } from '@/app/constants';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { LatLngLiteral } from 'leaflet';

const Map = dynamic(
	() => import('@/components/map/map'),
	{
		loading: () => <p>A map is loading</p>,
		ssr: false,
	},
);

const RoutesManagement = () => {
	const router = useRouter();

	const [refresh, setRefresh] = useState(false);
	const [allPoints, setAllPoints] = useState<number[][]>([]);
	const [center, setCenter] = useState<LatLngLiteral>(defaultPosition as LatLngLiteral);
	const [columns, setColumns] = useState<any[]>([]);
	const [rows, setRows] = useState<{}[]>([]);
	const [link, setLink] = useState<string>('');

	const {
		getAllRoutes,
		isLoading: isGettingAllRoutes,
		error: getAllRoutesError,
		response: getAllRoutesResponse,
	} = useGetAllRoutesHook();

	const {
		deleteRoute,
		isLoading: isDeletingRoute,
		error: deleteRouteError,
		response: deleteRouteResponse,
	} = useDeleteRouteHook();

	useEffect(() => {
		const fetchData = async () => {
			await getAllRoutes();
			setRefresh(false);
		};
		fetchData();
	}, [refresh]);

	useEffect(() => {
		setRefresh(true);
	}, [deleteRouteResponse]);

	useEffect(() => {
		if (getAllRoutesResponse) {
			const allPoints: number[][] = [];
			const allLat: number[] = [];
			const allLong: number[] = [];

			if (getAllRoutesResponse) {
				getAllRoutesResponse.forEach((route) => {
					allPoints.push(route.pickupPoints);
					route.pickupPoints.forEach((point: number[]) => {
						allLat.push(+point[0]);
						allLong.push(+point[1]);
					});
				});
			}

			const totalOfLats: number = allLat.reduce((a, b) => a + b, 0);
			const totalOfLongs: number = allLong.reduce((a, b) => a + b, 0);

			const centerOfMarks = (allLat.length > 0 && allLong.length > 0) ? [
				totalOfLats / allLat.length,
				totalOfLongs / allLong.length
			] : defaultPosition;

			const columns = [
				'#',
				'Route Name',
				'Status',
				'Color',
				'Description',
				'Notes',
			];
			const rows = getAllRoutesResponse ? getAllRoutesResponse.map((route: IRoutesDocument, index: number) => {
				return {
					_id: route._id,
					"#": index + 1,
					'Route Name': route.routeName,
					Status: route.status,
					Color: routeColors[index % routeColors.length],
					Description: route.description,
					Notes: route.notes
				}
			}) : [];
			const link = '/admin/management/routes';

			setCenter(centerOfMarks as LatLngLiteral);
			setAllPoints(allPoints);
			setColumns(columns);
			setRows(rows);
			setLink(link);
		}
	}, [getAllRoutesResponse]);

	function onAdd() {
		router.push('/admin/management/routes/add');
	}

	function onEdit(id: string) {
		router.push(`/admin/management/routes/edit/${id}`);
	}

	function onDelete(id: string) {
		if (!isDeletingRoute) {
			deleteRoute(id);
		}
	}

	return (
		<main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white'>
				<h2 className="text-lg font-bold mb-4 mx-1">Routes Overview</h2>
				<div className="space-y-6 container mx-auto">
					<div className="bg-white h-96 p-2 rounded-lg shadow-lg">
						<Map
							zoom={15}
							cameraPosition={center}
							routeCoordinates={allPoints}
							isClickable={false}
						/>
					</div>
					<BiniTable
						header='Routes Management'
						columns={columns}
						data={rows}
						link={link}
						onAdd={onAdd}
						onDelete={onDelete}
						onEdit={onEdit}
					/>
				</div>
			</div>
		</main>
	);

}

export default RoutesManagement;