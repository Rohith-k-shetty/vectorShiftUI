import { BaseNode } from "./BaseNode";
import { Position } from "reactflow";
import InputIcon from "@mui/icons-material/Input";

export const InputNode = ({ id, data }) => {
  const fields = [
    {
      type: "text",
      name: "Name",
      default: data?.inputName || id.replace("customInput-", "input_"),
    },
    {
      type: "select",
      name: "File Types",
      options: [
        { value: "Text", label: "Text" },
        { value: "File", label: "File" },
      ],
      default: data?.inputType || "Text",
    },
  ];

  const handles = [
    {
      id: `${id}-value`,
      type: "source",
      position: Position.Right,
      style: { top: 50 },
      name: "output",
    },
  ];

  return (
    <BaseNode
      label="Input"
      fields={fields}
      handles={handles}
      id={id}
      infoText={"Create your user input for pipeline."}
      icon={<InputIcon sx={{ fontSize: 20, color: "#5b6e91" }} />}
    />
  );
};
