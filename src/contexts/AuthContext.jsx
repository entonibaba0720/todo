import React, { useState, createContext, useEffect } from 'react';

// Létrehozunk egy context-et, ami a belépett felhasználó adatait fogja tárolni
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // A useEffect hookot használjuk arra, hogy ellenőrizzük, van-e bejelentkezett felhasználó,
  // és ha van, akkor beállítjuk a user állapotot
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (
      storedUser &&
      storedUser.username === 'teszt' &&
      storedUser.password === 'teszt123'
    ) {
      setUser(storedUser);
    }
  }, []);

  // A login függvényt arra használjuk, hogy bejelentkeztessünk egy felhasználót,
  // és elmentjük a felhasználó adatait a localStorage-ban
  const login = userData => {
    setUser(userData);
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
  };

  // A logout függvénnyel ki tudunk jelentkezni, a felhasználó adatait töröljük a localStorage-ból,
  // és beállítjuk a user állapotot null-ra
  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
  };

  // A provider-nél megadjuk az értékeket, amiket szeretnénk a context-ben elérni, azaz a usert a login és logout függvényeket
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
