/* eslint-disable no-unused-vars */
import { createContext } from 'react';

interface UserContextType {
  token: any;
  setToken: (value: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
