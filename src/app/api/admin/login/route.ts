import { cookies } from "next/headers";

export async function POST(req: Request) {
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
    return Response.json({ success: true });
}
