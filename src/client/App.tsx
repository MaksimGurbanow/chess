import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from '../routes/Login';
import Main from '../routes/Main';
import Home from '../routes/Home';
import Profile from '../routes/Profile';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
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
