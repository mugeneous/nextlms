import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/components/input";

const meta = {
  title: "Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  args: {
    placeholder: "input your text",
  },
};

export const TextPassword: Story = {
  args: {
    placeholder: "input your text",
    type: "password",
  },
};
