import jwt from "jsonwebtoken";

import type { ClaimsType } from "./index.js";

export const createAccessJwtToken = (secretKey: string, claims: ClaimsType) => {
    if (!secretKey)
        throw new Error("JWT_SECRET is not defined in environment variables");
    if (!claims) throw new Error("Claims is required to create a token");
    const accessToken = jwt.sign(claims, secretKey, { expiresIn: "15m" });
    return accessToken;
};
