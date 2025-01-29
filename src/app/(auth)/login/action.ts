"use server"

import bcrypt from "bcrypt"
import z from "zod"

import { UserServices } from "@/services/user.services";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be atleast 8 chars")
});

export async function loginAction(prevState: unknown, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const inputValidation = loginSchema.safeParse({email, password});

    if(!inputValidation.success){
        return {
            status: "error",
            errors: inputValidation.error.flatten().fieldErrors,
            data: {
                email,
                password
            }
        }
    }

    const user = await UserServices.findUser(email);

    if(!user) {
        return {
            status: "error",
            message: "User not found",
            data: {
                email,
                password
            }
        }
    }

    if(!user.isVerified){
        return {
            status: "error",
            message: "Verify your account",
            data: {
                email,
                password
            }
        }
    }

    if(!user.password) {
        return {
            status: "error",
            message: "You might create your account with google, please try continue with google",
            data: {
                email,
                password
            }
        }
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch) {
        return {
            status: "error",
            message: "invalid credentials",
            data: {
                email,
                password
            }
        }
    }
}