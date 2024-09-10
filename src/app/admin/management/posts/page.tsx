"use client";

import BiniGrid from '@/components/BiniGrid/BiniGrid';
import {
    useGetAllPostsHook,
    useDeletePostHook,
} from '@/hooks/posts.hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";

const PostsManagement = () => {
    const router = useRouter();

	const [refresh, setRefresh] = useState(false);

    const {
        getAllPosts,
        isLoading: isGettingAllPosts,
        error: getAllPostsError,
        response: getAllsPostResponse,
    } = useGetAllPostsHook();

    const {
        deletePost,
        isLoading: isDeletingPost,
        error: deletePostError,
        response: deletePostResponse,
    } = useDeletePostHook();

    useEffect(() => {
        const fetchData = async () => {
            await getAllPosts();
			setRefresh(false);
        };
        fetchData();
        // eslint-disable-next-line
    }, [refresh]);

	useEffect(() => {
        setRefresh(true);
    }, [deletePostResponse]);

    function onAddPost() {
        router.push('/admin/management/posts/add');
    }

    function onEditPost(id: string) {
        router.push(`/admin/management/posts/edit/${id}`);
    }

    function onDeletePost(id: string) {
        if(!isDeletingPost) {
			deletePost(id);
		}
    }

    return (
        <main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white max-w-7xl'>
				<BiniGrid data={getAllsPostResponse ?? []} header='Posts Overview' type='post' link={'/posts/'} onAdd={onAddPost} onDelete={onDeletePost} onEdit={onEditPost}/>
			</div>
		</main>
    );
}

export default PostsManagement;