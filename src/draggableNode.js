// draggableNode.js

import { Box, Typography } from "@mui/material";

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      sx={{
        cursor: "grab",
        padding: "5px",
        minWidth: "60px",
        maxWidth: "120px",
        height: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        border: "1px solid black",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        "&:hover": {
          boxShadow: 3,
        },
      }}
      draggable
    >
      <Box sx={{ fontSize: "20px", color: "#90caf9", marginBottom: "4px" }}>
        {icon}
      </Box>
      <Typography variant="caption" sx={{ asstextAlign: "center" }}>
        {label}
      </Typography>
    </Box>
  );
};
