import { createContext, useCallback, useState } from "react";
import { api } from "../api/axiosClient";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/login", { email, password });
      if (data.ok) {
        localStorage.setItem("token", data.token);
        const { uid, nombre, email } = data.usuario;
        setAuth({
          uid,
          checking: false,
          logged: true,
          nombre,
          email,
        });
      }
      console.log("Autenticado");
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = (nombre, email, password) => {};

  const verificaToken = useCallback(() => {}, []);

  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, login, register, verificaToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
