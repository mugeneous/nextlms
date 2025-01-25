import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/button";

const meta = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger"],
    },
    size: {
      control: { type: "select" },
      options: ["lg", "md", "sm"],
    },
    children: {
      control: "text",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonPrimary: Story = {
  args: {
    variant: "primary",
    children: "create course",
  },
};

export const ButtonSecondary: Story = {
  args: {
    variant: "secondary",
    children: "create course",
  },
};
export const ButtonDanger: Story = {
  args: {
    variant: "danger",
    children: "create course",
  },
};
