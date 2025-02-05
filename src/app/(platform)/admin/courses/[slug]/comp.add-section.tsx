import { Button } from "@/components/button";

import AddSectionAction from "./action.add-section";

export const AddSectionBtn = ({ courseId }: { courseId: string }) => {
  return (
    <form action={AddSectionAction}>
      <input name="courseId" value={courseId} type="hidden" required />
      <Button variant="secondary" size="sm">
        Add section
      </Button>
    </form>
  );
};
