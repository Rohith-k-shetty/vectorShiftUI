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
import NodeBody from "../components/NodeBody";

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

  const updateEdgesBasedOnHandles = useStore(
    (state) => state.updateEdgesBasedOnHandles
  );

  const onConnect = useStore((state) => state.onConnect);
  const edges = useStore((state) => state.edges);
  const updateEdges = useStore((state) => state.onEdgesChange);

  useEffect(() => {
    if (values.Text) {
      const regex = /\{\{(.*?)\}\}/g;
      const matches = [...values.Text.matchAll(regex)];

      // Check for empty variable names
      const emptyVariableNames = matches.filter((match) => !match[1].trim());
      if (emptyVariableNames.length > 0) {
        setErrorMessage("Variable names cannot be empty.");
        return;
      } else {
        setErrorMessage("");
      }

      if (matches.length > 6) {
        setErrorMessage("You can only have up to 6 handles.");
        return;
      } else {
        setErrorMessage("");
      }

      const newHandles = matches.map((match, index) => ({
        id: `handle-${match[1].trim()}`,
        type: "target",
        position: Position.Left,
        name: match[1].trim(),
        handleType: "text",
      }));

      setDynamicHandles((prevHandles) => [
        ...handles.slice(0, 1),
        ...newHandles,
      ]);
    }
  }, [values.Text, onConnect, handles]);

  const handleClose = () => {
    removeNode(id);
  };

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  // Get the node height dynamically once it renders
  const nodeHeight = nodeRef.current?.offsetHeight || 200;

  // Separate source and target handles
  const sourceHandles = dynamicHandles.filter(
    (handle) => handle.type === "source"
  );

  const targetHandles = dynamicHandles.filter(
    (handle) => handle.type === "target"
  );

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

      {/* <Box sx={{ flexGrow: 1 }}>
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
      </Box> */}

      <NodeBody fields={fields} values={values} onFieldChange={handleChange} />

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
            right: "-7.5px",
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
            top:
              handle.handleType === "text"
                ? `${getTargetHandleTopPosition(index, targetHandles.length)}px`
                : undefined,
            left: "-7.5px",
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
