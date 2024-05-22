import { HiOutlineEnvelope, HiOutlineKey, HiXMark } from "react-icons/hi2";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import AuthLayout from "../../Layout/AuthLayout";
import axios from "axios";
import { useState } from "react";
import Button from "../../Components/Button";
import InputField from "../../Components/InputField";
import Checkbox from "../../Components/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import validator from "validator";
import { Alert } from "@material-tailwind/react";
import { BsCheck2Circle } from "react-icons/bs";
import { MdError } from "react-icons/md";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [errors, setErrors] = useState({});
  const route = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!data.email) {
      newErrors.email = "Please fill in your email!";
    } else if (!validator.isEmail(data.email)) {
      newErrors.email =
        "Please use a valid email format (e.g., example@email.com).";
    }
    if (!data.password) {
      newErrors.password = "Please fill in your password!";
    }
    return newErrors;
  };

  const login = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      axios
        .post(`${import.meta.env.VITE_URL_API}/auth/login`, data)
        .then((res) => {
          setAlert({
            open: true,
            type: "success",
            message: "Login Successfully",
          });

          route("/");
        })
        .catch((err) => {
          setAlert({
            open: true,
            type: "error",
            message: err.response.data.message,
          });
        });
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        message: "An error occurred while logging in, please try again.",
      });
    }
  };

  const loginGoogle = async () => {
    const res = await axios.get(`${import.meta.env.VITE_URL_API}/login/google`);
    if (res.status === 200) {
      window.location.href = res.data.url;
    }
  };

  const loginFacebook = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_URL_API}/login/facebook`
    );
    if (res.status === 200) {
      window.location.href = res.data.url;
    }
  };

  return (
    <AuthLayout>
      {alert.open ? (
        <Alert
          color={alert.type == "success" ? "green" : "red"}
          variant="gradient"
          className="fixed top-0 right-0 left-0 py-5"
          animate={{
            mount: { y: 0, opacity: 1 },
            unmount: { y: -30, opacity: 0 },
          }}
          icon={
            alert.type == "success" ? (
              <BsCheck2Circle className="w-6 h-6" />
            ) : (
              <MdError className="w-6 h-6" />
            )
          }
          open={alert.open}
          action={
            <HiXMark
              className="w-6 h-6 absolute right-0 mr-5 cursor-pointer"
              onClick={() => setAlert({ open: false })}
            />
          }
        >
          {alert.message}
        </Alert>
      ) : (
        <></>
      )}
      <form
        onSubmit={login}
        className="w-[581px] max-h-[649px] flex flex-col gap-4 p-10 rounded-2xl shadow-xl"
      >
        <div className="space-y-2">
          <h3 className="font-semibold text-5xl">Welcome👋</h3>
          <p className="text-[#8C8C8C]">
            Welcome back! Enter your login details to access your account.
          </p>
        </div>
        <div className="space-y-3">
          <InputField
            label="Email Address"
            icon={HiOutlineEnvelope}
            name="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Enter your email"
            autoFocus
            error={errors}
          />
          <InputField
            label="Password"
            icon={HiOutlineKey}
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Enter your password"
            error={errors}
          />
          <div className="flex justify-between text-[#8C8C8C] text-sm">
            <Checkbox name="remember" label="Remember me" />
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="flex items-center gap-2 text-[#8C8C8C] text-sm">
            <div className="w-full h-[1px] bg-slate-300" />
            <span>Or</span>
            <div className="w-full h-[1px] bg-slate-300" />
          </div>
          <div className="flex justify-between items-center gap-2 text-[#8C8C8C]">
            <button
              type="button"
              className="w-full rounded-lg py-2 px-4 active:shadow-none border border-[#D9D9D9] bg-white shadow-sm text-sm flex items-center justify-center gap-2"
              onClick={loginGoogle}
            >
              <FaGoogle className="w-5 h-5" />
              <span>Sign in with Google</span>
            </button>
            <button
              type="button"
              className="w-full rounded-lg py-2 px-4 active:shadow-none border border-[#D9D9D9] bg-white shadow-sm flex justify-center items-center gap-2"
              onClick={loginFacebook}
            >
              <FaFacebook className="w-5 h-5" />
              <span>Sign in with Facebook</span>
            </button>
          </div>
          <Button type="submit">Login</Button>
          <span className="text-[#8C8C8C] text-sm text-center block">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-600">
              Sign Up
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
}
