import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { CourseServices } from "@/services/course.services";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const course = await CourseServices.getCourseDetail(slug);

  if (!course) {
    redirect("/");
  }

  return (
    <main>
      <Header />
      <section className="space-y-4 bg-indigo-950 p-24 text-white">
        <h3>{course.title}</h3>
        <h4 className="w-1/2 whitespace-pre-line text-indigo-200">{course.description}</h4>
      </section>
      <section className="mx-24 my-12 grid grid-cols-3 gap-12">
        <div className="col-span-2 space-y-4">
          {course.sections.map((section) => {
            return (
              <div key={section.id} className="space-y-4">
                <h4>{section.title}</h4>
                <div className="space-y-4">
                  {section.lessons.map((lesson) => {
                    return (
                      <Card key={lesson.id}>
                        <div>{lesson.title}</div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="space-y-4">
          <Image
            src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/nextlms/courses/${course.id}/${course.coverImage}`}
            alt={course.title}
            width={1000}
            height={500}
            className="rounded-xl"
          />
          <h5>{course.sections.length} Sections</h5>
          <h5>{course.sections.reduce((acc, section) => acc + section.lessons.length, 0)} Lessons</h5>
          <Button>Buy {course.flashSales ? course.flashSales.newAmount : course.price}</Button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
