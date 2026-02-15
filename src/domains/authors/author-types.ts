export type Author = {
    fullname: string;
    email: string;
    password_hash: string;
    bio?: string;
    avatar_url?: string;
};

export type AuthorDto = {
    fullname: string;
    email: string;
    password: string;
    bio?: string;
    avatar_url?: string;
};
