"use server"

import { generateCodeVerifier, generateState } from "arctic"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import {google} from "@/utils/arctic"

export async function loginWithGoogleAction(_: FormData) {
    const state = generateState();
    const code = generateCodeVerifier();

    (await cookies()).set("code", code);

    const url = google.createAuthorizationURL(state, code, ["profile", "email"]
    )

    redirect(url.href)


}