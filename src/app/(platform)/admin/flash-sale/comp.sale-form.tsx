"use client";

import { Course } from "@prisma/client";
import { useActionState } from "react";

import { Button } from "@/components/button";
import { Input, Select } from "@/components/input";

import CreateSaleAction from "./action.create-sale";

interface Props {
  courses: Course[];
}

export const SaleForm = ({ courses }: Props) => {
  const [_, formAction, pending] = useActionState(CreateSaleAction, null);

  return (
    <form action={formAction} className="space-y-2">
      <Input type="number" name="newAmount" placeholder="New amount" />
      <Select name="courseId">
        {courses.map((course) => {
          return (
            <option value={course.id} key={course.id}>
              {course.title}
            </option>
          );
        })}
      </Select>
      <Button disabled={pending}>Create sale</Button>
    </form>
  );
};
