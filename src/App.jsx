import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataStoreProvider } from "./data_store"; 
import Login from "./login";
import Signup from "./signup";
import Fullmain from "./fullmain";
import "./index.css"

function App() {
  return (
    <DataStoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Fullmain />} />
        </Routes>
      </Router>
    </DataStoreProvider>
  );
}

export default App;
