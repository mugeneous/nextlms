import Link from "next/link";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

export default function Page() {
  return (
    <>
      <section>
        <h3>Login</h3>
        <p>Welcome back!</p>
      </section>
      <form className="space-y-2">
        <Input name="email" placeholder="Email" />
        <Input name="password" placeholder="Password" type="password" />
        <Button>Login</Button>
      </form>
      <section>
        <p>
          Don&apos;t have an account ? <Link href="/register">Register</Link>
        </p>
      </section>
    </>
  );
}
