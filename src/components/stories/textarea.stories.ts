import type { Meta, StoryObj } from "@storybook/react";

import { TextArea as TextAreaComponent } from "../textarea";

const meta = {
  title: "Text Area",
  component: TextAreaComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextAreaComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextArea: Story = {
  args: {
    placeholder: "input text here",
  },
};
