import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

export default function Login({ setToken, setadmin, token }) {
  // جبنا السيت من الاب
  // ^ فانكشن نمرره عشان نعدل على التوكن

  const [email, setEmail] = useState("");
  const [user, setuser] = useState([]);
  const [password, setPassword] = useState("");
  const history = useHistory();

  const changeEml = (e) => {
    setEmail(e.target.value);
  };
  const changePas = (e) => {
    setPassword(e.target.value);
  };
  const login = async () => {
    const result = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });

    if (token) {
      const response = await axios.get("http://localhost:5000/user", {
        headers: { authorization: "Bearer " + token },
      });
      setuser(response.data);
    }
    setToken(result.data.token);
    setadmin(result.data.payload.admin);
    history.push("/Home");
  };

  return (
    <div className="InputLog">
      <input
        onChange={(e) => {
          changeEml(e);
        }}
        type="email"
        palceholder="email"
      />
      <input
        onChange={(e) => {
          changePas(e);
        }}
        type="password"
        palceholder="password"
      />
      <button
        className="submit"
        onClick={() => {
          login();
        }}
      >
        {" "}
        login
      </button>
    </div>
  );
}
