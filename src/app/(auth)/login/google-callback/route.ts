"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { z } from "zod";

import { UserServices } from "@/services/user.services";
import { google } from "@/utils/arctic";

const codeSchema = z.object({
  code: z.string().min(1),
  codeCookies: z.string().min(1),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const codeCookies = (await cookies()).get("code")?.value;

  const validation = codeSchema.safeParse({ code, codeCookies });

  if (!validation.success) {
    return redirect("/login");
  }

  const tokens = await google.validateAuthorizationCode(validation.data.code, validation.data.codeCookies);

  const user = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`,
    },
  }).then((data) => data.json() as Promise<Record<string, string>>);

  // find user in db
  const findUser = await UserServices.findUser(user.email);

  // if user not found, create user
  if (!findUser) {
    const newUser = await UserServices.createUser({
      name: user.name,
      email: user.email,
      password: "",
      isVerified: true,
    });

    // create jwt token
    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatarUrl: newUser.avatarUrl,
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);

    (await cookies()).set("token", jwtToken, {
      httpOnly: true,
      path: "/",
    });

    return redirect("/my-courses");
  }

  // create jwt token
  const payload = {
    id: findUser.id,
    name: findUser.name,
    email: findUser.email,
    role: findUser.role,
    avatarUrl: findUser.avatarUrl,
  };

  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);

  (await cookies()).set("token", jwtToken, {
    httpOnly: true,
    path: "/",
  });

  redirect("/my-courses");
}
