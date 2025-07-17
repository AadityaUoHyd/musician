import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useUserData } from "./context/UserContext";
import Loading from "./components/Loading";
import Register from "./pages/Register";
import Album from "./pages/Album";
import PlayList from "./pages/PlayList";
import Admin from "./pages/Admin";
import SongDetail from "./pages/SongDetail";

const App = () => {
  const { isAuth, loading } = useUserData();
  
  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
        <Route path="/album/:id" element={isAuth ? <Album /> : <Login />} />
        <Route path="/playlist" element={isAuth ? <PlayList /> : <Login />} />
        <Route path="/admin/dashboard" element={isAuth ? <Admin /> : <Login />} />
        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        <Route path="/register" element={isAuth ? <Home /> : <Register />} />
        <Route path="/songs/:id" element={isAuth ? <SongDetail /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
