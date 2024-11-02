import { BaseNode } from "./BaseNode";

export const FileInputNode = ({ id }) => (
  <BaseNode
    label="File Input"
    fields={[
      { type: "text", name: "fileName", default: "file1.txt" },
      {
        type: "select",
        name: "fileType",
        options: ["Text", "Image", "PDF"],
        default: "Text",
      },
    ]}
    handles={[{ id: `${id}-source`, type: "source", position: "Right" }]}
    id={id}
  />
);
