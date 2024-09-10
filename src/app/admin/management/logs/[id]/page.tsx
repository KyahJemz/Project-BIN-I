'use client';

import { useGetLogByIdHook } from '@/hooks/logs.hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { capitalizeFirstLetter, formatFullDate } from '@/utils/utilities';

const IdViewLogs = ({ params }: { params: { id: string } }) => {
    const router = useRouter();

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [type, setType] = useState('admin');
    const [action, setAction] = useState<string>('');
    const [actionCollection, setActionCollection] = useState<string>('');
    const [newDocument, setNewDocument] = useState<{} | null>(null);
    const [oldDocument, setOldDocument] = useState<{} | null>(null);
    const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString().toString());

    const {
        getLogById,
        isLoading: isGettingLogById,
        error: getLogByIdError,
        response: getLogByIdResponse
    } = useGetLogByIdHook();

    useEffect(() => {
        const fetch = async () => {
            await getLogById(params.id);
        };
        fetch();
        // eslint-disable-next-line
    }, [params.id]);

    useEffect(() => {
        if (getLogByIdResponse) {
            setFirstName(getLogByIdResponse?.account_id.firstName || '');
            setLastName(getLogByIdResponse?.account_id.lastName || '');
            setDepartment(getLogByIdResponse?.account_id.department || '');
            setPosition(getLogByIdResponse?.account_id.position || '');
            setType(getLogByIdResponse?.account_id.type || 'admin');
            setAction(getLogByIdResponse?.action || '');
            setActionCollection(getLogByIdResponse?.actionCollection || '');
            setNewDocument(getLogByIdResponse?.newDocument ? JSON.parse(getLogByIdResponse?.newDocument) : null);
            setOldDocument(getLogByIdResponse?.oldDocument ? JSON.parse(getLogByIdResponse?.oldDocument) : null);
            setCreatedAt(getLogByIdResponse?.createdAt || createdAt);
        }
        // eslint-disable-next-line
    }, [getLogByIdResponse]);

    const renderJsonTable = (data: { [key: string]: any } | null) => {
        if (!data) return <p>No data available</p>;

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(data).map(([key, value]) => (
                            <tr key={key}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate">{key}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate">{typeof value === 'object' ? JSON.stringify(value) : value.toString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <main>
            <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-6'>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Log Information</h2>
				<div className="bg-gray-100 p-6 rounded-lg shadow-sm mb-6">
                    <div className="space-y-4">
                        <div className="flex items-center mb-4">
                            <div className="w-1/3 font-medium text-gray-600">Name:</div>
                            <div className="w-2/3 text-gray-800">{firstName} {lastName}</div>
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="w-1/3 font-medium text-gray-600">Department & Position:</div>
                            <div className="w-2/3 text-gray-800">{capitalizeFirstLetter(department)} | {capitalizeFirstLetter(position)} | {capitalizeFirstLetter(type)}</div>
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="w-1/3 font-medium text-gray-600">Action Details:</div>
                            <div className="w-2/3 text-gray-800">
                                {capitalizeFirstLetter(action)} in {capitalizeFirstLetter(actionCollection)} collection at {formatFullDate(createdAt)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-gray-700 mb-4">Old Document</h3>
                        {renderJsonTable(oldDocument)}
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-gray-700 mb-4">New Document</h3>
                        {renderJsonTable(newDocument)}
                    </div>
                </div>
                <div className="w-full mt-6 flex justify-end">
                    <button onClick={() => router.back()} className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded">
                        Go Back
                    </button>
                </div>
            </div>
        </main>
    );
};

export default IdViewLogs;
