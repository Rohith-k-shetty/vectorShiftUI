// toolbar.js

import { DraggableNode } from "./draggableNode";
import {
  FaDatabase,
  FaFileAlt,
  FaCalculator,
  FaChartLine,
} from "react-icons/fa";

import OutputIcon from "@mui/icons-material/Output";
import InputIcon from "@mui/icons-material/Input";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

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
        <DraggableNode type="customInput" label="Input" icon={<InputIcon />} />
        <DraggableNode type="llm" label="LLM" icon={<FaChartLine />} />
        <DraggableNode
          type="customOutput"
          label="Output"
          icon={<OutputIcon />}
        />
        <DraggableNode type="text" label="Text" icon={<TextSnippetIcon />} />

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
          icon={<OutputIcon />}
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
