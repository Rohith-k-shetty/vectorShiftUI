import { Select, MenuItem } from "@mui/material";

const SelectField = ({ value, options, onChange }) => (
  <Select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    variant="standard"
    fullWidth
  >
    {options.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </Select>
);

export default SelectField;
