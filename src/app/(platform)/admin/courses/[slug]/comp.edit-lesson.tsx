"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAtom, useAtomValue } from "jotai";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { isLessonEditModalOpenAtom, lessonDetailAtom } from "@/context/atom";

import UploadLessonAction from "./action.edit-lesson";

const LessonEditForm = () => {
  const [isOpen, setIsOpen] = useAtom(isLessonEditModalOpenAtom);
  const lessonDetail = useAtomValue(lessonDetailAtom);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative">
      <div className="fixed inset-0 flex items-center justify-center bg-black/10">
        <DialogPanel className="w-[400px] rounded-lg bg-white p-12">
          <DialogTitle className="text-xl font-medium tracking-tight">Edit Lesson</DialogTitle>
          <form
            action={async (formData) => {
              await UploadLessonAction(formData);
              setIsOpen(false);
            }}
            className="space-y-2"
          >
            <input name="lessonId" type="hidden" defaultValue={lessonDetail?.id} />
            <Input name="title" defaultValue={lessonDetail?.title} />
            <Input name="videoUrl" defaultValue={lessonDetail?.videoUrl} />
            <Button>Save</Button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default LessonEditForm;
