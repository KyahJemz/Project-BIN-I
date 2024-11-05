import TutorialModel from '@/models/tutorials';
import { TutorialsService } from '@/services/tutorials.service';
import { ErrorResponses } from '@/utils/errorResponses';
import { validateRequest } from '@/utils/jwt';
import { UpdateTutorialStatusRequest } from '@/validation/tutorials.validation';
import { NextResponse, NextRequest } from 'next/server';

// GET method: Fetch tutorial details or all tutorials
export async function GET(req: NextRequest) {
	await validateRequest(req, 'users');
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	const action = url.searchParams.get('action');
	try {
		const tutorialService = new TutorialsService(TutorialModel, req.headers);
		if (action && action.includes('certificate')) {
			const tutorial = await tutorialService.getCertificateById(id as string);
			return NextResponse.json(tutorial);
		} else {
			if (id) {
				const tutorial = await tutorialService.getTutorialById(id);
				return NextResponse.json(tutorial);
			} else {
				const tutorials = await tutorialService.getAllTutorials();
				return NextResponse.json(tutorials);
			}
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// PUT method: Update an tutorial
export async function PUT(req: NextRequest) {
	await validateRequest(req, 'users');
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		const parsedRequest = UpdateTutorialStatusRequest.parse(
			await req.json(),
		);
		const tutorialService = new TutorialsService(TutorialModel, req.headers);
		if (id) {
			const updatedTutorial = await tutorialService.updateTutorialStatus(
				id,
				parsedRequest,
			);
			return NextResponse.json(updatedTutorial);
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

// export async function POST(req: NextRequest) {
// 	const tutorialService = new TutorialsService(TutorialModel, req.headers);
// 	return NextResponse.json(await tutorialService.createTutorials());
// }