"use client";

import BiniGrid from '@/components/BiniGrid/BiniGrid';
import {
    useGetAllPostsHook,
} from '@/hooks/posts.hooks';
import React, { useEffect } from "react";

const Posts = () => {
    const {
        getAllPosts,
        isLoading: isGettingAllPosts,
        error: getAllPostsError,
        response: getAllsPostResponse,
    } = useGetAllPostsHook();

    useEffect(() => {
        const fetchData = async () => {
            await getAllPosts();
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white  max-w-7xl'>
                <h2 className="text-3xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Fresh Insights: Latest Posts</h2>
                <p className="text-lg mb-4 text-dark-gray border-b-2 pb-4">Explore fresh perspectives, opinions, and in-depth articles.</p>
				<BiniGrid data={getAllsPostResponse ?? []} header='Bin-I Posts Page' type='post' link={'/posts/'}/>
			</div>
		</main>
    );
}

export default Posts;