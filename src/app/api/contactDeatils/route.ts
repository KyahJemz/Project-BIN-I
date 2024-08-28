import ContactDetailsModel from '@/models/contactDetails';
import { ContactDetailsService } from '@/services/contactDetails.service';
import { ErrorResponses } from '@/utils/errorResponses';
import { MongoDbConnect } from '@/utils/mongodb';
import { CreateContactDetailsRequestSchema, UpdateContactDetailsRequestSchema } from '@/validation/contactDetails.validation';
import { NextResponse, NextRequest } from 'next/server';

// POST method: Create a new contact details
export async function POST(req: NextRequest) {
    const contactDetailsService = new ContactDetailsService(ContactDetailsModel);
    try {
        await MongoDbConnect();
        const parsedRequest = CreateContactDetailsRequestSchema.parse(await req.json());
        const contactDetails = await contactDetailsService.createContactDetails(parsedRequest);
        return NextResponse.json(contactDetails, { status: 201 });
    } catch (error: any) {
        const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
        return NextResponse.json({ message }, { status: statusCode });
    }
}

// GET method: Fetch contact details or all contact details
export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    try {
        await MongoDbConnect();
        const contactDetailsService = new ContactDetailsService(ContactDetailsModel);
        if (id) {
            const contactDetails = await contactDetailsService.getContactDetailsById(id);
            return NextResponse.json(contactDetails);
        } else {
            const contactDetails = await contactDetailsService.getAllContactDetails();
            return NextResponse.json(contactDetails);
        }
    } catch (error: any) {
        const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
        return NextResponse.json({ message }, { status: statusCode });
    }
}

// PUT method: Update an contact details
export async function PUT(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    try {
        if (id) {
            await MongoDbConnect();
            const parsedRequest = UpdateContactDetailsRequestSchema.parse(await req.json());
            const contactDetailsService = new ContactDetailsService(ContactDetailsModel);
            const updatedContactDetails = await contactDetailsService.updateContactDetails(id, parsedRequest);
            return NextResponse.json(updatedContactDetails);
        } else {
            const { statusCode, message } = ErrorResponses.MISSING_PARAMETER('id');
            return NextResponse.json({ message }, { status: statusCode });
        }
    } catch (error: any) {
        const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
        return NextResponse.json({ message }, { status: statusCode });
    }
}

// DELETE method: Delete an contact details
export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    try {
        if (id) {
            await MongoDbConnect();
            const contactDetailsService = new ContactDetailsService(ContactDetailsModel);
            await contactDetailsService.deleteContactDetails(id);
            return NextResponse.json({ message: `Contact details with ID: ${id} deleted successfully` });
        } else {
            const { statusCode, message } = ErrorResponses.MISSING_PARAMETER('id');
            return NextResponse.json({ message }, { status: statusCode });
        }
    } catch (error: any) {
        const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
        return NextResponse.json({ message }, { status: statusCode });
    }
}
