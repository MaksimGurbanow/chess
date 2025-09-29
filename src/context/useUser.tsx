import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GameResultReason,
  GameResultResult,
  ILoginData,
  ISignUpData,
} from '../types/types';
import { useWebsocket } from './useWebsocket';
import { WebsocketMessages } from '../utils/enums';

export interface IUserContext {
  user: User | null;
  getUserData?: (token: string) => Promise<void>;
  error: string | null;
  setError: Dispatch<React.SetStateAction<string | null>>;
  createNewUser: (credentials: ISignUpData) => Promise<void>;
  login: (credentials: ILoginData) => Promise<void>;
  logout: () => Promise<void>;
}

export interface User {
  games: Game[];
  name: string;
  email: string;
  darkTheme: boolean;
  id: string;
  statistics: {
    wins: number;
    loses: number;
    draws: number;
    gamesPlayed: number;
  };
}

export interface Game {
  players: [string, string];
  winnerId?: string;
  result: GameResultResult;
  reason: GameResultReason;
  gameId: string;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  error: null,
  setError: () => {
    throw new Error('Function not implemented.');
  },
  createNewUser: () => {
    throw new Error('Function not implemented.');
  },
  login: () => {
    throw new Error('Function not implemented.');
  },
  logout: () => {
    throw new Error('Function not implemented.');
  },
});

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { clientId, emitMessage } = useWebsocket();
  const getUserData = useCallback(
    async (token: string) => {
      try {
        if (!clientId) return;
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/profile`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              ClientId: clientId,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setUserData({
            name: data.name,
            email: data.email,
            darkTheme: data.darkTheme,
            statistics: data.statistics,
            games: data.games || [],
            id: data.id,
          });
        } else {
          setUserData(null);
          // sessionStorage.removeItem('access_token');
          navigate('/login');
        }
      } catch (e) {
        console.log('Failed to fetch user data', e);
        throw e;
      }
    },
    [clientId, navigate]
  );

  const createNewUser = useCallback(
    async (credentials: ISignUpData) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to sign up');
        }

        sessionStorage.setItem('access_token', data.access_token);
        await getUserData(data.access_token);
      } catch (e) {
        setError((e as Error).message);
        throw e;
      }
    },
    [getUserData]
  );

  const login = useCallback(
    async (credentials: ILoginData) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        const data = await res.json();
        if (res.ok) {
          sessionStorage.setItem('access_token', data.access_token);
          await getUserData(data.access_token);
        } else {
          throw new Error(data.message);
        }
      } catch (e) {
        setError((e as Error).message);
        throw e;
      }
    },
    [getUserData]
  );

  const logout = useCallback(async () => {
    try {
      const token = sessionStorage.getItem('access_token');

      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Logout failed');

      sessionStorage.removeItem('access_token');
      setUserData(null);
    } catch (e) {
      console.error('Logout failed:', e);
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    if (token && clientId) {
      getUserData(token || '');
    }
  }, [clientId, getUserData]);

  useEffect(() => {
    if (userData) {
      emitMessage(WebsocketMessages.GetGame, {
        playerId: userData.id,
      });
    }
  }, [emitMessage, userData]);

  const value = useMemo(
    () => ({
      user: userData,
      getUserData,
      error,
      setError,
      createNewUser,
      login,
      logout,
    }),
    [createNewUser, error, getUserData, login, logout, userData]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
