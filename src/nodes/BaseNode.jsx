import { Handle, Position } from "reactflow";
import { useState, useEffect, useRef } from "react";
import { useStore } from "../store";
import { Box, Typography, Alert } from "@mui/material";
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
  // Reference to measure the node's height
  const nodeRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const onConnect = useStore((state) => state.onConnect);

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
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const FeildhandleChange = (name, value) => {
    // Find the field based on its name
    const field = fields.find((field) => field.name === name);

    // Ensure the field is found before proceeding
    if (!field) {
      console.warn(`Field with name '${name}' not found`);
      return;
    }

    // Update the state based on the field type
    switch (field.type) {
      case "text":
      case "select":
      case "textInput":
      case "number":
        // For text-based fields, set the value directly
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
        break;

      case "checkbox":
        // For checkboxes, toggle the current value
        setValues((prevValues) => ({
          ...prevValues,
          [name]: !prevValues[name],
        }));
        break;

      case "radio":
        // For radio buttons, set the value to the selected option
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
        break;

      case "switch":
        // For switches, set the value directly
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
        break;

      default:
        console.warn(`No handler for field type: ${field.type}`);
        break;
    }
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

      <NodeBody
        fields={fields}
        values={values}
        onFieldChange={FeildhandleChange}
        onTextChange={handleChange}
      />

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
