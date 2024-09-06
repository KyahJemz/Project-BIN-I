"use client";

import NewsSection from '@/components/NewsSection/NewsSection';
import {
    useGetAllNewsHook,
    useDeleteNewsHook,
} from '@/hooks/news.hooks';
import { INewsDocument } from '@/models/news';
import { useRouter } from 'next/navigation';
import React, { useEffect } from "react";

const ManageNewsPage = () => {
    const router = useRouter();

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
        const fetchNews = async () => {
            await getAllNews();
        };
        fetchNews();
    }, []);

    function onAddNews() {
        router.push('/admin/management/news/add');
    }

    function onEditNews(data: INewsDocument) {
        router.push(`/admin/management/news/edit/${data._id}`);
    }

    function onDeleteNews(id: string) {
        console.log('deleting news', id);
        deleteNews(id);
        setTimeout(() => {
            window.location.reload()
        }, 500);
    }

    return (
        <>
            {isGettingAllNews && !getAllNewsResponse ? (
                <div className="flex justify-center items-center h-64 container mx-auto">
                    <p className="text-lg text-gray-500">Loading...</p>
                </div>
            ) : (
                <>
                    {getAllNewsResponse ? (
                        <NewsSection data={getAllNewsResponse.reverse()} management={true} onDelete={onDeleteNews} onEdit={onEditNews}/>
                    ) : (
                        getAllNewsResponse && (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-lg text-red-500">Error: {getAllNewsError}</p>
                            </div>
                        )
                    )}
                </>
            )}
        </>
    );
}

export default ManageNewsPage;