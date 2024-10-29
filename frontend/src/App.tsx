import { Route, Routes } from 'react-router-dom';
import UserRouter from './Router/UserRouter';
import DoctorRouter from './Router/DoctorRouter';


function App() {
  
  return (
    <Routes>
      <Route path='/*' element={<UserRouter/>}/>
      <Route path='/doctor/*' element={<DoctorRouter/>}/>
     
    </Routes>
  )
}

export default App
