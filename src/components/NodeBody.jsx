import { Box, Typography } from "@mui/material";
import TextField from "./TextField";
import SelectField from "./SelectField";

const NodeBody = ({ fields, values, onFieldChange }) => (
  <Box>
    {fields.map(({ type, name, options }) => (
      <Box key={name} mb={1}>
        <Typography variant="caption" color="textSecondary">
          {name}
        </Typography>
        {type === "text" && (
          <TextField
            value={values[name]}
            onChange={(value) => onFieldChange(name, value)}
          />
        )}
        {type === "select" && (
          <SelectField
            value={values[name]}
            options={options}
            onChange={(value) => onFieldChange(name, value)}
          />
        )}
        {/* Add other field types like CheckboxField, RadioButtonField here */}
      </Box>
    ))}
  </Box>
);

export default NodeBody;
