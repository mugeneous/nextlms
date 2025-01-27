"use server";

import z from "zod";

import { UserServices } from "@/services/user.services";

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
    await UserServices.createUser({ name, email, password });

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

  return {
    status: "success",
    message: "Register success!",
  };
}
