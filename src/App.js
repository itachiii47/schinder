import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
    return (
        <BrowserRouter>
            <Routes />
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
