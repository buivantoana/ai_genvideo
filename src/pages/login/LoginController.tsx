import React, { useState } from "react";
import LoginView from "./LoginView";
import Loading from "../../components/Loading";
import { Login } from "../../service/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Props = {};

const LoginController = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (
      (email == "" && !email.trim()) ||
      (password == "" && !password.trim())
    ) {
      toast.warning("Bạn cần nhập đầy đủ thông tin.");
      return;
    }
    setLoading(true);
    try {
      let formData = {
        username: email,
        password,
      };
      let result = await Login(formData);
      if (Object.keys(result).length > 0 && result.access_token) {
        localStorage.setItem("token", result.access_token);

        toast.success("Đăng nhập thành công");
        setTimeout(() => {
          navigate("/account");
        }, 500);
      } else {
        toast.warning(result.detail);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <>
      {loading && <Loading />}
      <LoginView
        setPassword={setPassword}
        setEmail={setEmail}
        email={email}
        password={password}
        handleLogin={handleLogin}
      />
    </>
  );
};

export default LoginController;
