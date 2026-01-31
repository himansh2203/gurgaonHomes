import "../styles/LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading premium properties...</p>
    </div>
  );
}
