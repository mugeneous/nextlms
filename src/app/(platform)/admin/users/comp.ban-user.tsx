"use client";

import { useActionState } from "react";

import { Button } from "@/components/button";

import banUserAction from "./action.ban-user";

export function BanUser({ userId }: { userId: string }) {
  const [_, formAction, pending] = useActionState(banUserAction, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="userId" defaultValue={userId} />
      <Button variant="danger" disabled={pending} size="sm" className="w-fit">
        Ban
      </Button>
    </form>
  );
}
