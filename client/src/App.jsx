import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { UserContext } from './context/UserContext';
import NavigationBar from "./components/NavigationBar";
import ServicesPromo from "./components/ServicesPromo";
import Home from "./pages/Home";
import WhoWeAre from "./pages/WhoWeAre";
import Contact from "./pages/Contact";
import LearnMore from "./pages/LearnMore";
import WebDevelopmentServices from "./pages/services/WebDevelopmentServices";
import WeddingEventServices from "./pages/services/WeddingEventServices";
import TutoringServices from "./pages/services/TutoringServices";
import BuffetServices from "./pages/services/BuffetServices";
import BeverageServices from "./pages/services/BeverageServices";
import BeautyServices from "./pages/services/BeautyServices";

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationBar />
      <ServicesPromo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/contact" element={<Contact />} />

        {/* Route for the services available */}
        <Route
          path="/services/wedding-events"
          element={<WeddingEventServices />}
        />

        <Route
          path="/services/web-development"
          element={<WebDevelopmentServices />}
        />
        <Route path="/services/beverages" element={<BeverageServices />} />
        <Route path="/services/tutoring" element={<TutoringServices />} />
        <Route path="/services/buffet" element={<BuffetServices />} />
        <Route path="/services/beauty" element={<BeautyServices />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;