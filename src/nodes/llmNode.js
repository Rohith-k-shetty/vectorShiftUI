import { BaseNode } from "./BaseNode";
import { Position } from "reactflow";

export const LLMNode = ({ id }) => {
  const fields = []; // No input fields for LLMNode

  const handles = [
    {
      id: `${id}-system`,
      type: "target",
      position: Position.Left,
      style: { top: `${100 / 3}%` },
    },
    {
      id: `${id}-prompt`,
      type: "target",
      position: Position.Left,
      style: { top: `${200 / 3}%` },
    },
    {
      id: `${id}-response`,
      type: "source",
      position: Position.Right,
    },
  ];

  return <BaseNode label="LLM" fields={fields} handles={handles} id={id} />;
};
