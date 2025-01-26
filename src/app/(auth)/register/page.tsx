import Link from "next/link";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

export default function Page() {
  return (
    <>
      <section>
        <h3>Register</h3>
        <p>Create an account to gete started</p>
      </section>
      <form className="space-y-2">
        <Input name="name" placeholder="Name" />
        <Input name="email" placeholder="Email" />
        <Input name="password" placeholder="Password" type="password" />
        <Button>Register</Button>
      </form>
      <section>
        <p>
          Have an account ? <Link href="/login">Login</Link>
        </p>
      </section>
    </>
  );
}
