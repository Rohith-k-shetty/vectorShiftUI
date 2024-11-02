import { BaseNode } from "./BaseNode";
import { Position } from "reactflow";

export const InputNode = ({ id, data }) => {
  const fields = [
    {
      type: "text",
      name: "Name",
      default: data?.inputName || id.replace("customInput-", "input_"),
    },
    {
      type: "select",
      name: "Type",
      options: ["Text", "File"],
      default: data?.inputType || "Text",
    },
  ];

  const handles = [
    {
      id: `${id}-value`,
      type: "source",
      position: Position.Right,
      style: { top: 50 },
    },
  ];

  return <BaseNode label="Input" fields={fields} handles={handles} id={id} />;
};
