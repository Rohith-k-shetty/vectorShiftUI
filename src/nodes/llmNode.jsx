import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";
import InputIcon from "@mui/icons-material/Input";

export const LLMNode = ({ id }) => {
  const fields = [];

  const handles = [
    // {
    //   id: `${id}-system`,
    //   type: "target",
    //   position: Position.Left,
    //   style: { top: `${100 / 3}%` },
    // },
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
