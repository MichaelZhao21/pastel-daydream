import db from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    // Get cookie
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

    // Send user data without password hash
    delete user.password;
    return Response.json(user);
}
