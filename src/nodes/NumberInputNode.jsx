import { FaDatabase } from "react-icons/fa";
import { BaseNode } from "./BaseNode";

export const NumberInputNode = ({ id }) => (
  <BaseNode
    label="Number Input"
    fields={[
      { type: "number", name: "inputNumber" },
      {
        type: "select",
        name: "dataType",
        options: [
          { value: "Integer", label: "Integer " },
          { value: "Float", label: "Float" },
        ],
        default: "Integer",
      },
    ]}
    infoText={"Node Designed for Showing the output."}
    icon={<FaDatabase sx={{ fontSize: 20, color: "#5b6e91" }} />}
    handles={[{ id: `${id}-value`, type: "source", position: "Right" }]}
    id={id}
  />
);
