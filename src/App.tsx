import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.scss';
import Login from './routes/Login';
import Main from './routes/Main';
import Home from './routes/Home/Home';
import Profile from './routes/Profile';
import { StoreProvider } from './redux/store';
import Header from './components/Header/Header';
import Footer from './components/footer/Footer';
import { GameProvider } from './context/useGame';

const Index = () => {
  return (
    <StoreProvider>
      <GameProvider>
        <Header />
        <Outlet />
        <Footer />
      </GameProvider>
    </StoreProvider>
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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={browserRouter} />;
};

export default App;
