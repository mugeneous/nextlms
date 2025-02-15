import { redirect } from "next/navigation";

import { Button } from "@/components/button";
import { CourseServices } from "@/services/course.services";

import { AddSectionBtn } from "./comp.add-section";
import Sections from "./comp.section-dnd";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const course = await CourseServices.getCourseDetail(slug);

  if (!course) {
    redirect("/admin/courses");
  }

  return (
    <main className="m-auto max-w-2xl space-y-8">
      <section className="space-y-2">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <Button size="sm" className="w-fit">
          Publish Course
        </Button>
      </section>
      <section className="space-y-2">
        <AddSectionBtn courseId={course.id} />
        <Sections course={course} />
      </section>
    </main>
  );
}
