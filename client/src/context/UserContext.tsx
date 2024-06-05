import { FC, ReactNode, createContext, useMemo, useState } from 'react';
import { ILoginData, User } from '../types/types';
import fetchUser from '../api/requests/fetchUser';

interface UserContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchAndSetUser: (data: ILoginData) => Promise<void>;
}

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchAndSetUser = async (data: ILoginData) => {
    const userData = await fetchUser(data);
    setUser({
      wins: 0,
      loses: 0,
      username: userData.username,
      password: userData.password,
      email: userData.email,
      draws: 0,
      darkTheme: true,
      games: 0,
    });
  };

  const value = useMemo(() => ({ user, setUser, fetchAndSetUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
