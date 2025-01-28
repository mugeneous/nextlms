"use server";

import bcrypt from "bcrypt"
import z from "zod";

import { UserServices } from "@/services/user.services";
import { generateVerificationCode } from "@/libs/generate-verification-code";
import { EmailServices } from "@/services/email.services";

const registerSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function registerAction(prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const inputValidation = registerSchema.safeParse({ name, email, password });

  if (!inputValidation.success) {
    return {
      status: "error",
      errors: inputValidation.error.flatten().fieldErrors,
      data: {
        name,
        email,
        password,
      },
    };
  }

  try {
    const hashPassword = await bcrypt.hash(password, 13)
    const user = await UserServices.createUser({ name, email, password: hashPassword });
    const verificationCode = generateVerificationCode()

    await UserServices.CreateVerificationCode(user.id, verificationCode)
    await EmailServices.sendVerificationCode(user.id, verificationCode)

    return {
      status: "success",
      message: "Register success!",
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      status: "error",
      message: "Register error!",
    };
  }
}
