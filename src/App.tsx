import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import cityApi from './api/cityApi';
import { NotFound, PrivateRoute } from './components/Common';
import { AdminLayout } from './components/Layout';
import LoginPage from './features/auth/pages/LoginPage';

function App() {
  useEffect(() => {
    cityApi.getAll().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        />
        <Route element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
