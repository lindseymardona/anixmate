import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import bgImage from "./assets/anixmateBG.png";

const bgStyle = {
 backgroundImage: `url(${bgImage})`,
 backgroundSize: "cover",
 backgroundPosition: "center",
 backgroundRepeat: "no-repeat",
 height: "100vh",
 width: "100vw",
};
ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode>
  <div style={bgStyle}>
   <App />
  </div>
 </React.StrictMode>
);
