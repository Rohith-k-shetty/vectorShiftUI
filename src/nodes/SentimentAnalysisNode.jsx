import { BaseNode } from "./BaseNode";

export const SentimentAnalysisNode = ({ id }) => (
  <BaseNode
    label="Sentiment Analysis"
    fields={[
      { type: "text", name: "inputText", default: "Enter text to analyze" },
    ]}
    handles={[
      { id: `${id}-input`, type: "target", position: "Left" },
      { id: `${id}-output`, type: "source", position: "Right" },
    ]}
    id={id}
  />
);
