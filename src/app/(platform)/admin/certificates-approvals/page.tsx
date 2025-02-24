import { Button } from "@/components/button";
import { CertificateServices } from "@/services/certificate.services";

import ApproveCertificateAction from "./action";

export default async function Page() {
  const certificates = await CertificateServices.getAll();

  return (
    <main className="space-y-6 pt-12">
      <section>
        <h3 className="pl-12">Sertificates</h3>
      </section>
      <section>
        <table className="w-full table-auto">
          <thead className="border-y border-slate-200">
            <tr className="text-left">
              <th className="py-5 pl-12">Course</th>
              <th>User</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="border-y">
            {certificates.map((cert) => {
              return (
                <tr key={cert.id}>
                  <td className="py-5 pl-12">{cert.course.title}</td>
                  <td>{cert.user.name}</td>
                  <td>{cert.status}</td>
                  <td>
                    <form action={ApproveCertificateAction}>
                      <input type="hidden" name="certificateId" defaultValue={cert.id} />
                      <Button size="sm" className="w-fit">
                        Approve
                      </Button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
