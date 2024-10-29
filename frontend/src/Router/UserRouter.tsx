import { Route, Routes } from "react-router-dom"

import LoginPage from "../Page/userPage/Auth/Login"
import SignupPage from "../Page/userPage/Auth/Signup"
import HomePage from "../Page/userPage/Home/HomePage"



const UserRouter = () => {
  return (
    <Routes>
      {/* <Route element={<PrivateRouter/>}>
      </Route> */}

      {/* <Route element={<PublicRouter/>}> */}
        {/* <Route path="/signup" element={<SignupPage/>}/> */}
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
      {/* </Route> */}
    </Routes>
  )
}

export default UserRouter