import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Login from "./components/login";
import Signup from "./components/signup";
import Add from "./pages/Add";
import Books from "./pages/Books";
import Update from "./pages/Update";
import "./style.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home/>} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;