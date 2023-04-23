import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import Login from "./pages/Login";
import POI from "./pages/POI";
import styled from "styled-components";

const AppContainer = styled.div``;
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSuccess = () => {
    console.log("Login successful!");
    setLoggedIn(true);
  };
  const handleLogout = () => {
    setLoggedIn(false);
  };
  const AppContainer = styled.div`
    height: 100%;
  `;

  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout loggedIn={loggedIn} onLogout={handleLogout} />}
          >
            <Route path="/" element={<Home />} />
            <Route path="/cities" element={<Cities />} />
            <Route
              path="/login"
              element={<Login onSuccess={handleSuccess} />}
            />
            <Route path="/poi/:id" element={<POI />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
