import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

export const Default = {
  args: {
    children: "Create",
  },
} satisfies StoryObj<typeof meta>;
