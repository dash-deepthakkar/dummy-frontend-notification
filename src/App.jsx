// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Login';
import { Home } from './Home';
import NotificationStompClient from './NotificationStompClient';


function App() {

  return (
    // <>
     <Routes>
        <Route path='/home' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/' element={ <NotificationStompClient /> } />
     </Routes>
    // </>
  )
}

export default App
