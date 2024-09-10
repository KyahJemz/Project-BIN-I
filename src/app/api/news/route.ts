import NewsModel from '@/models/news';
import { NewsService } from '@/services/news.service';
import { ErrorResponses } from '@/utils/errorResponses';
import { validateRequest } from '@/utils/jwt';
import { MongoDbConnect } from '@/utils/mongodb';
import {
	CreateNewsRequestSchema,
	UpdateNewsRequestSchema,
} from '@/validation/news.validation';
import { NextResponse, NextRequest } from 'next/server';

// POST method: Create a new news
export async function POST(req: NextRequest) {
	await validateRequest(req);
	const newsService = new NewsService(NewsModel, req.headers);
	try {
		
		const parsedRequest = CreateNewsRequestSchema.parse(await req.json());
		const news = await newsService.createNews(parsedRequest);
		return NextResponse.json(news, { status: 201 });
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// GET method: Fetch news details or all news details
export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		
		const newsService = new NewsService(NewsModel, req.headers);
		if (id) {
			const news = await newsService.getNewsById(id);
			return NextResponse.json(news);
		} else {
			const news = await newsService.getAllNews();
			return NextResponse.json(news);
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// PUT method: Update an news
export async function PUT(req: NextRequest) {
	await validateRequest(req);
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		if (id) {
			
			const parsedRequest = UpdateNewsRequestSchema.parse(
				await req.json(),
			);
			const newsService = new NewsService(NewsModel, req.headers);
			const updatedEvent = await newsService.updateNews(
				id,
				parsedRequest,
			);
			return NextResponse.json(updatedEvent);
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

// DELETE method: Delete an news
export async function DELETE(req: NextRequest) {
	await validateRequest(req);
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		if (id) {
			
			const newsService = new NewsService(NewsModel, req.headers);
			await newsService.deleteNews(id);
			return NextResponse.json({
				message: `News with ID: ${id} deleted successfully`,
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
