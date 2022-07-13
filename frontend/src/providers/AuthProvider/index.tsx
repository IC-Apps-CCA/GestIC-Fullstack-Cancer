import React, { createContext, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { api } from '../../services/api';

interface User {
  title: string;
  image_id: string;
  id: string;
  name: string;
  email: string;
  profileTag: string;
}

interface AuthState {
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();

  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@GestIC:user');

    if (user) {
      return { user: JSON.parse(user) };
    }

    const myUser = {
      title: '',
      image_id: '',
      id: '',
      name: '',
      email: '',
      profileTag: '',
    }
    // add myUser here to remove auth
    return {user: myUser} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const { data: user } = await api.post('access/login', {
      email,
      password,
    });

    localStorage.setItem('@GestIC:user', JSON.stringify(user));
    localStorage.setItem('@GestIC:token', JSON.stringify(user.token));

    setData({ user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GestIC:user');
    localStorage.removeItem('@GestIC:token');

    history.push('/');

    setData({} as AuthState);
  }, [history]);

  // Invalid Token Interceptor
  api.interceptors.response.use(
    function res(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response;
    },
    function err(error) {
      console.log(error.response);
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      if (error.response?.data?.auth === false) {
        signOut();
      }

      return Promise.reject(error);
    },
  );

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GestIC:user', JSON.stringify(user));

      setData({
        user,
      });
    },
    [setData],
  );

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }}>{children}</AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
