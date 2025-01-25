"use client";

import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const style = tv({
  base: "block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold shadow-md shadow-slate-100 transition duration-200 placeholder:font-normal  focus:outline-indigo-500 focus:ring focus:ring-slate-100",
});

type TInput = VariantProps<typeof style>;
interface Props extends TInput, React.ComponentPropsWithRef<"input"> {}

export const Input = (props: Props) => {
  return <input {...props} className={twMerge(style({ ...props }), props.className)} />;
};
