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

      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (nombre, email, password) => {
    try {
      const { data } = await api.post("/login/new", {
        nombre,
        email,
        password,
      });
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
      return true;
    } catch (err) {
      return err.response.data.msg;
    }
  };

  const verificaToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
    try {
      const { data } = await api.get("/login/renew", {
        headers: { "x-token": token },
      });
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
        return true;
      }
    } catch (error) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        nombre: null,
        email: null,
      });
      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      uid: null,
      checking: false,
      logged: false,
      nombre: null,
      email: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, login, register, verificaToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
