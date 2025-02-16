import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Lesson, Section } from "@prisma/client";
import { startTransition, useOptimistic } from "react";

import UpdateLessonIndexAction from "./action.edit-lesson-index";
import { SectionLesson } from "./comp.section-lesson";

interface Props {
  section: Section & { lessons: Lesson[] };
}

const Lessons = ({ section }: Props) => {
  const [optimisticState, setOptimisticState] = useOptimistic(section.lessons);

  async function onDragEnd(result: DropResult) {
    if (!result.destination?.index) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const newLessons = [...section.lessons];
    const [movedLesson] = newLessons.splice(sourceIndex, 1);
    newLessons.splice(destinationIndex, 0, movedLesson);

    const reorderedLessons = newLessons.map((lesson, index) => ({
      ...lesson,
      index: index,
    }));

    startTransition(() => setOptimisticState(reorderedLessons));

    const formData = new FormData();
    formData.append("sectionId", section.id);
    formData.append("sourceIndex", sourceIndex.toString());
    formData.append("destinationIndex", destinationIndex.toString());

    await UpdateLessonIndexAction(formData);
  }

  return (
    <DragDropContext onDragEnd={(result) => void onDragEnd(result)}>
      <Droppable droppableId="lessons">
        {(provided) => {
          return (
            <section className="space-y-2 bg-slate-50 p-2" {...provided.droppableProps} ref={provided.innerRef}>
              {optimisticState.map((lesson, index) => {
                return <SectionLesson key={lesson.id} lesson={lesson} index={index} />;
              })}
              {provided.placeholder}
            </section>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Lessons;
