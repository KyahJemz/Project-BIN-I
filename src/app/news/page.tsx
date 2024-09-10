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
        // eslint-disable-next-line
    }, []);

    return (
        <main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white  max-w-7xl'>
                <h2 className="text-3xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Stay in the Know: Latest News</h2>
                <p className="text-lg mb-4 text-dark-gray border-b-2 pb-4">Your source for the latest headlines and breaking stories.</p>
				<BiniGrid data={getAllNewsResponse ?? []} header='Bin-I News Page' type='news' link={'/news/'}/>
		    </div>
		</main>
    );
}

export default News;