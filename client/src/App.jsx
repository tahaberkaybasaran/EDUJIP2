import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import List from "./components/List";
import Home from "./components/Home";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Read from "./components/Read";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/read/:id" element={<Read />} />
      </Routes>
    </BrowserRouter>
    // <>
    //   <Create />
    //   <List />
    // </>
  );
}

export default App;
