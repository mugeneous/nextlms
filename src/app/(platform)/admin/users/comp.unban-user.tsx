"use client";

import { useActionState } from "react";

import { Button } from "@/components/button";

import UnbanUserAction from "./action.unban-user";

export const UnbanUser = ({ userId }: { userId: string }) => {
  const [_, formAction, pending] = useActionState(UnbanUserAction, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="userId" defaultValue={userId} />
      <Button disabled={pending} variant="secondary" size="sm" className="w-fit">
        Unban
      </Button>
    </form>
  );
};
