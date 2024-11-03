import { BaseNode } from "./BaseNode";

export const FileInputNode = ({ id }) => (
  <BaseNode
    label="File Input"
    fields={[
      { type: "text", name: "fileName", default: "file1.txt" },
      {
        type: "radio",
        name: "fileType",
        options: ["text", "PDF"],
        default: "Text",
      },
    ]}
    handles={[{ id: `${id}-source`, type: "source", position: "Right" }]}
    id={id}
  />
);
