import './App.css';
import Login from './pages/Login'
import Signup from './pages/Signup';
import Lists from './pages/Lists';
import NewList from './pages/NewList';
import Items from './pages/Items';
import Friends from './pages/Friends';
import Matches from './pages/Matches';
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
        <Route path='/lists' element={<Lists />} />
        <Route path='/lists/new' element={<NewList />} />
        <Route path='/lists/:id/friends' element={<Friends />} />
        <Route path='/lists/:id/items' element={<Items />} />
        <Route path='/matches' element={<Matches />} />




        {/* <Route
          path='/Lists'
          element={
            <ProtectedRoute redirectTo='/'>
              <Lists />
            </ProtectedRoute>
          }
        /> */}



      </Routes>


    </div>
  );
}

export default App;
