import React from "react";
import { Button, Tooltip, Box, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IoCloseCircleOutline } from "react-icons/io5";

// NodeHeader Component
const NodeHeader = ({ onClose, infoText, icon, label }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={1}
      sx={{
        width: "100%",
        position: "relative",
      }}
      mt={-1}
    >
      {/* Left-Aligned Icon and Label */}
      <Box display="flex" alignItems="center">
        {icon}
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "#5b6e91", ml: 0.5 }}
        >
          {label}
        </Typography>
      </Box>

      {/* Right-Aligned Info and Close Icons */}
      <Box display="flex" alignItems="center">
        {/* Info Icon with Tooltip */}
        <Tooltip title={infoText} placement="top" arrow>
          <Button
            sx={{
              minWidth: 0,
              padding: 0,
              width: 20,
              height: 20,
              background: "transparent",
              color: "#5b6e91",
              fontSize: "8px",
              borderRadius: "50%",
            }}
          >
            <InfoOutlinedIcon size={20} fontSize="small" />
          </Button>
        </Tooltip>

        {/* Close Button */}
        <Button
          onClick={onClose}
          sx={{
            minWidth: 0,
            width: 20,
            height: 20,
            padding: 0,
            background: "transparent",
            // border: "1px solid black",
            color: "#888",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": { color: "red" },
          }}
        >
          <IoCloseCircleOutline size={20} fontSize="large" />
        </Button>
      </Box>
    </Box>
  );
};

export default NodeHeader;
