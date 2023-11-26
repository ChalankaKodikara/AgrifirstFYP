import React, { createContext, useState } from 'react';

const initialAuthState = {
  username: '',
  id: 0,
  status: false,
  setAuthState: () => {},
};

export const AuthContext = createContext(initialAuthState);

export const AuthProvider = ({ children }) => {
  // Your AuthProvider logic here
};
