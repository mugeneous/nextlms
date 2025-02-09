import { Button } from "@/components/button";

import AddLessonAction from "./action.add-lesson";

export const AddLessonBtn = ({ id }: { id: string }) => {
  return (
    <form action={AddLessonAction}>
      <input type="hidden" name="sectionId" value={id} />
      <Button size="sm" className="w-fit">
        Add lesson
      </Button>
    </form>
  );
};
