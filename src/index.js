import ReactDOM from "react-dom/client";
import App from "./App.js";

const div = document.createElement("div");
document.body.appendChild(div);

if (process.env.NODE_ENV === "development") {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
} else {
  ReactDOM.createRoot(div).render(<App />);
}
