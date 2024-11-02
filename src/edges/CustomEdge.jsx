import { IconButton } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import { useStore } from "../store";
import { getSimpleBezierPath } from "reactflow";

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

  //   Get the smooth path between source and target
  const edgePath = getSimpleBezierPath({
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
      {/* Edge path as a blue line */}
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={style}
      />
      {/* Circular close icon positioned at the midpoint */}
      <foreignObject x={midX - 10} y={midY - 10} width={24} height={24}>
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
