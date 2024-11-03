import { TextField } from "@mui/material";

const NumberInputField = ({ label, value, onChange }) => {
  return (
    <TextField
      type="number"
      label={label}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      variant="standard"
      fullWidth
      InputProps={{ inputProps: { min: 0 } }} // Optional: Limit minimum to 0
    />
  );
};

export default NumberInputField;
