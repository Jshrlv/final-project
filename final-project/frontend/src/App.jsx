import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import FormPage from "./pages/FormPage";

function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        
        {/* Navigation */}
        <nav style={{ padding: "1rem", background: "#f5f5f5" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
          <Link to="/form">Form</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;