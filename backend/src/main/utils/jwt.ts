import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "chave-super-secreta"; // coloque no .env

export interface JwtPayload {
    userId: number;
    name: string;
}

export function generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // expira em 1h
}

export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
