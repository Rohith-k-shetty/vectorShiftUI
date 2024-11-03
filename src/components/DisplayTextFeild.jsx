import { Typography } from "@mui/material";

const DisplayTextField = ({ value }) => (
  <>
    <Typography variant="body2" sx={{ fontSize: "14px", color: "#5b6e91" }}>
      {value || "Text"}
    </Typography>
  </>
);

export default DisplayTextField;
