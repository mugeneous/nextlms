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
  createSection: async (courseId: string) => {
    await prisma.section.create({
      data: {
        title: "New Section",
        courseId,
      },
    });
  },
  getAllCourses: async () => {
    const courses = await prisma.course.findMany({
      orderBy: {
        title: "asc",
      },
    });

    return courses;
  },
  getCourseDetail: async (idOrslug: string) => {
    const course = prisma.course.findFirst({
      where: {
        OR: [
          {
            id: idOrslug,
          },
          {
            slug: idOrslug,
          },
        ],
      },
      include: {
        sections: {
          include: {
            lessons: true,
          },
        },
      },
    });

    return course;
  },
};
