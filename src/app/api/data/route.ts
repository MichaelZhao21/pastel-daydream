import { genHash } from "@/app/components/hash";
import db from "@/lib/mongodb";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

interface DataUpdateRequest {
    email: string,
    password: string,
    name: string,
    phone: string,
    rsvp: string,
    paid: string,
    relation: string,
    bringing: string,
    music: string,
}

export async function POST(req: Request) {
    // Get body
    const body = (await req.json()) as DataUpdateRequest;

    // Get token
    const cookieStore = await cookies();
    const token = cookieStore.get('token') as any;

    // Check for token field
    if (!token) {
        return new Response('Token is required', { status: 400 });
    }

    // Check database for token
    const user = await db.collection('users').findOne({ token: token.value });

    // If user not found, return 401
    if (!user) {
        return new Response('Invalid token', { status: 401 });
    }

    // Check to see if password has changed
    if (body.password) {
        // Generate 16 character salt
        const salt = randomBytes(8).toString('hex');
        const hash = genHash(salt, body.password);
        body.password = `${salt}:${hash}`;
    } else {
        body.password = user.password;
    }

    // Update user
    await db.collection('users').updateOne({ email: user.email }, { $set: body });

    return new Response("Ok");
}