// store.js

import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  removeNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    debugger;
    set({
      edges: addEdge(
        {
          ...connection,
          type: "custom",
          animated: true,
          style: { stroke: "blue" },
          connectionLineType: "smoothstep",
        },
        get().edges
      ),
    });
  },

  //added the functions to remove the edge
  removeEdge: (edgeId) => {
    set({
      edges: get().edges.filter((edge) => edge.id !== edgeId),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
  updateEdgesBasedOnHandles: (dynamicHandles) => {
    set((state) => {
      const newEdges = dynamicHandles.map((handle) => ({
        id: `${handle.id}-edge`,
        source: handle.id, // Use the current handle id as the source
        target: handle.target, // You may want to define how to set this based on your logic
        type: "custom",
        animated: true,
        style: { stroke: "blue" },
        connectionLineType: "smoothstep",
      }));

      // Remove existing edges that belong to the same node
      const filteredEdges = state.edges.filter(
        (edge) => !dynamicHandles.some((handle) => edge.source === handle.id)
      );

      return {
        edges: [...filteredEdges, ...newEdges],
      };
    });
  },
}));
