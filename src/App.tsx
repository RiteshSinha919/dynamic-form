import React from "react";
import FormRoute from "./routes/FormRoute";
import { AppContainer } from "./styledApp";
import TableRoute from "./routes/TableRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExperienceCards from "./components/ExperienceCards";

const App: React.FC = () => {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/p1" element={<ExperienceCards />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
