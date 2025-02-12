import { Lesson, Section } from "@prisma/client";

import { Button } from "@/components/button";
import { Card } from "@/components/card";

import DeleteSectionAction from "./action.delete-section";
import { AddLessonBtn } from "./comp.add-lesson";
import { SectionLesson } from "./comp.section-lesson";

interface Props {
  section: Section & { lessons: Lesson[] };
}

export const SectionCard = ({ section }: Props) => {
  return (
    <Card className="p-0">
      <section className="flex items-center justify-between p-2">
        <div className="ml-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
            <path
              d="M8 6H8.00635M8 12H8.00635M8 18H8.00635M15.9937 6H16M15.9937 12H16M15.9937 18H16"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>{section.title}</div>
        </div>
        <div className="m-0 flex gap-2">
          <Button size="sm" variant="secondary" className="w-fit">
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
    </Card>
  );
};
