import PostsModel from '@/models/posts';
import { PostService } from '@/services/posts.service';
import { ErrorResponses } from '@/utils/errorResponses';
import { validateRequest } from '@/utils/jwt';
import {
	CreatePostRequestSchema,
	UpdatePostRequestSchema,
} from '@/validation/post.validation';
import { NextResponse, NextRequest } from 'next/server';

// POST method: Create a new Post
export async function POST(req: NextRequest) {
	await validateRequest(req);
	try {
		
		const postService = new PostService(PostsModel);
		const parsedRequest = CreatePostRequestSchema.parse(
			await req.json(),
		);
		const Post =
			await postService.createPost(parsedRequest);
		return NextResponse.json(Post, { status: 201 });
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// GET method: Fetch Post details or all Post details
export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		
		const postService = new PostService(PostsModel);
		if (id) {
			const Post =
				await postService.getPostById(id);
			return NextResponse.json(Post);
		} else {
			const Posts =
				await postService.getAllPosts();
			return NextResponse.json(Posts);
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// PUT method: Update an Post
export async function PUT(req: NextRequest) {
	await validateRequest(req);
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		if (id) {
			
			const parsedRequest = UpdatePostRequestSchema.parse(
				await req.json(),
			);
			const postService = new PostService(
				PostsModel,
			);
			const updatedPost =
				await postService.updatePost(id, parsedRequest);
			return NextResponse.json(updatedPost);
		} else {
			const { statusCode, message } =
				ErrorResponses.MISSING_PARAMETER('id');
			return NextResponse.json({ message }, { status: statusCode });
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// DELETE method: Delete an Post
export async function DELETE(req: NextRequest) {
	await validateRequest(req);
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		if (id) {
			
			const postService = new PostService(
				PostsModel,
			);
			await postService.deletePost(id);
			return NextResponse.json({
				message: `Post with ID: ${id} deleted successfully`,
			});
		} else {
			const { statusCode, message } =
				ErrorResponses.MISSING_PARAMETER('id');
			return NextResponse.json({ message }, { status: statusCode });
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}
