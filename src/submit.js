import { useStore } from "./store";
import axios from "axios";

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));
  const handleSubmit = async () => {
    try {
      // Prepare nodes and edges data in the required format
      debugger;
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

      // Display the result in an alert
      alert(
        `Pipeline Analysis:\n- Number of Nodes: ${num_nodes}\n- Number of Edges: ${num_edges}\n- Is Directed Acyclic Graph (DAG): ${
          is_dag ? "Yes" : "No"
        }`
      );
    } catch (error) {
      console.error("Error submitting pipeline data:", error);
      alert("Failed to analyze the pipeline. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
