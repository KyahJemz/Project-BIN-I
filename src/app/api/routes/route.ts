import RoutesModel from '@/models/routes';
import { RoutesService } from '@/services/routes.service';
import { ErrorResponses } from '@/utils/errorResponses';
import { MongoDbConnect } from '@/utils/mongodb';
import {
	CreateRoutesRequestSchema,
	UpdateRoutesRequestSchema,
} from '@/validation/routes.validation';
import { NextResponse, NextRequest } from 'next/server';

// POST method: Create a new routes
export async function POST(req: NextRequest) {
	const routesService = new RoutesService(RoutesModel);
	try {
		
		const parsedRequest = CreateRoutesRequestSchema.parse(await req.json());
		const news = await routesService.createRoute(parsedRequest);
		return NextResponse.json(news, { status: 201 });
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// GET method: Fetch routes or all routes
export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		
		const routesService = new RoutesService(RoutesModel);
		if (id) {
			const news = await routesService.getRouteById(id);
			return NextResponse.json(news);
		} else {
			const news = await routesService.getAllRoutes();
			return NextResponse.json(news);
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// PUT method: Update an route
export async function PUT(req: NextRequest) {
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		if (id) {
			
			const parsedRequest = UpdateRoutesRequestSchema.parse(
				await req.json(),
			);
			const routesService = new RoutesService(RoutesModel);
			const updatedEvent = await routesService.updateRoute(
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

// DELETE method: Delete an route
export async function DELETE(req: NextRequest) {
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		if (id) {
			
			const routesService = new RoutesService(RoutesModel);
			await routesService.deleteRoute(id);
			return NextResponse.json({
				message: `Routes with ID: ${id} deleted successfully`,
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
