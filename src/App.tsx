import "./App.css";
import { usePWAInstall } from "./hooks/usePWAInstall";
import { useState, useEffect } from "react";

function App() {
  const { isInstallable, promptInstall } = usePWAInstall();
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  const userAgent = navigator.userAgent;
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isInStandaloneMode =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true;

  const showInstallModal = !isInStandaloneMode && (isInstallable || isIOS);

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

  useEffect(() => {
    const storedLang = localStorage.getItem("appLanguage") || "en";
    setCurrentLang(storedLang);
    translatePage(storedLang);
  }, []);

  const translatePage = (lang: string) => {
    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement | null;

    if (!select) return;

    if (lang === currentLang) return;

    setLoading(true);

    select.value = "en";
    select.dispatchEvent(new Event("change"));

    setTimeout(() => {
      select.value = lang;
      select.dispatchEvent(new Event("change"));

      setCurrentLang(lang);
      localStorage.setItem("appLanguage", lang);

      setTimeout(() => setLoading(false), 800);
    }, 300);
  };

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

      <div
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          color: "#16a34a",
        }}
      >
        <h1>Hello, welcome to my React app!</h1>
        <p>
          This is an example application where you can switch between English
          and Hindi using Google Translate.
        </p>

        <button
          onClick={() => translatePage("hi")}
          style={{
            marginRight: "10px",
            padding: "8px 12px",
            cursor: "pointer",
            color: currentLang === "hi" ? "#fff" : "#16a34a",
            background: currentLang === "hi" ? "#16a34a" : "transparent",
            border: "1px solid #16a34a",
            borderRadius: "5px",
          }}
        >
          हिन्दी
        </button>
        <button
          onClick={() => translatePage("en")}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            color: currentLang === "en" ? "#fff" : "#16a34a",
            background: currentLang === "en" ? "#16a34a" : "transparent",
            border: "1px solid #16a34a",
            borderRadius: "5px",
          }}
        >
          English
        </button>
      </div>

      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.7)",
            zIndex: 9999,
          }}
        >
          <div className="spinner" />
        </div>
      )}

      {showModal && showInstallModal && (
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
            <h2 style={{ marginTop: 0, fontSize: "1.3rem", color: "#333" }}>
              Install This App
            </h2>
            <p style={{ marginBottom: "1.2rem", color: "#333" }}>
              {instruction}
            </p>
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
                  width: "100%",
                }}
                onClick={() => {
                  promptInstall();
                  setShowModal(false);
                }}
              >
                Install App
              </button>
            )}
          </div>
        </div>
      )}

      <style>
        {`
          .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #16a34a;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default App;
