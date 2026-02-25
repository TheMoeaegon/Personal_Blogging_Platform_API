import jwt from "jsonwebtoken";

import type { ClaimsType } from "./index.js";

export const handleCreateAccessJwtToken = (
    secretKey: string,
    claims: ClaimsType,
) => {
    if (!secretKey)
        throw new Error("JWT_SECRET is not defined in environment variables");
    if (!claims) throw new Error("Claims is required to create a token");
    const accessToken = jwt.sign(claims, secretKey, { expiresIn: "15m" });
    return accessToken;
};

export const handleCreateRefreshJwtToken = (
    secretKey: string,
    claims: ClaimsType,
) => {
    if (!secretKey)
        throw new Error("JWT_SECRET is not defined in environment variables");
    if (!claims) throw new Error("Claims is required to create a token");
    const refreshToken = jwt.sign(claims, secretKey, { expiresIn: "7d" });
    return refreshToken;
};

export const handleValidateAcessToken = () => {};
