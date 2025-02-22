import db from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    // Get cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('adminpass') as any;

    // Check for token field
    if (!token) {
        return new Response('Adminpass is required', { status: 400 });
    }

    // Compare to environment variable
    if (token.value !== process.env.ADMINPASS) {
        return new Response('Invalid admin password', { status: 401 });
    }

    // Get list of everyone
    const users = await db.collection('users').find().project({ _id: 0, name: 1, rsvp: 1, bringing: 1, music: 1, paid: 1, phone: 1, relation: 1, email: 1, notes: 1 }).toArray();

    return Response.json(users);
}