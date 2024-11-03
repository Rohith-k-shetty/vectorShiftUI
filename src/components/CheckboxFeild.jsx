import { Checkbox, FormControlLabel } from "@mui/material";

const CheckboxField = ({ label, checked, onChange }) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        color="primary"
      />
    }
    // label={label}
  />
);

export default CheckboxField;
