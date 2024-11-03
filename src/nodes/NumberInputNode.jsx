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
    handles={[{ id: `${id}-value`, type: "source", position: "Right" }]}
    id={id}
  />
);
