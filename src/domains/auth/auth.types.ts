import type { Author } from "../../shared/types/index.js";
import type { CreateAuthorInput } from "../authors/index.js";

export type RegisterAuthorDto = Omit<CreateAuthorInput, "password_hash"> & {
    password: string;
};
export type AuthorResponseDto = Omit<Author, "password_hash">;

export type AuthorLoginDto = {
    email: string;
    password: string;
};

export type ClaimsType = {
    sub: string;
    iss: string;
};
