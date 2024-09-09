import LogsModel from '@/models/logs';
import { LogsService } from '@/services/logs.service';
import { ErrorResponses } from '@/utils/errorResponses';
import { validateRequest } from '@/utils/jwt';
import { MongoDbConnect } from '@/utils/mongodb';
import { NextResponse, NextRequest } from 'next/server';

// GET method: Fetch logs details or all logs details
export async function GET(req: NextRequest) {
	await validateRequest(req);
	const url = new URL(req.url);
	const id = url.searchParams.get('id') as string;
	const page = url.searchParams.get('page') as string;
	const pageSize = url.searchParams.get('page-size') as string;
	try {
		
		const logsService = new LogsService(LogsModel);
		if (id) {
			const logs = await logsService.getLogsById(id);
			return NextResponse.json(logs);
		} else {
			const logs = await logsService.getAllLogs(+page, +pageSize);
			return NextResponse.json(logs);
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}
