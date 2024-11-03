import { BaseEdge, getSmoothStepPath } from "@xyflow/react";
import { IconButton } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import { useStore } from "../store"; // Adjust this path as needed

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
}) => {
  const removeEdge = useStore((state) => state.removeEdge);

  // Get the smooth step path between source and target
  const [path, labelX, labelY, offsetX, offsetY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Calculate midpoint for the delete icon
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  return (
    <>
      {/* Use BaseEdge to render the smooth step edge */}
      <BaseEdge id={id} path={path} style={style} />

      {/* Circular close icon positioned at the midpoint */}
      <foreignObject x={midX - 12} y={midY - 12} width={24} height={24}>
        <IconButton
          onClick={() => removeEdge(id)}
          style={{
            backgroundColor: "white",
            borderRadius: "50%",
            padding: 0,
            border: "1px solid #ccc",
          }}
          size="medium"
        >
          <AiFillCloseCircle style={{ fontSize: 20, color: "red" }} />
        </IconButton>
      </foreignObject>
    </>
  );
};

export default CustomEdge;
