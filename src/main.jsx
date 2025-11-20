import { StrictMode } from "react";
import { ThemeProvider } from "./store/ThemeContext.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext.jsx";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
// import "./style/customs.css"
import "./style/monserrat.js"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
