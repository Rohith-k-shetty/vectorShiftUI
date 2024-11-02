import { BaseNode } from "./BaseNode";
import { Position } from "reactflow";

export const OutputNode = ({ id, data }) => {
  const fields = [
    {
      name: "Name",
      type: "text",
      default: data?.outputName || id.replace("customOutput-", "output_"), // Default value for the name
    },
    {
      name: "Type",
      type: "select",
      default: data.outputType || "Text",
      options: ["Text", "File"], // Options for the output type
    },
  ];

  const handles = [
    {
      id: `${id}-value`,
      type: "target",
      position: Position.Left,
    },
  ];

  return <BaseNode label="Output" fields={fields} handles={handles} id={id} />;
};
