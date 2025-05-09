import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import axiosInstance from '../API/axiosInstance';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const savedUser = await AsyncStorage.getItem('userInfo');

        if (!token) {
          if (savedUser) setUser(JSON.parse(savedUser));
          setReady(true);
          return;
        }

        const res = await axiosInstance.get('/user/profile/');
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setReady(true);
      }
    };

    loadUser();
  }, []);

  const value = useMemo(() => ({ user, setUser, ready }), [user, ready]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
