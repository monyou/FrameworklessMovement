export type LoginFormStore = {
    email: {
        value: string;
        error: string;
    };
    password: {
        value: string;
        error: string;
    };
};

export type RegisterFormStore = {
    email: {
        value: string;
        error: string;
    };
    password: {
        value: string;
        error: string;
    };
    confirmPassword: {
        value: string;
        error: string;
    };
    firstName: {
        value: string;
        error: string;
    };
    lastName: {
        value: string;
        error: string;
    };
    age: {
        value: number | null;
        error: string;
    };
};