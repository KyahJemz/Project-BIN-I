import SchedulesModel from '@/models/schedules';
import { ScheduleService } from '@/services/schedule.service';
import { ErrorResponses } from '@/utils/errorResponses';
import { validateRequest } from '@/utils/jwt';
import { MongoDbConnect } from '@/utils/mongodb';
import {
	CreateScheduleRequestSchema,
	UpdateScheduleRequestSchema,
} from '@/validation/schedule.validation';
import { NextResponse, NextRequest } from 'next/server';

// POST method: Create a new schedules
export async function POST(req: NextRequest) {
	await validateRequest(req);
	const schedulesService = new ScheduleService(SchedulesModel, req.headers);
	try {
		
		const parsedRequest = CreateScheduleRequestSchema.parse(
			await req.json(),
		);
		const news = await schedulesService.createSchedule(parsedRequest);
		return NextResponse.json(news, { status: 201 });
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// GET method: Fetch schedules or all schedules
export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		
		const schedulesService = new ScheduleService(SchedulesModel, req.headers);
		if (id) {
			const news = await schedulesService.getScheduleById(id);
			return NextResponse.json(news);
		} else {
			const news = await schedulesService.getAllSchedules();
			return NextResponse.json(news);
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// PUT method: Update an schedule
export async function PUT(req: NextRequest) {
	await validateRequest(req);
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		if (id) {
			const parsedRequest = UpdateScheduleRequestSchema.parse(
				await req.json(),
			);
			const schedulesService = new ScheduleService(SchedulesModel, req.headers);
			const updatedEvent = await schedulesService.updateSchedule(
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

// DELETE method: Delete an schedule
export async function DELETE(req: NextRequest) {
	await validateRequest(req);
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		if (id) {
			
			const schedulesService = new ScheduleService(SchedulesModel, req.headers);
			await schedulesService.deleteSchedule(id);
			return NextResponse.json({
				message: `Schedules with ID: ${id} deleted successfully`,
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
