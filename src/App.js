import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import POSPage from "./Pages/POSPage";
import ListPage from "./Pages/ListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/pos" element={<POSPage/>}/>
        <Route path="/list" element={<ListPage/>}/>

      </Routes>
    </Router>
  );
}

export default App;
