import { Lesson } from "@prisma/client";
import { atom } from "jotai";

export const isLessonEditModalOpenAtom = atom(false);
export const lessonDetailAtom = atom<Lesson | null>(null);
