
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

import Home from "./Components/Home";

import ContextProvider from "./Components/ContextProvider";



const App = () => {
 
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:id" element={<Home />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
};

export default App;
