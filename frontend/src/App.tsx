import { Route, Routes } from 'react-router-dom';
import UserRouter from './Router/UserRouter';


function App() {
  
  return (
    <Routes>
      <Route path='/*' element={<UserRouter/>}/>
      {/* <Route path='/seller/*' element={<SellerRouter/>}/>
      <Route path='/admin/*' element={<AdminRouter/>}/> */}
    </Routes>
  )
}

export default App
