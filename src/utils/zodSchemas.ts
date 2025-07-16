import z from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long")
        .refine(val => /[A-Z]/.test(val), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine(val => /\d/.test(val), {
            message: "Password must contain at least one number",
        })
        .refine(val => /[!@#$%^&*(),.?":{}|<>_\-\\[\]\/~`+=;]/.test(val), {
            message: "Password must contain at least one special character",
        }),
});

export const registerSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long")
        .refine(val => /[A-Z]/.test(val), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine(val => /\d/.test(val), {
            message: "Password must contain at least one number",
        })
        .refine(val => /[!@#$%^&*(),.?":{}|<>_\-\\[\]\/~`+=;]/.test(val), {
            message: "Password must contain at least one special character",
        }),
    confirmPassword: z
        .string()
        .nonempty("Confirm Password is required"),
    firstName: z
        .string()
        .nonempty("First Name is required")
        .min(2, "First Name must be at least 2 characters long"),
    lastName: z
        .string()
        .nonempty("Last Name is required")
        .min(2, "Last Name must be at least 2 characters long"),
    age: z
        .number()
        .min(0, "Age must be a positive number")
        .max(120, "Age must be less than or equal to 120")
        .nullable()
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['confirmPassword'],
            message: "Passwords do not match",
        });
    }
});