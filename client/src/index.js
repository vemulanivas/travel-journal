import React from "react";
import ReactDOM from "react-dom/client";
import TravelJournal from "./TravelJournal"; // Import the main TravelDiary component
import "./index.css"; // ✅ Importing index.css

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TravelJournal/>
  </React.StrictMode>
);
