import "./App.css";
import { usePWAInstall } from "./hooks/usePWAInstall";

function App() {
  const { isInstallable, promptInstall } = usePWAInstall();

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: isMobile ? "1rem" : "2rem",
        maxWidth: "100%",
        margin: "0 auto",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "1rem",
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
    >
      <h1
        style={{
          fontSize: isMobile ? "1.5rem" : "1.8rem",
          marginBottom: "0.5rem",
        }}
      >
        PWA Demo App
      </h1>

      {isMobile && (
        <div
          style={{
            background: "#e0f2fe",
            padding: "0.75rem",
            borderRadius: "8px",
            fontSize: "0.9rem",
            color: "#0c4a6e",
          }}
        >
          📱 Mobile Device Detected
        </div>
      )}

      {isInstallable && (
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "8px",
            border: "none",
            background: "#16a34a",
            color: "#fff",
            width: isMobile ? "100%" : "auto",
          }}
          onClick={promptInstall}
        >
          Install App
        </button>
      )}
    </div>
  );
}

export default App;
