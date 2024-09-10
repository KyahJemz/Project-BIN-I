import { PostService } from '@/services/posts.service';
import PostsModel, { IPostDocument } from '@/models/posts';
import IdPostsSection from '@/components/IdPostsSection/IdPostsSection';

export interface PostsPageProps {
    idPosts: IPostDocument | null; 
}

export const getIdPostPageProps = async (id: string) => {
    const postService = new PostService(PostsModel, null);
    try {
        const idPosts = await postService.getPostById(id)
        return { props: { idPosts }};
    } catch (error) {
        console.error(error);
        return { props: { idPosts: null }}} 
};

export default function IdPostsPage() {

	return (
		<></>
	);
}