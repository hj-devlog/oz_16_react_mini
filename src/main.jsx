import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import MovieDetail from "./MovieDetail.jsx";
import Layout from "./components/Layout.jsx";
import Search from "./pages/Search.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/search" element={<Search />} />
          <Route path="/details/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
