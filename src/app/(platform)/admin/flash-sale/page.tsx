import Image from "next/image";

import { Button } from "@/components/button";
import { currencyFormat } from "@/libs/currencyFormat";
import { CourseServices } from "@/services/course.services";
import { FlashSaleServices } from "@/services/flashsale.services";

import { SaleForm } from "./comp.sale-form";

export default async function Page() {
  const courses = await CourseServices.getAllCourses();
  const flashSales = await FlashSaleServices.getAllFlashSale();

  return (
    <main className="m-auto max-w-xl space-y-4 py-12">
      <h1 className="text-2xl font-medium tracking-tight">Flash Sale</h1>
      <SaleForm courses={courses} />
      {flashSales.map((flashSale) => {
        return (
          <section key={flashSale.id} className="flex items-center gap-6 overflow-hidden rounded-xl border p-4">
            <div>
              <Image
                alt={flashSale.course.title}
                src={`${process.env.R2_PUBLIC_URL}/nextlms/courses/${flashSale.course.id}/${flashSale.course.coverImage}`}
                width={200}
                height={100}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <h4>{flashSale.course.title}</h4>
              <p>{currencyFormat(flashSale.newAmount)}</p>
              <Button variant="danger" size="sm">
                Delete sale
              </Button>
            </div>
          </section>
        );
      })}
    </main>
  );
}
