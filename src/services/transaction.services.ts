import { prisma } from "@/utils/prisma";

import { CourseServices } from "./course.services";
import { UserServices } from "./user.services";

const TransactionServices = {
  createTransaction: async (userId: string, courseId: string, amount: number) => {
    const courseDetail = await CourseServices.getCourseDetail(courseId);

    if (!courseDetail) {
      throw new Error("Course not found!");
    }

    const user = await UserServices.findUser(userId);

    const res = await fetch("https://api.mayar.club/hl/v1/payment/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAYAR_SANDBOX_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: user?.name,
        email: user?.email,
        amount: amount,
        description: `payment for ${courseDetail.title}`,
        mobile: "0000000000",
      }),
    });

    const data = (await res.json()) as { data: { link: string; id: string } };
    console.log(data);

    const transaction = await prisma.transaction.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        course: {
          connect: {
            id: courseId,
          },
        },
        amount: amount,
        paymentStatus: "UNPAID",
        paymentLink: data.data.link,
        transactionId: data.data.id,
      },
    });

    return transaction;
  },
};

export default TransactionServices;
