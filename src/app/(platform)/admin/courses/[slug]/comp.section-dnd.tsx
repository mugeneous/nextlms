"use client";

import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { startTransition, useOptimistic } from "react";

import { CourseServices } from "@/services/course.services";

import UpdateSectionIndexAction from "./action.edit-section-index";
import { SectionCard } from "./comp.section-card";

interface Props {
  course: Awaited<ReturnType<typeof CourseServices.getCourseDetail>>;
}

const Sections = ({ course }: Props) => {
  const [optimisticState, setOptimisticState] = useOptimistic(course?.sections);

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    if (!course?.sections) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const newSections = [...course.sections];
    const [movedSection] = newSections.splice(sourceIndex, 1);
    newSections.splice(destinationIndex, 0, movedSection);

    const reorderedSections = newSections.map((section, index) => ({
      ...section,
      index: index,
    }));

    startTransition(() => setOptimisticState(reorderedSections));

    const formData = new FormData();
    formData.append("sourceIndex", sourceIndex.toString());
    formData.append("destinationIndex", destinationIndex.toString());
    formData.append("courseId", course.id);

    await UpdateSectionIndexAction(formData);
  }

  return (
    <DragDropContext onDragEnd={(result) => void onDragEnd(result)}>
      <Droppable droppableId="sections">
        {(droppableProvided) => {
          return (
            <section className="space-y-2" {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
              {optimisticState?.map((section, index) => {
                return <SectionCard key={section.id} section={section} index={index} />;
              })}
              {droppableProvided.placeholder}
            </section>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Sections;
