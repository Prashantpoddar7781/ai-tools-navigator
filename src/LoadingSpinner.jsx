// src/LoadingSpinner.jsx
import React from "react";

function LoadingSpinner({ size = 8, color = "blue" }) {
  return (
    <div
      className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-${color}-500`}
      role="status"
      aria-label="Loading"
    />
  );
}

export default LoadingSpinner;
