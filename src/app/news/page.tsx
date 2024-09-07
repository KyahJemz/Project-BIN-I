"use client";

import BiniGrid from '@/components/BiniGrid/BiniGrid';
import {
    useGetAllNewsHook,
} from '@/hooks/news.hooks';
import React, { useEffect } from "react";

const News = () => {
    const {
        getAllNews,
        isLoading: isGettingAllNews,
        error: getAllNewsError,
        response: getAllNewsResponse,
    } = useGetAllNewsHook();

    useEffect(() => {
        const fetchData = async () => {
            await getAllNews();
        };
        fetchData();
    }, []);

    return (
        <main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white'>
				<BiniGrid data={getAllNewsResponse ?? []} header='Bin-I News Page' type='news' link={'/news/'}/>
		    </div>
		</main>
    );
}

export default News;