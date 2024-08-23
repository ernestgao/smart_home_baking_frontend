import LogInPage from "./components/loginPage";
import ManagementPage from "./components/managementPage";
import FirstPage from "./components/group1";
import ThirdPage from "./components/group3";
import BTtesting from "./components/scale";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route to LogInPage */}
          <Route path="/" element={<LogInPage />} />

          {/* Route to Manage User Page */}
          <Route path="/manage" element={<ManagementPage />} />

          {/* Route to First Page */}
          <Route path="/planning" element={<FirstPage />} />

          {/* Route to Third Page */}
          <Route path="/evaluate" element={<ThirdPage />} />

          {/* Route to Bluetooth Testing */}
          <Route path="/scale" element={<BTtesting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
