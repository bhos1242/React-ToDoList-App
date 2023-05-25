import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ToDoApp from './Components/ToDoApp';
import ToDoList from './Components/ToDoList';
import "./App.css";
function App() {
  const [selectedComponent, setSelectedComponent] = useState('ToDoList');

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  const renderComponent = () => {
    if (selectedComponent === 'ToDoList') {
      return <ToDoList />;
    } else if (selectedComponent === 'ToDoApp') {
      return <ToDoApp />;
    }
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => handleComponentChange('ToDoList')}
              >
                ToDoList<br></br><span>(Theme-1)</span> 
              </Link>
            </li>
            <li>
              <Link
                to="/todo"
                onClick={() => handleComponentChange('ToDoApp')}
              >
                ToDoApp <br></br><span>(Theme-2)</span> 
              </Link>
            </li>
          </ul>
        </nav>

        {renderComponent()}
      </div>
    </Router>
  );
}

export default App;
