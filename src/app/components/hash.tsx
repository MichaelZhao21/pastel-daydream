import { createHash } from "crypto";

export function genHash(salt: string, password: string) {
    return createHash('sha512').update(salt + password).digest('hex');
}