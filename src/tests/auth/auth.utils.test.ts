import { createAccessJwtToken } from "../../domains/auth/auth.utils.js";
import type { ClaimsType } from "../../domains/auth/index.js";

describe("create access token", () => {
    const claims: ClaimsType = {
        sub: "123456",
        iss: "themoeaegon",
    };
    const secretkey = "12345";
    it("should return a string token", () => {
        const token = createAccessJwtToken(secretkey, claims);
        console.log("Generate Token: ", token);
        expect(typeof token).toBe("string");
        expect(token.length).toBeGreaterThan(10);
    });

    it("should throw an error if called with no secret key", () => {
        expect(() => createAccessJwtToken("", claims)).toThrow();
    });

    it("should throw an error if called with no claims", () => {
        expect(() => createAccessJwtToken(secretkey)).toThrow();
    });
});
