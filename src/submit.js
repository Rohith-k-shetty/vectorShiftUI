import { Box, Button } from "@mui/material";
import { useStore } from "./store";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const handleSubmit = async () => {
    // Check for empty nodes or edges
    if (nodes.length === 0 || nodes.length === 1 || edges.length === 0) {
      toast.error(
        "Please add at least two node and one edge before submitting.",
        {
          position: toast.POSITION,
        }
      );
      return; // Exit the function if validation fails
    }

    try {
      // Prepare nodes and edges data in the required format
      const payload = {
        nodes: nodes.map((node) => ({ id: node.id })),
        edges: edges.map((edge) => ({
          source: edge.source,
          target: edge.target,
        })),
      };

      // Send the data to the backend
      const response = await axios.post(
        "http://localhost:8000/pipelines/parse",
        payload
      );

      // Destructure the response data
      const { num_nodes, num_edges, is_dag } = response.data;

      // Display the result using SweetAlert
      Swal.fire({
        title: "Pipeline Analysis",
        html: `
          <p><strong>Number of Nodes:</strong> ${num_nodes}</p>
          <p><strong>Number of Edges:</strong> ${num_edges}</p>
          <p><strong>Is Directed Acyclic Graph (DAG):</strong> ${
            is_dag ? "Yes" : "No"
          }</p>
        `,
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error submitting pipeline data:", error);

      // Display error using SweetAlert
      Swal.fire({
        title: "Error!",
        text: "Failed to analyze the pipeline. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        type="submit"
        onClick={handleSubmit}
        variant="contained"
        sx={{
          backgroundColor: "#A3E6F3", // Background color
          color: "white", // Text color
          "&:hover": {
            backgroundColor: "#92D4E1", // Optional: Darker shade on hover
          },
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      >
        Submit
      </Button>
    </Box>
  );
};
