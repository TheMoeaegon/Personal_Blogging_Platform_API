import {
    createAccessJwtToken,
    loginAuthorService,
} from "../../domains/auth/index.js";
import { getAuthorByEmail } from "../../domains/authors/index.js";
import bcrypt from "bcryptjs";

jest.mock("../../domains/authors/index.js", () => ({
    getAuthorByEmail: jest.fn(),
}));

jest.mock("bcrypt", () => ({
    compare: jest.fn(),
}));

jest.mock("", () => ({
    createAccessJwtToken: jest.fn(),
}));

describe("loginAuthorService", () => {
    const credentials = { email: "user@test.com", password: "12345" };
    it("should throw ValidationError if email is missing", async () => {
        await expect(loginAuthorService(credentials)).rejects.toThrow(
            "Bad Request: Required field cannot be empty",
        );
    });
    it("should throw ValidationError if password is missing", async () => {
        await expect(loginAuthorService(credentials)).rejects.toThrow(
            "Bad Request: Required field cannot be empty",
        );
    });
    it("should throw NotFoundError if author not found", async () => {
        (getAuthorByEmail as jest.Mock).mockResolvedValue(null);
        await expect(loginAuthorService(credentials)).rejects.toThrow(
            "Author with this email doesn't exit",
        );
    });
    it("should throw NotAuthenticateError if password is incorrect", async () => {
        (getAuthorByEmail as jest.Mock).mockResolvedValue({
            id: "1234",
            fullname: "kshitij jung shahi",
            email: "user@test.com",
            password_hash: "hashed_password",
        });
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);
        await expect(loginAuthorService(credentials)).rejects.toThrow(
            "email or password is invalid",
        );
    });
    it("should return token if login is successfull", async () => {
        (getAuthorByEmail as jest.Mock).mockResolvedValue({
            id: "1234",
            fullname: "kshitij jung shahi",
            email: "user@test.com",
            password_hash: "hashed_password",
        });
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (createAccessJwtToken as jest.Mock).mockReturnValue("jwttoken");
        const result = await loginAuthorService(credentials);
        expect(result).toEqual("jwttoken");
    });
});
