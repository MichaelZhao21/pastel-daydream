import { genHash } from "@/app/components/hash";
import db from "@/lib/mongodb";
import { randomBytes } from "crypto";

interface LoginRequest {
    email: string;
    password: string;
}

export async function POST(req: Request) {
    // Get body
    const body = (await req.json()) as LoginRequest;

    // Check for email and password fields
    if (!body.email) {
        return new Response('Email is required', { status: 400 });
    }

    // Make sure email is valid
    if (!body.email.includes('@')) {
        return new Response('Invalid email', { status: 400 });
    }

    // Check database for email
    const user = await db.collection('users').findOne({ email: body.email });

    // Generate random token
    const token = randomBytes(16).toString('hex');

    // If user exists and no password, simply log the user in!
    // This is to account for someone fucking up and then I just basically manually reset their password
    if (user && user.password === '') {
        await db.collection('users').updateOne({ email: body.email }, { $set: { token } });
        return Response.json({ token });
    }

    // If user not found, create user
    if (!user) {
        // Generate 16 character salt
        const salt = randomBytes(8).toString('hex');
        const hash = genHash(salt, body.password);

        await db.collection('users').insertOne({
            email: body.email,
            password: `${salt}:${hash}`,
            token: token
        });
    } else {
        // Split password into salt and hash
        const [salt, hash] = user.password.split(':');

        // Check password
        if (hash !== genHash(salt, body.password)) {
            return new Response('Invalid email or password', { status: 401 });
        }

        // Update token
        await db.collection('users').updateOne({ email: body.email }, { $set: { token } });
    }

    return Response.json({ token });
}
