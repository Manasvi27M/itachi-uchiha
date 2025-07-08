import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
// import Home from "./pages/Home"; // Create a Home component for your main page
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactPage";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardPage from "./pages/DashboardPage";
import "./App.css";
import GenerateResumePage from "./pages/GenerateResumePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<SignInPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/generateresume" element={<GenerateResumePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
