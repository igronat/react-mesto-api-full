import React, { useState } from "react";
import Header from "./Header";

function Login({ handleLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    handleLogin(email, password);
  }

  return (
    <>
      <Header menu="Регистрация" link="/signup" />

      <main className="content content__form">
        <form className="form" onSubmit={handleSubmit}>
          <p className="form__header">Вход</p>
          <input
            required
            id="email"
            value={email}
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
            className="form__input"
          />
          <input
            required
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
            placeholder="Пароль"
            className="form__input"
          />
          <button type="submit" className="form__button">
            Войти
          </button>
        </form>
      </main>
    </>
  );
}

export default Login;
