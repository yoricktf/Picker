import './App.css';
import Login from './pages/Login'
import Signup from './pages/Signup';
import Categories from './pages/Categories';
import NavBar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/categories'
          element={
            <ProtectedRoute redirectTo='/'>
              <Categories />
            </ProtectedRoute>
          }
        />



      </Routes>


    </div>
  );
}

export default App;
