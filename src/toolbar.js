// toolbar.js

import { DraggableNode } from "./draggableNode";
import {
  FaDatabase,
  FaFileAlt,
  FaCalculator,
  FaChartLine,
} from "react-icons/fa";
import { Box, Typography } from "@mui/material";

export const PipelineToolbar = () => {
  return (
    <Box sx={{ backgroundColor: "white", padding: "16px", boxShadow: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: "10px", color: "black" }}>
        Pipeline Toolbar
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type="customInput" label="Input" icon={<FaDatabase />} />
        <DraggableNode type="llm" label="LLM" icon={<FaChartLine />} />
        <DraggableNode
          type="customOutput"
          label="Output"
          icon={<FaFileAlt />}
        />
        <DraggableNode type="text" label="Text" icon={<FaCalculator />} />

        {/* Additional draggable nodes */}
        <DraggableNode
          type="currencyConverter"
          label="Currency Converter"
          icon={<FaCalculator />}
        />
        <DraggableNode
          type="numberInput"
          label="Number Input"
          icon={<FaDatabase />}
        />
        <DraggableNode
          type="LLMResponse"
          label="LLM Response"
          icon={<FaChartLine />}
        />
        <DraggableNode
          type="fileInput"
          label="File Input"
          icon={<FaFileAlt />}
        />
        <DraggableNode
          type="sentimentAnalysis"
          label="Sentiment Analysis"
          icon={<FaDatabase />}
        />
      </Box>
    </Box>
  );
};
