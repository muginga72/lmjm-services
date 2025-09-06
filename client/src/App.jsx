import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import NavigationBar from "./components/NavigationBar";
import ServicesPromo from "./components/ServicesPromo";
import Home from "./pages/Home";
import LearnMore from "./pages/LearnMore";
import WhoWeAre from "./pages/WhoWeAre";
import Contact from "./pages/Contact";

import WeddingEventServices from "./pages/services/WeddingEventServices";
import WebDevelopmentServices from "./pages/services/WebDevelopmentServices";
import BeverageServices from "./pages/services/BeverageServices";
import TutoringServices from "./pages/services/TutoringServices";
import BuffetServices from "./pages/services/BuffetServices";
import BeautyServices from "./pages/services/BeautyServices";

import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";

function App() {
  return (
    <AuthProvider>
      <NavigationBar />
      <ServicesPromo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/contact" element={<Contact />} />

        {/* Services */}
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
      
      {/* Auth Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;