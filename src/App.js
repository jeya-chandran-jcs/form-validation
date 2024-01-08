
import './App.css';
import Form from './components/Form';
import Create from './components/Create';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import User from './components/User';
import Edit from "./components/Edit"
function App() {
  return (
    <div className="App">
     
      <Router>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/user" element={<User/>} />
          <Route path="/user/create" element={<Create/>}/>
          <Route path="/user/edit/:id" element={<Edit/>}/>
         

        </Routes>
      </Router>
    </div>
  );
}

export default App;
