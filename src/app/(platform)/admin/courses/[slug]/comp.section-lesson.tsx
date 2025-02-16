"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Lesson } from "@prisma/client";
import { useSetAtom } from "jotai";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { isLessonEditModalOpenAtom, lessonDetailAtom } from "@/context/atom";

import DeleteLessonAction from "./action.delete-lesson";
import LessonEditForm from "./comp.edit-lesson";

interface Props {
  lesson: Lesson;
  index: number;
}

export const SectionLesson = ({ lesson, index }: Props) => {
  const openModal = useSetAtom(isLessonEditModalOpenAtom);
  const lessonDetail = useSetAtom(lessonDetailAtom);

  return (
    <Draggable draggableId={lesson.id} index={index}>
      {(provided) => {
        return (
          <Card className="p-2" {...provided.draggableProps} ref={provided.innerRef}>
            <section className="flex items-center justify-between">
              <div className="ml-2 flex gap-2">
                <div {...provided.dragHandleProps}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                    <path
                      d="M8 6H8.00635M8 12H8.00635M8 18H8.00635M15.9937 6H16M15.9937 12H16M15.9937 18H16"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>{lesson.title}</div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    openModal(true);
                    lessonDetail(lesson);
                  }}
                  size="sm"
                  variant="secondary"
                  className="w-fit"
                >
                  Edit
                </Button>
                <form action={DeleteLessonAction}>
                  <input type="hidden" name="lessonId" value={lesson.id} />
                  <Button size="sm" variant="secondary" className="w-fit">
                    Delete
                  </Button>
                </form>
              </div>
            </section>
            <LessonEditForm />
          </Card>
        );
      }}
    </Draggable>
  );
};
