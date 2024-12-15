import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Company from "./pages/Company";
import Home from "./pages/Home";
import Products from "./pages/Product";
import Navbar from "./components/Navbar";

function App() {

  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />
        </div>
        <div className="mt-16">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/companies" element={<Company />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
