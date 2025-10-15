import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import UserLogin from "../pages/auth/UserLogin";
import UserRegister from "../pages/auth/UserRegister";
import CreateFood from "../pages/food-partner/CreateFood";
import Profile from "../pages/food-partner/profile";
import Home from "../pages/general/home";
import Saved from "../pages/general/saved";
import BottomNav from "../components/BottomNav";
import ChooseLogin from "../components/chooseLogin";

const AppRoute = () => {
  return (
    <Router>
      <Routes>
         {/* <Route path="/register" element={<ChooseRegister />} /> */}
            <Route path="/" element={<ChooseLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />}/>
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/home" element={<Home /> } />
        <Route path="/saved" element={<><Saved /><BottomNav/></>} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:id" element={<Profile />} />


      </Routes>
    </Router>
  );
};

export default AppRoute;