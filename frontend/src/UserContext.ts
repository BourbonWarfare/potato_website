/* eslint-disable no-unused-vars */
import { createContext } from 'react';

interface UserContextType {
  user: any;
  setUser: (value: any) => void;
  admin: any;
  setAdmin: (value: any) => void;
  menuKey: any;
  setMenuKey: (value: any) => void;
  // userPrefs: any;
  // setUserPrefs: (value: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
