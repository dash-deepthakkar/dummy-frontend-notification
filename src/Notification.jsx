import { useEffect, useState } from "react";
import axios from "axios";

export const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjE3IiwiaWF0IjoxNzcwMDk4NjM0LCJleHAiOjE3NzAxMTY2MzQsInJlc291cmNlSWQiOjQxMjMzMjA0NzksInR5cGUiOiJBQ0NFU1MiLCJ1c2VySWQiOjQxMjMzMjA0NzksInNzbyI6IiIsInVzZXJuYW1lIjoiYWRtaW4xNyIsInNpZCI6MTcsImNvcnBvcmF0ZUlkIjoxLCJ0aW1lc3RhbXAiOjE3NzAwOTg2MzQ5MDh9.rD-6l1rs0CtDUEmOCsyheaidq7ZHPgc6pvHvU6GotBE";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8083/api/v1/notification", {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Notification API response:", response.data);
        setNotifications(response.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Notification API error:", err);
        setError("Failed to load notifications");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h3>🔔 Notifications</h3>

      {notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifications.map((n) => (
            <li
              key={n.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "6px",
              }}
            >
              <strong>{n.title}</strong>
              <p>{n.message}</p>
              <small style={{ color: "#666" }}>
                {new Date(n.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
