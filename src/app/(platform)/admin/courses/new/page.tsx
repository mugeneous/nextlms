"use client";

import Image from "next/image";
import { ChangeEvent, useActionState, useState } from "react";

import { Button } from "@/components/button";
import { FileInput } from "@/components/file-input";
import { Input } from "@/components/input";
import { TextArea } from "@/components/textarea";

import createCourseAction from "./action";

export default function Page() {
  const [state, formAction, pending] = useActionState(createCourseAction, null);
  const [preview, setPreview] = useState<string>("");

  function handleCreatePreview(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const file = event.target.files[0];
    setPreview(URL.createObjectURL(file));
  }

  return (
    <main className="m-auto max-w-lg space-y-6">
      <section>
        <h3>Create new course</h3>
      </section>
      <section>
        <form action={formAction}>
          {preview && <Image src={preview} width={800} height={300} alt="Course cover" className="rounded-lg" />}
          <FileInput name="coverImage" placeholder="Choose the course cover" onChange={handleCreatePreview} />
          <Input name="title" placeholder="Course title" />
          <TextArea name="description" placeholder="Course description" />
          <Input name="price" placeholder="Course price" />
          <Button disabled={pending}>Save Draft</Button>
          {state?.errors?.title && <div className="msg msg-error">{state.errors.title}</div>}
          {state?.errors?.description && <div className="msg msg-error">{state.errors.description}</div>}
          {state?.errors?.price && <div className="msg msg-error">{state.errors.price}</div>}
          {state?.errors?.coverImage && <div className="msg msg-error">{state.errors.coverImage}</div>}
          {state?.status === "error" && state.message && <div className="msg msg-error">{state.message}</div>}
        </form>
      </section>
    </main>
  );
}
