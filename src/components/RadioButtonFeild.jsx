import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

const RadioButtonField = ({ label, options, value, onChange }) => (
  <div>
    {/* <FormLabel component="legend">{label}</FormLabel> */}
    <RadioGroup value={value} onChange={(e) => onChange(e.target.value)} row>
      {options.map((option) => (
        <FormControlLabel
          key={option}
          value={option}
          control={<Radio color="primary" />}
          label={option}
          sx={{ fontSize: "10px" }}
        />
      ))}
    </RadioGroup>
  </div>
);

export default RadioButtonField;
