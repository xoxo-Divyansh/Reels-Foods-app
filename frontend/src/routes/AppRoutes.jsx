import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from './UserRegister';
import UserLogin from './UserLogin';
import FoodPartnerRegister from './FoodPartnerRegister';
import FoodPartnerLogin from './FoodPartnerLogin';

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path='/user/register' element={<UserRegister />} />
        <Route path='/user/login' element={<UserLogin />} />
        <Route path='/food-partner/register' element={<FoodPartnerRegister />} />
        <Route path='/food-partner/login' element={<FoodPartnerLogin />} />
        {/* Do not match '/' for 404 */}
        <Route path='/' element={<UserLogin />} />
        <Route path='*' element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoute;