import { BaseNode } from "./BaseNode";
import OutputIcon from "@mui/icons-material/Output";

export const LLMResponseNode = ({ id }) => (
  <BaseNode
    label="LLM Response"
    fields={[
      { type: "text", name: "systemMessage", default: "Enter message" },
      { type: "text", name: "userPrompt", default: "User prompt here" },
      { type: "checkbox", name: "Use API Key", default: true },
    ]}
    handles={[
      { id: `${id}-input`, type: "target", position: "Left" },
      { id: `${id}-output`, type: "source", position: "Right" },
    ]}
    id={id}
    infoText={"A feild for outputting llm response from your pipeline."}
    icon={<OutputIcon sx={{ fontSize: 20, color: "#5b6e91" }} />}
  />
);
