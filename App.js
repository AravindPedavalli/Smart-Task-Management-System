import React, { useState, useEffect } from 'react';
import Register from './Register';
import Login from './Login';
import TaskDashboard from './TaskDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <h1>📝 Smart Task Manager</h1>

      {isLoggedIn ? (
        <>
          <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
            Logout
          </button>
          <TaskDashboard />
        </>
      ) : (
        <>
          <Register />
          <Login onLogin={() => setIsLoggedIn(true)} />
        </>
      )}
    </div>
  );
}

export default App;
