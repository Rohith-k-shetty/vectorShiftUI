import { BaseNode } from "./BaseNode";
import { FaDatabase } from "react-icons/fa";
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
    infoText={"Node Designed for the sentiment analysis"}
    icon={<FaDatabase sx={{ fontSize: 20, color: "#5b6e91" }} />}
  />
);
