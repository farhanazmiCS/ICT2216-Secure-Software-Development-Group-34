import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  Home,
  SinglePet,
  Cart,
  Checkout,
  Error,
  About,
  Pets,
  PrivateRoute,
  AuthWrapper,
  Login,
} from './pages';
function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>

          {/* User Routes */}
          <Route path='/' exact element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='cart' element={<Cart />} />
          <Route path='pets' element={<Pets />} />
          <Route path='pets/:id' element={<SinglePet />} />
          <Route path='login' element={<Login />} />
          <Route
            path='checkout'
            element={
                // <PrivateRoute>
                  <Checkout />
                // </PrivateRoute>
            }
          />

          {/* Staff Routes */}
          {/* <Route
            path='staff'
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats />} />
            <Route path='all-jobs' element={<AllJobs />} />
            <Route path='add-job' element={<AddJob />} />
            <Route path='profile' element={<Profile />} />
          </Route> */}
          
          {/* Error Route */}
          <Route path='*' element={<Error />} />

        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
