import { Course } from "@prisma/client";

import { prisma } from "@/utils/prisma";

export const CourseServices = {
  createCourse: async (course: Pick<Course, "title" | "description" | "price" | "coverImage">) => {
    try {
      const slug = course.title.toLowerCase().replace(/ /g, "-");

      const newCourse = await prisma.course.create({
        data: {
          title: course.title,
          slug,
          description: course.description,
          price: course.price,
          coverImage: course.coverImage,
        },
      });
      return newCourse;
    } catch (error) {
      console.log(error);
    }
  },
};
