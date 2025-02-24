import { prisma } from "@/utils/prisma";

export const CertificateServices = {
  getAll: async () => {
    const Certificates = await prisma.certificate.findMany({
      include: {
        user: true,
        course: true,
      },
    });

    return Certificates;
  },
  approveCertificate: async (certificateId: string) => {
    await prisma.certificate.update({
      where: {
        id: certificateId,
      },
      data: {
        status: "APPROVED",
      },
    });
  },
};
