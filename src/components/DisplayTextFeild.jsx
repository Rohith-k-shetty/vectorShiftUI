import { Typography } from "@mui/material";

const DisplayTextField = ({ value }) => (
  <>
    <Typography variant="body2" sx={{ fontSize: "16px", color: "#5b6e91" }}>
      {value || "Text"}
    </Typography>
  </>
);

export default DisplayTextField;
