import { BaseNode } from "./BaseNode";

export const NumberInputNode = ({ id }) => (
  <BaseNode
    label="Number Input"
    fields={[
      { type: "number", name: "inputNumber", default: 0 },
      {
        type: "select",
        name: "dataType",
        options: ["Integer", "Float"],
        default: "Integer",
      },
    ]}
    handles={[{ id: `${id}-value`, type: "source", position: "Right" }]}
    id={id}
  />
);
