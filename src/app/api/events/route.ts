import EventsModel from '@/models/events';
import { EventService } from '@/services/events.service';
import { ErrorResponses } from '@/utils/errorResponses';
import { MongoDbConnect } from '@/utils/mongodb';
import {
	CreateEventRequestSchema,
	UpdateEventRequestSchema,
} from '@/validation/events.validation';
import { NextResponse, NextRequest } from 'next/server';

// POST method: Create a new event
export async function POST(req: NextRequest) {
	const eventService = new EventService(EventsModel);
	try {
		
		const parsedRequest = CreateEventRequestSchema.parse(await req.json());
		const event = await eventService.createEvent(parsedRequest);
		return NextResponse.json(event, { status: 201 });
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// GET method: Fetch event details or all event details
export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		
		const eventService = new EventService(EventsModel);
		if (id) {
			const event = await eventService.getEventById(id);
			return NextResponse.json(event);
		} else {
			const events = await eventService.getAllEvent();
			return NextResponse.json(events);
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// PUT method: Update an event
export async function PUT(req: NextRequest) {
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		if (id) {
			
			const parsedRequest = UpdateEventRequestSchema.parse(
				await req.json(),
			);
			const eventService = new EventService(EventsModel);
			const updatedEvent = await eventService.updateEvent(
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

// DELETE method: Delete an event
export async function DELETE(req: NextRequest) {
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		if (id) {
			
			const eventService = new EventService(EventsModel);
			await eventService.deleteEvent(id);
			return NextResponse.json({
				message: `Event with ID: ${id} deleted successfully`,
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
