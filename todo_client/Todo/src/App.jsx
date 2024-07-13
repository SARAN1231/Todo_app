
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import ContextProvider from "./Components/ContextProvider";
import Home from "./Components/Home";


const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/:id" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
};

export default App;
