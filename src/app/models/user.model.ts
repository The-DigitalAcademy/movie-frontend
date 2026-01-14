export interface User {
    uid: string;
    email: string | null;
    displayName?: string | null;
    photoURL?: string | null;
    emailVerified: boolean;
    createdAt?: number;
    lastLogin?: number;
}

export interface SignUpReq {
    username: string;
    email: string;
    password: string; 
}

export interface SignUpRes {
    message: string;
}

export interface SignInReq{
    email: string;
    password: string;
}

export interface SignInRes{

    username: string;
    email: string;
    password: string

}
