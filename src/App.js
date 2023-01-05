import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Pages/About/About";
import Manage from "./Pages/Admin/Manage/Manage";
import ShowAllExpert from "./Pages/Admin/ShowAllExpert/ShowAllExpert";
import ShowAllService from "./Pages/Admin/ShowAllService/ShowAllService";
import CheckOut from "./Pages/CheckOut/CheckOut";
import ExpertAdd from "./Pages/FormPage/Expert/ExpertAdd";
import ExpertUpdate from "./Pages/FormPage/Expert/ExpertUpdate";
import ServiceAdd from "./Pages/FormPage/ServiceForm/ServiceAdd";
import ServiceUpdate from "./Pages/FormPage/ServiceForm/ServiceUpdate";
import ExpertDetails from "./Pages/Home/ExpertDetails/ExpertDetails";
import Home from "./Pages/Home/Home/Home";
import ServiceDetails from "./Pages/Home/ServiceDetail/ServiceDetails";
import Login from "./Pages/Login/Login/Login";
import Register from "./Pages/Login/Register/Register";
import RequireAuth from "./Pages/Login/RequireAuth/RequireAuth";
import Footer from "./Pages/Shared/Footer/Footer";
import Header from "./Pages/Shared/Header/Header";
import ErrorPage from "./Pages/Shared/NotFound/ErrorPage";

function App() {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/service/:id" element={<ServiceDetails />}></Route>
        <Route path="/expert/:id" element={<ExpertDetails />}></Route>
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <CheckOut />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/manage"
          element={
            <RequireAuth>
              <Manage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/manage/allService"
          element={
            <RequireAuth>
              <ShowAllService />
            </RequireAuth>
          }
        ></Route>
        <Route path="/manage/serviceAdd" element={<ServiceAdd />}></Route>
        <Route
          path="/manage/serviceUpdate/:id"
          element={<ServiceUpdate />}
        ></Route>
        <Route
          path="/manage/allExpert"
          element={
            <RequireAuth>
              <ShowAllExpert />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/manage/addExpert"
          element={
            <RequireAuth>
              <ExpertAdd />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/manage/expertUpdate/:id"
          element={
            <RequireAuth>
              <ExpertUpdate />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
