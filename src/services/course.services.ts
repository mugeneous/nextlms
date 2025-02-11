import { Course, Lesson } from "@prisma/client";

import generateSlug from "@/libs/generate-slug";
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

      const slug = generateSlug(`New lesson ${(totalLesson + 1).toString()}`);

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
  updateLesson: async (lesson: Pick<Lesson, "id" | "title" | "videoUrl">) => {
    const slug = generateSlug(lesson.title);

    await prisma.lesson.update({
      where: {
        id: lesson.id,
      },
      data: {
        id: lesson.id,
        title: lesson.title,
        slug: slug,
        videoUrl: lesson.videoUrl,
      },
    });
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
