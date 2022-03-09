import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
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
        {/* <Route path='/lists' element={<Lists />} /> */}
        {/* <Route path='/lists/new' element={<NewList />} /> */}
        {/* <Route path='/lists/:id/friends' element={<Friends />} /> */}
        {/* <Route path='/lists/:id/items' element={<Items />} /> */}
        {/* <Route path='/matches' element={<Matches />} /> */}
        <Route path='/Lists' element={
          <ProtectedRoute redirectTo='/'>
            <Lists />
          </ProtectedRoute>
        }
        />
        <Route path='/Lists/new' element={
          <ProtectedRoute redirectTo='/'>
            <NewList />
          </ProtectedRoute>
        }
        />
        <Route path='/Lists/:id/friends' element={
          <ProtectedRoute redirectTo='/'>
            <Friends />
          </ProtectedRoute>
        }
        />
        <Route path='/Lists/:id/items' element={
          <ProtectedRoute redirectTo='/'>
            <Items />
          </ProtectedRoute>
        }
        />
        <Route path='/matches' element={
          <ProtectedRoute redirectTo='/'>
            <Matches />
          </ProtectedRoute>
        }
        />

        <Route path='/*' element={<Login />} />

      </Routes>


    </div>
  );
}

export default App;
