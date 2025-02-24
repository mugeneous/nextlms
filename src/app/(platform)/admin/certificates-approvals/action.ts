"use server";

import { revalidatePath } from "next/cache";

import { CertificateServices } from "@/services/certificate.services";

export default async function ApproveCertificateAction(formData: FormData) {
  const certificateId = formData.get("certificateId") as string;

  await CertificateServices.approveCertificate(certificateId);

  revalidatePath("/admin/certificate-approvals");
}
