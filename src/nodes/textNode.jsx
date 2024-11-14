import { BaseNode } from "./BaseNode";
import { Position } from "reactflow";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

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

  return (
    <BaseNode
      label="Text"
      fields={fields}
      handles={handles}
      id={id}
      infoText={
        "This is a text node where user Enter the text for the pipeline"
      }
      icon={<TextSnippetIcon sx={{ fontSize: 20, color: "#5b6e91" }} />}
    />
  );
};
