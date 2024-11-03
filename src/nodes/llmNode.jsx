import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";
import InputIcon from "@mui/icons-material/Input";

export const LLMNode = ({ id, data }) => {
  const fields = [
    {
      name: "Name",
      type: "label",
      default: data?.outputName || id.replace("customLabel-", "LLM_"),
    },

    {
      type: "text",
      name: "Prompt",
      default: data?.inputName || id.replace("customInput-", "input_"),
    },

    {
      name: "output",
      type: "output",
      default: data.outputType || "text",
      data: "This is a output feild which is used to display the prompt output after processing",
    },
  ];

  const handles = [
    {
      id: `${id}-response`,
      type: "source",
      position: Position.Right,
      name: "output",
      style: { top: `${200 / 3}%` },
    },
    {
      id: `${id}-prompt`,
      type: "target",
      position: Position.Left,
      name: "input",
    },
  ];

  return (
    <BaseNode
      label="LLM"
      fields={fields}
      handles={handles}
      id={id}
      infoText={"Create your user input for pipeline."}
      icon={<InputIcon sx={{ fontSize: 20, color: "#5b6e91" }} />}
    />
  );
};
