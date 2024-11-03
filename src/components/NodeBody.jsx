import { Box, Typography } from "@mui/material";
import TextField from "./TextFeild";
import SelectField from "./SelectFeild";
import CheckboxField from "./CheckboxFeild";
import RadioButtonField from "./RadioButtonFeild";
import TextInputField from "./TextInputFeild";
import SwitchField from "./SwitchFeild";
import OutputField from "./OutputFeild";
import DisplayTextField from "./DisplayTextFeild";

const NodeBody = ({ fields, values, onFieldChange }) => (
  <Box>
    {fields.map(({ type, name, label, options }) => (
      <Box key={name} mb={1}>
        <Typography variant="caption" color="textSecondary">
          {label || name}
        </Typography>
        {type === "label" && <DisplayTextField value={values[name]} />}

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
        {type === "checkbox" && (
          <CheckboxField
            label={label || name}
            checked={values[name]}
            onChange={(value) => onFieldChange(name, value)}
          />
        )}
        {type === "radio" && (
          <RadioButtonField
            label={label || name}
            options={options}
            value={values[name]}
            onChange={(value) => onFieldChange(name, value)}
          />
        )}
        {type === "textInput" && (
          <TextInputField
            label={label || name}
            value={values[name]}
            onChange={(value) => onFieldChange(name, value)}
          />
        )}
        {type === "switch" && (
          <SwitchField
            label={label || name}
            checked={values[name]}
            onChange={(value) => onFieldChange(name, value)}
          />
        )}
        {type === "output" && (
          <OutputField label={label || name} output={values[name]} />
        )}
      </Box>
    ))}
  </Box>
);

export default NodeBody;
