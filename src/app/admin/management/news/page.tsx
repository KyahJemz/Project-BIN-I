"use client";

import BiniGrid from '@/components/BiniGrid/BiniGrid';
import {
    useGetAllNewsHook,
    useDeleteNewsHook,
} from '@/hooks/news.hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";

const NewsManagement = () => {
    const router = useRouter();

    const [refresh, setRefresh] = useState(false);

    const {
        getAllNews,
        isLoading: isGettingAllNews,
        error: getAllNewsError,
        response: getAllNewsResponse,
    } = useGetAllNewsHook();

    const {
        deleteNews,
        isLoading: isDeletingNews,
        error: deleteNewsError,
        response: deleteNewsResponse,
    } = useDeleteNewsHook();

    useEffect(() => {
        setRefresh(true);
    }, [deleteNewsResponse]);

    useEffect(() => {
        const fetchData = async () => {
            await getAllNews();
        };
        fetchData();
        // eslint-disable-next-line
    }, [refresh]);

    function onAddNews() {
        router.push('/admin/management/news/add');
    }

    function onEditNews(id: string) {
        router.push(`/admin/management/news/edit/${id}`);
    }

    function onDeleteNews(id: string) {
        if (!isDeletingNews) {
            deleteNews(id);
        }
    }

    return (
        <main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white max-w-7xl'>
				<BiniGrid data={getAllNewsResponse ?? []} header='News Overview' type='news' link={'/news/'} onAdd={onAddNews} onDelete={onDeleteNews} onEdit={onEditNews}/>
		    </div>
		</main>
    );
}

export default NewsManagement;