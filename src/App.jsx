import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import Error from './pages/Error';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route exact path='/' element={<LoginPage />} />
        <Route path='*' element={<Error />} />
        {/* Protected routes */}
        <Route
          path='/todo'
          element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? children : null;
};

export default App;
