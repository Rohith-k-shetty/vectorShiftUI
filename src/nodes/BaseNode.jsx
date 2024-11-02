import { Handle } from "reactflow";
import { useState, useEffect } from "react";
import { useStore } from "../store";
import {
  Box,
  Button,
  Select,
  MenuItem,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import InputIcon from "@mui/icons-material/Input";
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

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (values.Text) {
      const regex = /\{\{(.*?)\}\}/g;
      const matches = [...values.Text.matchAll(regex)];

      const newHandles = matches.map((match, index) => ({
        id: `handle-${match[1].trim()}`,
        type: "source",
        position: "right",
        style: { top: 20 + 20 * index },
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

  return (
    <Box
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
      {dynamicHandles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            border: "2px solid #5b6e91",
            background: "#fff",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            position: "absolute",
            // top: handle.style.top,
            transform: "translateX(50%)",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              left: "20px",
              top: "-2px",
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
