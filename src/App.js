import NavbarComp from "./NavbarComp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Tasks } from "./Tasks";
import AddTask from "./AddTask";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/home" element={<NavbarComp />}></Route>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/add_task" element={<AddTask />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
