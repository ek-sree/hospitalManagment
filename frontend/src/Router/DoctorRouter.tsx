import { Route, Routes } from "react-router-dom"
import HomePage from "../Page/Doctor/Home/HomePage"




const DoctorRouter = () => {
  return (
    <Routes>
      {/* <Route element={<PrivateRouter/>}>
      </Route> */}

      {/* <Route element={<PublicRouter/>}> */}
        {/* <Route path="/signup" element={<SignupPage/>}/> */}
        <Route path="/home" element={<HomePage/>}/>
      {/* </Route> */}
    </Routes>
  )
}

export default DoctorRouter