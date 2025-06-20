import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// async function prepare() {
//   if (process.env.NODE_ENV === "development") {
//     const { worker } = await import("./mocks/browser");
//     return worker.start();
//   }
//   return Promise.resolve();
// }

// prepare().then(() => {
//   const root = ReactDOM.createRoot(document.getElementById("root"));
//   root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// });
