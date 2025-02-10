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
  createLesson: async (sectionId: string) => {
    try {
      console.log(sectionId);
      const totalLesson = await prisma.lesson.count({
        where: {
          sectionId: sectionId,
        },
      });

      const slug = `New lesson ${(totalLesson + 1).toString()}`
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");

      // const cek = {
      //   sectionId: sectionId,
      //   title: `New lesson ${(totalLesson + 1).toString()}`,
      //   slug: slug,
      //   videoUrl: "-",
      //   index: totalLesson,
      // };

      // console.log({ cek });
      await prisma.lesson.create({
        data: {
          sectionId: sectionId,
          title: `New lesson ${(totalLesson + 1).toString()}`,
          slug: slug,
          videoUrl: "-",
          index: totalLesson,
        },
      });
    } catch (error) {
      console.log(error);
    }
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
  deleteLesson: async (lessonId: string) => {
    try {
      await prisma.lesson.delete({
        where: {
          id: lessonId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
