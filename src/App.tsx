import "./App.css";
import { usePWAInstall } from "./hooks/usePWAInstall";
import { useState } from "react";

function App() {
  const { isInstallable, promptInstall } = usePWAInstall();
  const [showModal, setShowModal] = useState(true);

  const userAgent = navigator.userAgent;
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

  let instruction = "";
  if (isAndroid) {
    instruction =
      "On Android, you might see a dedicated 'Install' button within the PWA or find the option in the browser's menu or follow add to home screen option menu.";
  } else if (isIOS) {
    instruction =
      "On iOS (iPhones and iPads), you'll typically find the 'Add to Home Screen' option within the share menu.";
  } else {
    instruction =
      "To install this app, look for an 'Install' or 'Add to Home Screen' option in your browser menu.";
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <h1
        style={{
          fontSize: "1.8rem",
          marginBottom: "0.5rem",
          color: "#16a34a",
        }}
      >
        PWA Demo App
      </h1>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "2rem",
              maxWidth: "90vw",
              width: "400px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
              textAlign: "left",
              position: "relative",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: "1.3rem" }}>
              Install This App
            </h2>
            <p style={{ marginBottom: "1.2rem", color: "#333" }}>
              {instruction}
            </p>
            <button
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                cursor: "pointer",
                borderRadius: "8px",
                border: "none",
                background: "#16a34a",
                color: "#fff",
                width: "100%",
              }}
              onClick={() => {
                if (isInstallable) {
                  promptInstall();
                }
                setShowModal(false);
              }}
              disabled={!isInstallable}
            >
              {!isInstallable ? "Disabled" : "Install App"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
