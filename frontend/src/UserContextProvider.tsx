import React from 'react';
import UserContext from './UserContext';

interface Props {
  children: React.ReactNode;
}

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState(undefined);
  const [loaded] = React.useState<boolean>(false);
  const [admin, setAdmin] = React.useState<boolean>(false);
  const [menuKey, setMenuKey] = React.useState<string | null>(
    localStorage.getItem('menuKey') || 'new',
  );
  // const [userPrefs, setUserPrefs] = React.useState<any>({});
  // React.useEffect(() => {
  //   const loadData = async () => {
  //     await Auth.currentAuthenticatedUser().then(() =>
  //       Auth.currentUserInfo().then((authUser: any) => {
  //         setUser(authUser);
  //         setLoaded(true);
  //         // setUserPrefs({})
  //       }),
  //     );
  //     await Auth.currentUserPoolUser().then((userPool: any) => {
  //       if (userPool.signInUserSession.idToken.payload['cognito:groups']) {
  //         setAdmin(
  //           userPool.signInUserSession.idToken.payload['cognito:groups'][0] ===
  //             'admin',
  //         );
  //       } else {
  //         setAdmin(false);
  //       }
  //     });
  //   };
  //   loadData();
  // }, [user === undefined]);

  React.useEffect(() => {
    setMenuKey(menuKey);
    // eslint-disable-next-line prettier/prettier
    localStorage.setItem('menuKey', menuKey!);
  }, [menuKey]);

  const contextValue = React.useMemo(
    () => ({
      user,
      setUser,
      admin,
      setAdmin,
      menuKey,
      setMenuKey,
      // userPrefs,
      // setUserPrefs,
    }),
    [user, menuKey],
  );

  if (loaded) {
    return (
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    );
  }
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
