import { BaseNode } from "./BaseNode";

export const SentimentAnalysisNode = ({ id }) => (
  <BaseNode
    label="Sentiment Analysis"
    fields={[
      { type: "text", name: "inputText", default: "Enter text to analyze" },
      {
        type: "switch",
        name: "Enter Angry Mode",
      },
    ]}
    handles={[
      { id: `${id}-input`, type: "target", position: "Left", name: "input" },
      { id: `${id}-output`, type: "source", position: "Right" },
    ]}
    id={id}
  />
);
