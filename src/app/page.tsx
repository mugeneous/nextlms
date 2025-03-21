import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/button";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { currencyFormat } from "@/libs/currencyFormat";
import { CourseServices } from "@/services/course.services";

export default async function Home() {
  const courses = await CourseServices.getAllCourses();

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <Header />
      <section className="flex min-h-96 flex-col items-center justify-center space-y-32 py-32">
        <div className="max-w-4xl space-y-4 text-center">
          <h1 className="text-balance">Make knowledge investment for your future</h1>
          <h3 className="text-slate-500">Start learning with nextlms.</h3>
        </div>
        <div className="m-w-4xl m-auto grid grid-cols-6 items-center gap-12">
          <Image src="/logo/google.svg" alt="google logo" height={100} width={100} />
          <Image src="/logo/asana.png" alt="asana logo" height={100} width={100} />
          <Image src="/logo/meta.svg" alt="meta logo" height={100} width={100} />
          <Image src="/logo/netflix.svg" alt="netflix logo" height={100} width={100} />
          <Image src="/logo/linkedin.png" alt="linkedin logo" height={100} width={100} />
          <Image src="/logo/spotify.png" alt="spotify logo" height={100} width={100} />
        </div>
      </section>
      <section className="mx-32 space-y-12 rounded-2xl bg-indigo-600 p-24 text-white">
        <div className="m-auto max-w-2xl space-y-6 text-balance text-center">
          <h2>Learning in better way, with our courses could boost your skillset</h2>
          <h4>Nextlms. is a platform where you can learning anything!</h4>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {courses.map((course) => {
            return (
              <section key={course.id} className="relative space-y-4">
                <h4>{course.title}</h4>
                <div className="overflow-hidden rounded-xl bg-white">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/nextlms/courses/${course.id}/${course.coverImage}`}
                    alt={course.title}
                    width={1000}
                    height={500}
                  />
                </div>
                {course.flashSales?.id && (
                  <div className="absolute right-4 top-4 z-10 rounded-lg bg-slate-950 px-4 py-2 font-bold text-white">Flash Sale!</div>
                )}
                <div className="grid grid-cols-3 gap-2">
                  <Button className="col-span-2 shadow-gray-600" size="sm" variant="secondary">
                    Buy {course.flashSales?.id ? currencyFormat(course.flashSales.newAmount) : currencyFormat(course.price)}
                  </Button>
                  <Link href={course.slug}>
                    <Button className="shadow-gray-600" size="sm" variant="secondary">
                      View
                    </Button>
                  </Link>
                </div>
              </section>
            );
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
}
