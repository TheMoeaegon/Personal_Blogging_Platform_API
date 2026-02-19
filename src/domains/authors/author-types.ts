export type Author = {
    id: string;
    fullname: string;
    email: string;
    password_hash: string;
    bio?: string;
    avatar_url?: string;
    created_at: Date;
    updated_at: Date;
};

export type CreateAuthorInput = Omit<
    Author,
    "id" | "created_at" | "updated_at"
>;
export type RegisterAuthorDto = Omit<CreateAuthorInput, "password_hash"> & {
    password: string;
};
export type AuthorResponseDto = Omit<Author, "password_hash">;

export type AuthorLoginDto = {
    email: string;
    password: string;
};
