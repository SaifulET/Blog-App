
import axios from "axios"
import Login from "./component/login"
import Register from "./component/register"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Home from "./pages/Home"
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Blog from "./pages/Blog"
import BlogDetails from "./component/BlogDetails"
import ServicesSection from "./pages/Service"
import User from "./Admin/getUser/User"
import AddUser from './Admin/addUser/AddUser';
import UpdateUser from './Admin/updateUser/UpdateUser';
import BlogAll from "./Admin/Blog/BlogAll"
import CreateBlog from "./Admin/Blog/CreateBlog"
import UpdateBlog from "./Admin/Blog/UpdateBlog"
import ServiceAll from "./Admin/Service/ServiceAll"
import AddService from "./Admin/Service/AddService"
import UpdateService from "./Admin/Service/updateService"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Members from "./Admin/Team/Members"
import AddMember from "./Admin/Team/AddMember"
import UpdateMemberInfo from "./Admin/Team/updateMember"


function App() {
  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) return value;
    }
    return null;
  }
const token = getCookie("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/service" element={<ServicesSection/>}></Route>
        <Route path="/blog" element={<Blog/>}></Route>
        <Route path="/blog/:id" element={<BlogDetails/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>


        <Route path="/user" element={<User/>}></Route>
        <Route path="/add" element={<AddUser/>}></Route>
        <Route path={`/update/:id`} element={<UpdateUser/>}></Route>

        <Route path="/BLogAll" element={<BlogAll/>}></Route>
        <Route path="/addBlog" element={<CreateBlog/>}></Route>
        <Route path={`/updateBlog/:id`} element={<UpdateBlog/>}></Route>



        <Route path="/Privacy" element={<PrivacyPolicy/>}></Route>

        <Route path="/serviceAll" element={<ServiceAll/>}></Route>
        <Route path="/addService" element={<AddService/>}></Route>
        <Route path={`/updateService/:id`} element={<UpdateService/>}></Route>

        <Route path="/Teams" element={<Members/>}></Route>
        <Route path="/addMember" element={<AddMember/>}></Route>
        <Route path={`/updateMemberInfo/:id`} element={<UpdateMemberInfo/>}></Route>


        

        
      </Routes>
    </BrowserRouter>
  )
}

export default App
