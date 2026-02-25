import { vi, describe, it, expect } from "vitest";
import type { MockedFunction } from "vitest";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import { getAuthorByEmail } from "../../domains/authors/index.js";
import { loginAuthorService } from "../../domains/auth/auth.service.js";

import {
    handleCreateAccessJwtToken,
    handleCreateRefreshJwtToken,
} from "../../domains/auth/auth.utils.js";
import { saveRefreshToken } from "../../domains/auth/auth.repository.js";

vi.mock("../../domains/authors/index.js", () => ({
    getAuthorByEmail: vi.fn(),
}));

vi.mock("../../domains/auth/auth.utils.js", () => ({
    handleCreateAccessJwtToken: vi.fn(),
    handleCreateRefreshJwtToken: vi.fn(),
}));

vi.mock("../../domains/auth/auth.repository.js", () => ({
    saveRefreshToken: vi.fn(),
}));

vi.mock("crypto", () => ({
    default: {
        createHash: vi.fn(() => ({
            update: vi.fn().mockReturnThis(),
            digest: vi.fn(() => "mocked_token"),
        })),
    },
}));

describe("loginAuthorService", () => {
    const credentials = { email: "user@test.com", password: "12345" };

    it("should throw ValidationError if email is missing", async () => {
        await expect(
            loginAuthorService({ email: "", password: "12345" }),
        ).rejects.toThrow("Bad Request: Required field cannot be empty");
    });

    it("should throw ValidationError if password is missing", async () => {
        await expect(
            loginAuthorService({ email: "user@test.com", password: "" }),
        ).rejects.toThrow("Bad Request: Required field cannot be empty");
    });

    it("should throw NotFoundError if author not found", async () => {
        (
            getAuthorByEmail as MockedFunction<typeof getAuthorByEmail>
        ).mockResolvedValue(null);
        await expect(loginAuthorService(credentials)).rejects.toThrow(
            "Author with this email doesn't exit",
        );
        expect(getAuthorByEmail).toHaveBeenCalledWith("user@test.com");
    });

    it("should throw NotAuthenticateError if password is incorrect", async () => {
        (getAuthorByEmail as any).mockResolvedValue({
            id: "1234",
            fullname: "kshitij jung shahi",
            email: "user@test.com",
            password_hash: "hashed_password",
        });
        vi.spyOn(bcrypt, "compare" as any).mockResolvedValue(false);
        await expect(loginAuthorService(credentials)).rejects.toThrow(
            "email or password is invalid",
        );
        expect(bcrypt.compare).toHaveBeenCalledWith("12345", "hashed_password");
    });

    it("should return token if login is successfull", async () => {
        (getAuthorByEmail as any).mockResolvedValue({
            id: "1234",
            fullname: "kshitij jung shahi",
            email: "user@test.com",
            password_hash: "hashed_password",
        });
        vi.spyOn(bcrypt, "compare" as any).mockResolvedValue(true);
        (
            handleCreateAccessJwtToken as MockedFunction<
                typeof handleCreateAccessJwtToken
            >
        ).mockReturnValue("jwttoken");
        (
            handleCreateRefreshJwtToken as MockedFunction<
                typeof handleCreateRefreshJwtToken
            >
        ).mockReturnValue("refreshtoken");
        (
            saveRefreshToken as MockedFunction<typeof saveRefreshToken>
        ).mockResolvedValue({});

        const result = await loginAuthorService(credentials);

        expect(result).toEqual({
            accessToken: "jwttoken",
            refreshToken: "refreshtoken",
        });
    });
});
