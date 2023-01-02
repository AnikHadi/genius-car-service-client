import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Pages/About/About";
import CheckOut from "./Pages/CheckOut/CheckOut";
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
