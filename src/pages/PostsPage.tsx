import { PostService } from '@/services/posts.service';
import PostsModel, { IPostDocument } from '@/models/posts';
import PostsSection from '@/components/PostsSection/PostsSection';
export interface PostsPageProps {
    allPosts: IPostDocument[]; 
}

export const getPostPageProps = async () => {
    const postService = new PostService(PostsModel, null);

    try {
        const [allPosts] = await Promise.all([
            postService.getAllPosts(),
        ]);

        return {
            props: {
                allPosts,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                allPosts: [],
            },
        };
    } 
};

export default function PostsPage() {

	return (
		<></>
	);
}