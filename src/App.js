import "./App.css";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

function App() {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
