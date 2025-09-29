import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.scss';
import Login from './routes/Login/Login';
import Main from './routes/Main/Main';
import Home from './routes/Home/Home';
import Profile from './routes/Profile';
import Header from './components/Header/Header';
import Footer from './components/footer/Footer';
import GameProvider from './context/useGame';
import WebsocketProvider from './context/useWebsocket';
import WaitWindow from './components/WaitWindow/WaitWindow';
import GameOfferAlert from './components/GameOfferAlert/GameOfferAlert';
import SignUp from './routes/SignUp/SignUp';
import UserProvider from './context/useUser';

const Index = () => {
  return (
    <WebsocketProvider>
      <UserProvider>
        <GameProvider>
          <Header />
          <WaitWindow />
          <GameOfferAlert />
          <Outlet />
          <Footer />
        </GameProvider>
      </UserProvider>
    </WebsocketProvider>
  );
};

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'main',
        element: <Main />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={browserRouter} />;
};

export default App;
