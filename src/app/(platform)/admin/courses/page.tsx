import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/button";
import { CourseServices } from "@/services/course.services";

export default async function Page() {
  const courses = await CourseServices.getAllCourses();

  return (
    <main className="space-y-8">
      <section className="flex justify-between">
        <h3>Courses</h3>
        <Link href="/admin/courses/new">
          <Button size="sm" className="w-fit">
            Create course
          </Button>
        </Link>
      </section>
      <section className="grid grid-cols-4 gap-6">
        {courses.map((course) => {
          return (
            <div key={course.id} className="relative overflow-hidden rounded-xl border bg-white shadow-sm">
              <Image
                src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/nextlms/courses/${course.id}/${course.coverImage}`}
                className="rounded-lg"
                alt={course.title}
                width={1000}
                height={500}
              />
              <section className="space-y-3 p-4">
                <div>{course.title}</div>
                <div className="grid grid-cols-2 gap-3">
                  <Button size="sm">Stats</Button>
                  <Link href={`/admin/courses/${course.slug}`}>
                    <Button size="sm">Edit content</Button>
                  </Link>
                </div>
              </section>
            </div>
          );
        })}
      </section>
    </main>
  );
}
