import { Box, Typography } from "@mui/material";

const OutputField = ({ label, output }) => (
  <Box sx={{ mt: 1 }}>
    {label && (
      <Typography variant="caption" color="textSecondary" sx={{ mb: 1 }}>
        {label}
      </Typography>
    )}
    <Box
      sx={{
        padding: 1,
        border: "1px solid #A3E6F3",
        borderRadius: "5px",
        maxHeight: "150px",
        overflowY: "auto",
        fontSize: "14px",
        backgroundColor: "#f9f9f9",
        color: "#333",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      }}
    >
      {output || "No output available"}
    </Box>
  </Box>
);

export default OutputField;
