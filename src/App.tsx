import React from "react";
import FormRoute from "./routes/FormRoute";
import { AppContainer } from "./styledApp";

const App: React.FC = () => {
  return (
    <AppContainer>
      <FormRoute />
    </AppContainer>
  );
};

export default App;
