import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './routes/Login';
import Main from './routes/Main';
import Home from './routes/Home';
import Profile from './routes/Profile';
import UserProvider from './context/UserContext';

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </UserProvider>
  );
};

const WrappedApp = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
};

export default WrappedApp;
