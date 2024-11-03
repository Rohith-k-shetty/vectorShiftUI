import { Switch, FormControlLabel } from "@mui/material";

const SwitchField = ({ label, checked, onChange }) => (
  <FormControlLabel
    control={
      <Switch
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        color="primary"
      />
    }
    label={label}
  />
);

export default SwitchField;
