import { useState } from "react";

export default function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJoke = async () => {
    setLoading(true);
    setError("");
    setJoke(null);

    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }

      const data = await response.json();
      setJoke(data);
    } catch (err) {
      setError("Could not fetch a joke. Try again.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          width: "400px",
        }}
      >
        <h1>Random Joke</h1>

        <button
          onClick={fetchJoke}
          disabled={loading}
          style={{
            padding: "10px 20px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Fetching..." : "Fetch joke"}
        </button>
        {error && (
          <div>
            <p>Could not fetch a joke. Try again.</p>
            <button onClick={fetchJoke}>Try again</button>
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          {!joke && !error && (
            <p>Click the button to fetch a fresh one.</p>
          )}

          {joke && (
            <>
              <h3>{joke.setup}</h3>
              <p>{joke.punchline}</p>
            </>
          )}

          {error && (
            <p style={{ color: "red" }}>
              Could not fetch a joke. Try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}