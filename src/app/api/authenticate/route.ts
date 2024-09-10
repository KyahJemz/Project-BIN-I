import { ErrorResponses } from '@/utils/errorResponses';
import { validateRequest } from '@/utils/jwt';
import { NextResponse, NextRequest } from 'next/server';

// POST method: Validate
export async function POST(req: NextRequest) {
    await validateRequest(req);

    try {
        await validateRequest(req);
        return NextResponse.json({ message: 'Authenticated successfully.' }, { status: 200 });
    } catch (error: any) {
        const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
        return NextResponse.json({ message }, { status: statusCode });
    }
}