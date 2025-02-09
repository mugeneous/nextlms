import { redirect } from "next/navigation";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { CourseServices } from "@/services/course.services";

import { AddLessonBtn } from "./comp.add-lesson";
import { AddSectionBtn } from "./comp.add-section";

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
        <section className="space-y-2">
          {course.sections.map((section) => {
            return (
              <Card key={section.id} className="p-0">
                <div className="flex items-center justify-between p-2">
                  <div className="ml-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                      <path
                        d="M8 6H8.00635M8 12H8.00635M8 18H8.00635M15.9937 6H16M15.9937 12H16M15.9937 18H16"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>{section.title}</div>
                  </div>
                  <div className="m-0 flex gap-2">
                    <Button size="sm" variant="secondary" className="w-fit">
                      Edit
                    </Button>
                    <Button size="sm" variant="secondary" className="w-fit">
                      Delete
                    </Button>
                    <AddLessonBtn id={section.id} />
                  </div>
                </div>
                {section.lessons.map((lesson) => {
                  return <div key={lesson.id}>{lesson.title}</div>;
                })}
              </Card>
            );
          })}
        </section>
      </section>
    </main>
  );
}
