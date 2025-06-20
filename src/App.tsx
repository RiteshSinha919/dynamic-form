import React from "react";
import { AppContainer, InnerContainer } from "./styledApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExperienceCards from "./components/ExperienceCards";
import ProductFeedback from "./components/ProductFeedback";
import Counter from "./components/Counter";
import Notes from "./components/Notes";

const App: React.FC = () => {
  return (
    <AppContainer>
      <InnerContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/p1" element={<ExperienceCards />} />
            <Route path="/p2" element={<ProductFeedback />} />
            <Route path="/p3" element={<Counter />} />
            <Route path="/p4" element={<Notes />} />
          </Routes>
        </BrowserRouter>
      </InnerContainer>
    </AppContainer>
  );
};

export default App;
