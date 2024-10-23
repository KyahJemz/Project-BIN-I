import { ErrorResponses } from '@/utils/errorResponses';
import { validateRequest } from '@/utils/jwt';
import { NextResponse, NextRequest } from 'next/server';

// POST method: Validate
export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	const action = url.searchParams.get('action');
    console.log(action)
    try {
        if (!action) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        if(action === 'users') {
            return await validateRequest(req, 'users');
        } else if (action === 'accounts') { 
            return await validateRequest(req, 'accounts');
        } else {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
    } catch (error: any) {
        const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
        return NextResponse.json({ message }, { status: statusCode });
    }
}