"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

import { registerAction } from "./action";

export default function Page() {
  const [state, formAction, pending] = useActionState(registerAction, null);
  return (
    <>
      <section>
        <h3>Register</h3>
        <p>Create an account to gete started</p>
      </section>
      <form action={formAction} className="space-y-2">
        <Input name="name" placeholder="Name" />
        <Input name="email" placeholder="Email" />
        <Input name="password" placeholder="Password" type="password" />
        <Button disabled={pending}>Register</Button>
        {state?.status === "success" ? <div>{state.message}</div> : null}
      </form>
      <section>
        <p>
          Have an account ? <Link href="/login">Login</Link>
        </p>
      </section>
    </>
  );
}
