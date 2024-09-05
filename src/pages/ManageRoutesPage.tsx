"use client";

import {
    useGetAllRoutesHook,
    useDeleteRouteHook,
} from '@/hooks/routes.hooks';
import RoutesSection from "@/components/RoutesSection/RoutesSection";
import React, { useEffect, useState } from "react";
import { IRoutesDocument } from '@/models/routes';
import BiniTable from '@/components/BiniTable/BiniTable';
import { routeColors } from '@/app/constants';
import { useRouter } from 'next/navigation';

const ManageRoutesPage = () => {
    const router = useRouter();

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
        const fetchRoutes = async () => {
            await getAllRoutes();
        };
        fetchRoutes();
    }, []);

    function onAddRoute() {
        router.push('/admin/management/routes/add');
    }

    function onEditRoute(data: IRoutesDocument) {
        router.push(`/admin/management/routes/edit/${data._id}`);
    }

    function onDeleteRoute(id: string) {
        console.log('deleting route', id);
        deleteRoute(id);
        setTimeout(() => {
            window.location.reload()
        }, 500); 
    }

    const columns = [
        'Route Name',
        'Status',
        'Color',
        'Description',
        'Notes',
    ];
    const rows = getAllRoutesResponse ? getAllRoutesResponse.map((route: IRoutesDocument, index: number) => {
        return {
            _id: route._id,
            'Route Name': route.routeName,
            Status: route.status,
            Color: routeColors[index % routeColors.length],
            Description: route.description,
            Notes: route.notes
        }
        }) : [];

        return (
            <>
                {isGettingAllRoutes && !getAllRoutesResponse ? (
                    <div className="flex justify-center items-center h-64 container mx-auto">
                        <p className="text-lg text-gray-500">Loading...</p>
                    </div>
                ) : (
                    <>
                        {getAllRoutesResponse ? (
                            <div className="space-y-6 container mx-auto mb-6">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Routes Overview</h2>
                                    <RoutesSection
                                        data={getAllRoutesResponse.map((route: IRoutesDocument) => route.pickupPoints)}
                                    />
                                </div>
        
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Routes</h2>
                                    <BiniTable
                                        columns={columns}
                                        data={rows}
                                        link={'/admin/management/routes'}
                                        onAdd={onAddRoute}
                                        onDelete={onDeleteRoute}
                                        onEdit={onEditRoute}
                                    />
                                </div>
                            </div>
                        ) : (
                            getAllRoutesError && (
                                <div className="flex justify-center items-center h-64">
                                    <p className="text-lg text-red-500">Error: {getAllRoutesError}</p>
                                </div>
                            )
                        )}
                    </>
                )}
            </>
        );
        
}

export default ManageRoutesPage;