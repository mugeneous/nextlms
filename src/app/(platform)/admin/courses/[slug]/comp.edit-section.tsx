"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAtom, useAtomValue } from "jotai";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { isSectionEditModalOpenAtom, sectionDetailAtom } from "@/context/atom";

import UpdateSectionForm from "./action.edit-section";

const SectionEditForm = () => {
  const sectionDetail = useAtomValue(sectionDetailAtom);
  const [isModalOpen, SetIsModalOpen] = useAtom(isSectionEditModalOpenAtom);

  return (
    <Dialog open={isModalOpen} onClose={() => SetIsModalOpen(false)} className="relative">
      <div className="fixed inset-0 flex items-center justify-center bg-black/10">
        <DialogPanel className="w-[400px] rounded-lg bg-white p-12">
          <DialogTitle className="text-xl font-medium tracking-tight">Edit Section</DialogTitle>
          <form
            action={async (formData) => {
              await UpdateSectionForm(formData);
              SetIsModalOpen(false);
            }}
            className="space-y-2"
          >
            <input type="hidden" name="sectionId" defaultValue={sectionDetail?.id} />
            <Input name="title" defaultValue={sectionDetail?.title} />
            <Button>Save</Button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default SectionEditForm;
