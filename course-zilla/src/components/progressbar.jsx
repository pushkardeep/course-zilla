import { Progress } from "flowbite-react";

export function Progressbar({ value }) {
  return (
    <Progress
      progress={value}
      progressLabelPosition="outside"
      textLabel="Progress"
      textLabelPosition="outside"
      size="md"
      labelProgress
      labelText
    />
  );
}
