import { Lesson, Section } from "@prisma/client";
import { atom } from "jotai";

export const isLessonEditModalOpenAtom = atom(false);
export const lessonDetailAtom = atom<Lesson | null>(null);

export const isSectionEditModalOpenAtom = atom(false);
export const sectionDetailAtom = atom<Section | null>(null);
