import TutorialModel from '@/models/tutorials';
import { TutorialsService } from '@/services/tutorials.service';
import { ErrorResponses } from '@/utils/errorResponses';
import { signJwt, validateRequest } from '@/utils/jwt';
// import {
// 	ChangeTutorialPasswordRequestSchema,
// 	CreateTutorialRequestSchema,
// 	LoginRequestSchema,
// 	UpdateTutorialRequestSchema,
// } from '@/validation/tutorials.validation';
import { NextResponse, NextRequest } from 'next/server';


getTutorialById: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/tutorials?id=${id}`, // GET
getCertificate: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/tutorials?id=${id}&action=certificate`, // GET
getAllTutorials: () => `${env.NEXT_PUBLIC_API_BASE_URL}/tutorials`, // GET
updateTutorialStatus: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/tutorials?id=${id}`, // PUT

// POST method: Create a new tutorial
export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	const action = url.searchParams.get('action');
	const tutorialService = new TutorialService(TutorialModel, req.headers);
	try {
		if (action && action.includes('verify')) {
			const parsedRequest = LoginRequestSchema.parse(await req.json());
			const tutorial = await tutorialService.validateTutorial(parsedRequest);
			const token = signJwt({...tutorial, password: null, token: null});
			await tutorialService.updateTutorial(tutorial._id as string, { token: token });
			return NextResponse.json({...tutorial, token}, { status: 200 });
		} else {
			const parsedRequest = CreateTutorialRequestSchema.parse(
				await req.json(),
			);
			await validateRequest(req, 'users');
			const tutorial = await tutorialService.createTutorial(parsedRequest);
			return NextResponse.json(tutorial, { status: 201 });
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// GET method: Fetch tutorial details or all tutorials
export async function GET(req: NextRequest) {
	await validateRequest(req, 'users');
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		const tutorialService = new TutorialService(TutorialModel, req.headers);
		if (id) {
			const tutorial = await tutorialService.getTutorialById(id);
			return NextResponse.json(tutorial);
		} else {
			const tutorials = await tutorialService.getAllTutorials();
			return NextResponse.json(tutorials);
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
		const parsedRequest = UpdateTutorialRequestSchema.parse(
			await req.json(),
		);
		const tutorialService = new TutorialService(TutorialModel, req.headers);
		if (id) {
			const updatedTutorial = await tutorialService.updateTutorial(
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

// PATCH method: Change tutorial password
export async function PATCH(req: NextRequest) {
	await validateRequest(req, 'users');
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	const action = url.searchParams.get('action');

	if (action && action.includes('change-password')) {
		try {
			const tutorialService = new TutorialService(TutorialModel, req.headers);
			const parsedRequest = ChangeTutorialPasswordRequestSchema.parse(
				await req.json(),
			);
			if (id && parsedRequest.newPassword && parsedRequest.oldPassword) {
				const result = await tutorialService.changeTutorialPassword(
					id,
					parsedRequest.newPassword,
				);
				return NextResponse.json(result);
			} else {
				const { statusCode, message } =
					ErrorResponses.MISSING_PARAMETER('id or newPassword');
				return NextResponse.json({ message }, { status: statusCode });
			}
		} catch (error: any) {
			const { statusCode, message } =
				ErrorResponses.UNHANDLED_ERROR(error);
			return NextResponse.json({ message }, { status: statusCode });
		}
	} else {
		const { statusCode, message } =
			ErrorResponses.MISSING_PARAMETER('endpoint mismatch');
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// DELETE method: Delete an tutorial
export async function DELETE(req: NextRequest) {
	await validateRequest(req, 'users');
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		const tutorialService = new TutorialService(TutorialModel, req.headers);
		if (id) {
			await tutorialService.deleteTutorial(id);
			return NextResponse.json({
				message: `Tutorial with ID: ${id} deleted successfully`,
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
