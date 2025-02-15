"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Lesson, Section } from "@prisma/client";
import { useSetAtom } from "jotai";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { isSectionEditModalOpenAtom, sectionDetailAtom } from "@/context/atom";

import DeleteSectionAction from "./action.delete-section";
import { AddLessonBtn } from "./comp.add-lesson";
import SectionEditForm from "./comp.edit-section";
import { SectionLesson } from "./comp.section-lesson";

interface Props {
  section: Section & { lessons: Lesson[] };
  index: number;
}

export const SectionCard = ({ section, index }: Props) => {
  const setSectionModal = useSetAtom(isSectionEditModalOpenAtom);
  const setSectionDetail = useSetAtom(sectionDetailAtom);

  return (
    <Draggable draggableId={section.id} index={index}>
      {(draggableProvider) => {
        return (
          <Card className="p-0" {...draggableProvider.draggableProps} ref={draggableProvider.innerRef}>
            <section className="flex items-center justify-between p-2">
              <div className="ml-2 flex items-center gap-2">
                <div {...draggableProvider.dragHandleProps}>
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
                <div>{section.title}</div>
              </div>
              <div className="m-0 flex gap-2">
                <Button
                  onClick={() => {
                    setSectionDetail(section);
                    setSectionModal(true);
                  }}
                  size="sm"
                  variant="secondary"
                  className="w-fit"
                >
                  Edit
                </Button>
                <form action={DeleteSectionAction}>
                  <input type="hidden" name="sectionId" defaultValue={section.id} />
                  <Button disabled={section.lessons.length > 0} size="sm" variant="secondary" className="w-fit">
                    Delete
                  </Button>
                </form>
                <AddLessonBtn id={section.id} />
              </div>
            </section>
            <section className="space-y-2 bg-slate-50 p-2">
              {section.lessons.map((lesson) => {
                return <SectionLesson key={lesson.id} lesson={lesson} />;
              })}
            </section>
            <SectionEditForm />
          </Card>
        );
      }}
    </Draggable>
  );
};
