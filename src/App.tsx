import React from "react";
import FormRoute from "./routes/FormRoute";
import { AppContainer } from "./styledApp";
import TableRoute from "./routes/TableRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormRoute />} />
          <Route path="/table" element={<TableRoute />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
