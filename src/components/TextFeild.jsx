import { TextareaAutosize } from "@mui/material";

const TextField = ({ value, onChange }) => (
  <TextareaAutosize
    value={value}
    onChange={(e) => onChange(e.target.value)}
    minRows={2}
    maxRows={6}
    style={{
      width: "100%",
      maxHeight: "200px",
      resize: "none",
    }}
  />
);

export default TextField;
