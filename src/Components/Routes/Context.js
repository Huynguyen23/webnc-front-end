import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}
