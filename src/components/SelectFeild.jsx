import { FormControl, MenuItem, Select } from "@mui/material";

const SelectField = ({ label, value, options, onChange }) => {
  return (
    <FormControl fullWidth variant="standard">
      <Select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
