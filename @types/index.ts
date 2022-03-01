export interface IUser {
    uuid: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    role: string;
    phoneNumber?: any;
    dob: string;
    bio?: any;
    isActive: boolean;
    id_verified_at?: any;
    profilePictureUrl: string;
}




export interface Error {
    code: string;
    field: string;
}

export interface IApiError {
    status: string;
    code: string;
    message: string;
    statusCode: number;
    isOperational: boolean;
    errors: Error[];
}

