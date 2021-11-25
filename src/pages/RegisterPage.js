import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../auth/AuthContext";

export const RegisterPage = () => {
  //extraer registro del context
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    nombre: "",
  });

  const { email, password, nombre } = form;

  const handleChange = ({ target }) => {
    setForm((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ok = await register(nombre, email, password);
    ok !== true && Swal.fire("Error", ok, "error");

    setForm({ email: "", password: "", nombre: "" });
  };

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={handleSubmit}
    >
      <span className="login100-form-title mb-3">Chat - Registro</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          autoComplete="off"
          onChange={handleChange}
          value={nombre}
          className="input100"
          type="text"
          name="nombre"
          placeholder="Nombre"
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          autoComplete="off"
          onChange={handleChange}
          value={email}
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          autoComplete="off"
          onChange={handleChange}
          value={password}
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col text-right">
          <Link to="/auth/login" className="txt1">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          type="submit"
          disabled={
            nombre.trim() === "" ||
            !email.trim().includes("@") ||
            password.trim().length < 6
          }
          className="login100-form-btn"
        >
          Crear cuenta
        </button>
      </div>
    </form>
  );
};
