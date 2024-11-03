import { BaseNode } from "./BaseNode";
import { Position } from "reactflow";
import OutputIcon from "@mui/icons-material/Output";
export const OutputNode = ({ id, data }) => {
  const fields = [
    {
      name: "Name",
      type: "label",
      default: data?.outputName || id.replace("customOutput-", "output_"), // Default value for the name
    },
    {
      name: "output",
      type: "output",
      default: data.outputType || "text",
      data: "This is a output feild which is used to display the output of the node",
    },
  ];

  const handles = [
    {
      id: `${id}-value`,
      type: "target",
      position: Position.Left,
      name: "input",
    },
  ];

  return (
    <BaseNode
      label="Output"
      fields={fields}
      handles={handles}
      id={id}
      infoText={"A feild for outputting data from your pipeline."}
      icon={<OutputIcon sx={{ fontSize: 20, color: "#5b6e91" }} />}
    />
  );
};
