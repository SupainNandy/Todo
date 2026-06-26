
import { Routes,Route } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import ProtectedRoutes from '../middleware/ProtectedRoutes'

const MyRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<SignUp/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/dashboard' element={
          <ProtectedRoutes>
            <Dashboard/>
          </ProtectedRoutes>
          
          } />
        <Route path='*' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default MyRoutes
