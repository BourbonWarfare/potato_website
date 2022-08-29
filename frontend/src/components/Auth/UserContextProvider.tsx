import React from 'react';
import UserContext from './UserContext';

type Props = {
  children: React.ReactNode,
};

const UserContextProvider = ({ children }: Props) => {
  // const [authed, setAuthed] = React.useState();
  // const [loaded, setLoaded] = React.useState<boolean>(false);
  const [token, setToken] = React.useState();
  // React.useEffect(() => {
  //   // check for authed?
  // }, [authed === undefined]);

  const contextValue = React.useMemo(
    () => ({
      token,
      setToken,
    }),
    [token],
  );
  // React.useEffect(() => {
  //   // const checkAuth = async () =>
  //   //   contextValue.user !== undefined && setLoaded(true);
  //   // checkAuth();
  //   // if (loaded) {
  //   //   console.log('contextValue.user: ', contextValue.user);
  //   //   console.log('context value: ', contextValue);
  //   // }
  // }, [user]);
  // if (loaded) {
  //   return (
  //     <UserContext.Provider value={contextValue}>
  //       {children}
  //     </UserContext.Provider>
  //   );
  // }
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
