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
    }, []);

    return (
        <main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white'>
				<BiniGrid data={getAllsPostResponse ?? []} header='Bin-I Posts Page' type='post' link={'/posts/'}/>
			</div>
		</main>
    );
}

export default Posts;