import React from "react";
import { AppContainer, InnerContainer } from "./styledApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExperienceCards from "./components/ExperienceCards";
import ProductFeedback from "./components/ProductFeedback";

const App: React.FC = () => {
  return (
    <AppContainer>
      <InnerContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/p1" element={<ExperienceCards />} />
            <Route path="/p2" element={<ProductFeedback />} />
          </Routes>
        </BrowserRouter>
      </InnerContainer>
    </AppContainer>
  );
};

export default App;
