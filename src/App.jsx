import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
// import Home from "./pages/Home"; // Create a Home component for your main page
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/auth" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
