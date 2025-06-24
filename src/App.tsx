import React from "react";
import { AppContainer, InnerContainer } from "./styledApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExperienceCards from "./components/ExperienceCards";
import ProductFeedback from "./components/ProductFeedback";
import Counter from "./components/Counter";
import Notes from "./components/Notes";
import CountdownCard from "./components/CountdownCard";
import VotingCard from "./components/VotingCard";
import Accordion from "./components/Accordion";
import TextGenerator from "./components/TextGenerator";
import PollingCard from "./components/PollingCard";
import MultiStepForm from "./components/MultiStepForm";
import TodoApp from "./components/TodoApp";
import { UserProfileProvider } from "./store/UserProfileContext";
import ProfileOverview from "./components/ProfileOverview";
import EditProfile from "./components/EditProfile";
import Settings from "./components/Settings";
import PageNotFound from "./components/PageNotFound";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { CartProvider } from "./store/CartContext";

const App: React.FC = () => {
  return (
    <AppContainer>
      <InnerContainer>
        <BrowserRouter>
          <CartProvider children={undefined}>
            <UserProfileProvider children={undefined}>
              <Routes>
                <Route path="/p1" element={<ExperienceCards />} />
                <Route path="/p2" element={<ProductFeedback />} />
                <Route path="/p3" element={<Counter />} />
                <Route path="/p4" element={<Notes />} />
                <Route path="/p5" element={<PollingCard />} />
                <Route path="/p6" element={<MultiStepForm />} />
                <Route path="/p7" element={<CountdownCard />} />
                <Route path="/p8" element={<VotingCard />} />
                <Route path="/p9" element={<TodoApp />} />
                <Route path="/p10" element={<Accordion />} />
                <Route path="/p11" element={<TextGenerator />} />
                <Route path="/p13" element={<ProfileOverview />} />
                <Route path="/profile" element={<ProfileOverview />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/profile/settings" element={<Settings />} />
                <Route path="/p14" element={<ProductList />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </UserProfileProvider>
          </CartProvider>
        </BrowserRouter>
      </InnerContainer>
    </AppContainer>
  );
};

export default App;
