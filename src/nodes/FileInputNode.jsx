import { BaseNode } from "./BaseNode";
import { FaFileAlt } from "react-icons/fa";

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
    infoText={"Node Designed for the File Input"}
    icon={<FaFileAlt sx={{ fontSize: 20, color: "#5b6e91" }} />}
  />
);
