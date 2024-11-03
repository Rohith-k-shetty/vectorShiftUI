import { TextField } from "@mui/material";

const TextInputField = ({ label, value, onChange }) => (
  <TextField
    label={label}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    variant="standard"
    fullWidth
    margin="dense"
  />
);

export default TextInputField;
