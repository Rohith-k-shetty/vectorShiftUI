import { Handle } from "reactflow";
import { useState } from "react";
import { useStore } from "../store";
import { Box, Button, TextareaAutosize } from "@mui/material";

export const BaseNode = ({ label, fields, handles, id }) => {
  const [values, setValues] = useState(
    fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: field.default || "" }),
      {}
    )
  );

  const removeNode = useStore((state) => state.removeNode);
  const [dynamicHandles, setDynamicHandles] = useState(handles);

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });

    // Check for variable names in the input value
    if (name === "Text") {
      const regex = /\{\{(.*?)\}\}/g; // Regex to find {{variable}}
      const matches = [...value.matchAll(regex)];

      const newHandles = matches.map((match, index) => ({
        id: `${name}-handle-${match[1].trim()}`, // Use trimmed variable name for unique id
        type: "source",
        position: "left",
        style: { top: 20 * index },
        name: match[1].trim(),
      }));

      // Combine with existing handles (if any)
      setDynamicHandles((prevHandles) => [
        ...handles.slice(0, 1),
        ...newHandles,
      ]);
    }
  };

  const handleClose = () => {
    removeNode(id);
  };

  return (
    <Box
      sx={{
        width: 200,
        padding: 2,
        border: "1px solid black",
        resize: "both",
        overflow: "hidden",
        // position: "relative",
        minHeight: 60,
        maxHeight: 300,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span>{label}</span>
      <Button
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          cursor: "pointer",
          background: "transparent",
          border: "none",
          color: "red",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        &times;
      </Button>
      <Box sx={{ flexGrow: 1 }}>
        {" "}
        {/* This box will grow and take the remaining space */}
        {fields.map(({ type, name, options }) => (
          <label key={name}>
            {name}:
            {type === "select" ? (
              <select
                value={values[name]}
                onChange={(e) => handleChange(name, e.target.value)}
              >
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
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
            )}
          </label>
        ))}
      </Box>
      {dynamicHandles.map((handle) => (
        <Box>
          <Handle
            key={handle.id}
            type={handle.type}
            position={handle.position}
            id={handle.id}
            style={{
              border: "2px solid black", // No fill, just outline
              background: "transparent", // Make background transparent
              width: "5px", // Set width for a larger size
              height: "5px", // Set height for a larger size
              borderRadius: "50%",
              position: "absolute",
            }}
          >
            {handle.name}
          </Handle>
        </Box>
      ))}
    </Box>
  );
};
