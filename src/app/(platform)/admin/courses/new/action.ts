"use server";

import { File } from "node:buffer";

import { redirect } from "next/navigation";
import { z } from "zod";

import { CourseServices } from "@/services/course.services";
import { uploadFile } from "@/utils/aws";

const courseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number({ invalid_type_error: "Price must be a number" }).min(1, "Price must be greater or equal to 1"),
  coverImage: z
    .custom<File>()
    .refine((file) => file instanceof File, "Must be instance of File")
    .refine((file) => file.size > 0, "File cannot be empty")
    .refine((file) => file.type.startsWith("image/"), "File must be an image")
    .refine((file) => file.size <= 5 * 1024 * 1024, "Image must be less than 5MB")
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), "Only JPEG and PNG images are allowed"),
});

export default async function createCourseAction(prevState: unknown, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const coverImage = formData.get("coverImage");
  console.log(coverImage);

  const validation = courseSchema.required().safeParse({
    title,
    description,
    price,
    coverImage,
  });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        title,
        description,
        price,
        coverImage,
      },
    };
  }

  const newCourse = await CourseServices.createCourse({
    title: validation.data.title,
    description: validation.data.description,
    price: validation.data.price,
    coverImage: validation.data.coverImage.name,
  });

  if (!newCourse) {
    return {
      status: "error",
      message: "Error creating course",
    };
  }

  await uploadFile({
    key: newCourse.coverImage,
    body: validation.data.coverImage,
    folder: `courses/${newCourse.id}`,
  });

  redirect(`/admin/courses/${newCourse.id}`);
}
