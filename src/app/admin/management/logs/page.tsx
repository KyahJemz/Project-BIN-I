"use client";

import React, { useEffect, useState } from 'react';
import BiniTable from '@/components/BiniTable/BiniTable';
import { useGetAllLogsHook } from '@/hooks/logs.hooks';
import { capitalizeFirstLetter, formatFullDate } from '@/utils/utilities';
import { ILogDocument } from '@/models/logs';

const Pagination = ({ page, totalPages, handlePreviousPage, handleNextPage }: { page: number, totalPages: number, handlePreviousPage: () => void, handleNextPage: () => void }) => {
    return (
        <div className="flex items-center justify-between my-4">
            <button 
                onClick={handlePreviousPage} 
                disabled={page === 1}
                className={`px-4 text-xs font-light py-2 bg-gray-200 rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Previous
            </button>
            
            <span className="text-xs font-medium mx-4">
                Page {page} of {totalPages}
            </span>

            <button 
                onClick={handleNextPage} 
                disabled={page === totalPages}
                className={`px-4 text-xs font-light py-2 bg-gray-200 rounded ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Next
            </button>
        </div>
    );
};

const LogsManagement = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [totalCount, setTotalCount] = useState(0);
    const [logs, setLogs] = useState([]);
    const [columns, setColumns] = useState([
        "#",
        "Action",
        "Collection",
        "Modified By",
        "Timestamp",
    ]);
    const [rows, setRows] = useState([]);

    const {
        getAllLogs,
        isLoading: isGettingAllLogs,
        error: getAllLogsError,
        response: getAllLogsResponse,
    } = useGetAllLogsHook();

    useEffect(() => {
        const fetchData = async () => {
            getAllLogs(page, pageSize);
        };
        fetchData();
    }, [page, pageSize]);

    useEffect(() => {
        if (getAllLogsResponse) {
            setTotalCount(getAllLogsResponse?.metadata?.totalItems ?? 0);
            setLogs(getAllLogsResponse?.logs ?? []);
        }
    }, [getAllLogsResponse]);

    useEffect(() => {
        const rows = logs.map((log: ILogDocument, index) => {
            return {
				"_id": log._id,
                "#": (index + 1) + ((+page - 1) * +pageSize),
                "Action": capitalizeFirstLetter(log.action),
                "Collection": capitalizeFirstLetter(log.actionCollection),
                "Modified By": (log?.account_id?.firstName ?? "") + " " + (log?.account_id?.lastName ?? ""),
                "Timestamp": formatFullDate(log.createdAt),
            };
        });
        setRows(rows);
    }, [logs]);

    const totalPages = Math.ceil(totalCount / pageSize);

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <main>
            <div className="container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white max-w-7xl">
                <h2 className="text-2xl font-bold mb-2 text-dark-gray">All Admin Logs</h2>
				<Pagination 
					page={page}
					totalPages={totalPages}
					handlePreviousPage={handlePreviousPage}
					handleNextPage={handleNextPage}
				/>
                <BiniTable columns={columns} data={rows} link={'/admin/management/logs/'} />
				<Pagination 
					page={page}
					totalPages={totalPages}
					handlePreviousPage={handlePreviousPage}
					handleNextPage={handleNextPage}
				/>
            </div>
        </main>
    );
};

export default LogsManagement;
