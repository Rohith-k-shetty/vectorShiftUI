import { BaseNode } from "./BaseNode";

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
  />
);
