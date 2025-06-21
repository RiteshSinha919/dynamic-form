import React from "react";
import { AppContainer, InnerContainer } from "./styledApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExperienceCards from "./components/ExperienceCards";
import ProductFeedback from "./components/ProductFeedback";
import Counter from "./components/Counter";
import Notes from "./components/Notes";
import CountdownCard from "./components/CountdownCard";
import VotingCard from "./components/VotingCard";

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
            <Route path="/p7" element={<CountdownCard />} />
            <Route path="/p8" element={<VotingCard />} />
          </Routes>
        </BrowserRouter>
      </InnerContainer>
    </AppContainer>
  );
};

export default App;
