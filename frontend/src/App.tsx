import { useState, useEffect } from "react";
import type {
  FeedbackEntry,
  FeedbackListResponse,
} from "@full-stack-starter/shared";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function App() {
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/feedback`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json: FeedbackListResponse = await response.json();
        setFeedback(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <p>Loading feedback...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Patient Feedback</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        {feedback.length} review{feedback.length !== 1 ? "s" : ""}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {feedback.map((entry) => (
          <div
            key={entry.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ margin: 0 }}>{entry.name}</h3>
              <div
                style={{
                  fontSize: "20px",
                  color: "#ffa500",
                  fontWeight: "bold",
                }}
              >
                {"★".repeat(entry.rating)}
                {"☆".repeat(5 - entry.rating)}
              </div>
            </div>
            <p style={{ margin: 0, lineHeight: "1.6", color: "#333" }}>
              {entry.comment}
            </p>
          </div>
        ))}
      </div>

      {feedback.length === 0 && (
        <p style={{ color: "#666" }}>No feedback entries yet.</p>
      )}
    </div>
  );
}

export default App;
