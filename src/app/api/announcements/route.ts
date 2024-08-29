import AnnouncementsModel from '@/models/announcements';
import { AnnouncementService } from '@/services/announcements.service';
import { ErrorResponses } from '@/utils/errorResponses';
import { MongoDbConnect } from '@/utils/mongodb';
import {
	CreateAnnouncementRequestSchema,
	UpdateAnnouncementRequestSchema,
} from '@/validation/announcements.validation';
import { NextResponse, NextRequest } from 'next/server';

// POST method: Create a new announcement
export async function POST(req: NextRequest) {
	const announcementService = new AnnouncementService(AnnouncementsModel);
	try {
		await MongoDbConnect();
		const parsedRequest = CreateAnnouncementRequestSchema.parse(
			await req.json(),
		);
		const announcement =
			await announcementService.createAnnouncement(parsedRequest);
		return NextResponse.json(announcement, { status: 201 });
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// GET method: Fetch announcement details or all announcement details
export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		await MongoDbConnect();
		const announcementService = new AnnouncementService(AnnouncementsModel);
		if (id) {
			const announcement =
				await announcementService.getAnnouncementById(id);
			return NextResponse.json(announcement);
		} else {
			const announcements =
				await announcementService.getAllAnnouncements();
			return NextResponse.json(announcements);
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// PUT method: Update an announcement
export async function PUT(req: NextRequest) {
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		if (id) {
			await MongoDbConnect();
			const parsedRequest = UpdateAnnouncementRequestSchema.parse(
				await req.json(),
			);
			const announcementService = new AnnouncementService(
				AnnouncementsModel,
			);
			const updatedAnnouncement =
				await announcementService.updateAnnouncement(id, parsedRequest);
			return NextResponse.json(updatedAnnouncement);
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

// DELETE method: Delete an announcement
export async function DELETE(req: NextRequest) {
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		if (id) {
			await MongoDbConnect();
			const announcementService = new AnnouncementService(
				AnnouncementsModel,
			);
			await announcementService.deleteAnnouncement(id);
			return NextResponse.json({
				message: `Announcement with ID: ${id} deleted successfully`,
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
