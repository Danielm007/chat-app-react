import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import { AuthContext } from "../auth/AuthContext";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    email: localStorage.getItem("email") || "test1@test.com",
    password: "abc123",
    rememberme: true,
  });

  const { email, password, rememberme } = formValues;

  const handleChange = ({ target }) => {
    setFormValues((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const toggleCheck = () => {
    setFormValues({
      ...formValues,
      rememberme: !formValues.rememberme,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    rememberme
      ? localStorage.setItem("email", email)
      : localStorage.removeItem("email");

    //Petición al backend
    const ok = await login(email, password);
    !ok && swal.fire("Error", "Verifique el usuario y la contraseña", "error");
  };

  const todoOk = () => {
    return email.trim() === "" || password.trim() === "";
  };

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={handleSubmit}
    >
      <span className="login100-form-title mb-3">Chat - Ingreso</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
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
        <div className="col" onClick={() => toggleCheck()}>
          <input
            onChange={handleChange}
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
            name="rememberme"
            checked={rememberme}
          />
          <label className="label-checkbox100">Recordarme</label>
        </div>

        <div className="col text-right">
          <Link to="/auth/register" className="txt1">
            Nueva cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          disabled={todoOk()}
          type={"submit"}
          className="login100-form-btn"
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};
