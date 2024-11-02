import { Handle, Position } from "reactflow";
import { useState, useEffect, useRef } from "react";
import { useStore } from "../store";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  TextareaAutosize,
  Alert,
} from "@mui/material";
import NodeHeader from "../components/NodeHeader";

export const BaseNode = ({ label, fields, handles, id, infoText, icon }) => {
  const [values, setValues] = useState(
    fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: field.default || "" }),
      {}
    )
  );

  const removeNode = useStore((state) => state.removeNode);
  const [dynamicHandles, setDynamicHandles] = useState(handles);
  const nodeRef = useRef(null); // Reference to measure the node's height
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (values.Text) {
      const regex = /\{\{(.*?)\}\}/g;
      const matches = [...values.Text.matchAll(regex)];

      if (matches.length > 6) {
        setErrorMessage("You can only have up to 6 handles."); // Set error message
        return;
      } else {
        setErrorMessage(""); // Clear error message
      }

      const newHandles = matches.map((match, index) => ({
        id: `handle-${match[1].trim()}`,
        type: "target",
        position: Position.Left,
        name: match[1].trim(),
      }));

      setDynamicHandles((prevHandles) => [
        ...handles.slice(0, 1),
        ...newHandles,
      ]);
    }
  }, [values.Text, handles]);

  const handleClose = () => {
    removeNode(id);
  };

  // Get the node height dynamically once it renders
  const nodeHeight = nodeRef.current?.offsetHeight || 200; // Default to 200 if not yet available

  // Separate source and target handles
  const sourceHandles = dynamicHandles.filter(
    (handle) => handle.type === "source"
  );
  const targetHandles = dynamicHandles.filter(
    (handle) => handle.type === "target"
  );

  // Calculate position for source handles (on the right side)
  const getSourceHandleTopPosition = (index, total) => {
    return total === 1
      ? nodeHeight / 2
      : (nodeHeight / (total + 1)) * (index + 1);
  };

  // Calculate position for target handles (on the left side)
  const getTargetHandleTopPosition = (index, total) => {
    return total === 1
      ? nodeHeight / 2
      : (nodeHeight / (total + 1)) * (index + 1);
  };

  return (
    <Box
      ref={nodeRef}
      sx={{
        width: 200,
        padding: 2,
        border: "3px solid #A3E6F3",
        borderRadius: "10px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <NodeHeader
        onClose={handleClose}
        label={label}
        infoText={infoText}
        icon={icon}
      />

      <Box sx={{ flexGrow: 1 }}>
        {fields.map(({ type, name, options }) => (
          <Box key={name} mb={1}>
            <Typography variant="caption" color="textSecondary">
              {name}
            </Typography>
            {type === "select" ? (
              <Select
                value={values[name]}
                onChange={(e) => handleChange(name, e.target.value)}
                variant="standard"
                fullWidth
                sx={{ fontSize: "14px" }}
              >
                {options.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            ) : name === "Text" ? (
              <TextareaAutosize
                value={values[name]}
                onChange={(e) => handleChange(name, e.target.value)}
                minRows={2}
                maxRows={6}
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  resize: "none",
                }}
              />
            ) : (
              <Typography
                variant="body2"
                sx={{ fontSize: "14px", color: "#5b6e91" }}
              >
                {values[name] || "Text"}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* Display error message if the handle limit is exceeded */}
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 1, mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {sourceHandles.map((handle, index) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={{
            border: "2px solid #5b6e91",
            background: "#fff",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            top: `${getSourceHandleTopPosition(index, sourceHandles.length)}px`,
            right: "-7.5px",
            transform: "translateY(-50%)",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              left: "14px",
              top: "-1px",
              color: "#5b6e91",
            }}
          >
            {handle.name}
          </Typography>
        </Handle>
      ))}

      {targetHandles.map((handle, index) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={{
            border: "2px solid #5b6e91",
            background: "#fff",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            top: `${getTargetHandleTopPosition(index, targetHandles.length)}px`,
            left: "-7.5px",
            transform: "translateY(-50%)",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              right: "14px",
              top: "-1px",
              color: "#5b6e91",
            }}
          >
            {handle.name}
          </Typography>
        </Handle>
      ))}
    </Box>
  );
};
