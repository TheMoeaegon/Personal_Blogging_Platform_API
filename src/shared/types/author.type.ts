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
