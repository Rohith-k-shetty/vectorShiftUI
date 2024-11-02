import { BaseNode } from "./BaseNode";
import { Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const fields = [
    {
      name: "Text",
      type: "text",
      default: data?.text || "{{input}}", // Default value for text input
    },
  ];

  const handles = [
    {
      id: `${id}-output`,
      type: "source",
      position: Position.Right,
      name: "output",
    },
  ];

  return <BaseNode label="Text" fields={fields} handles={handles} id={id} />;
};
