import {
  HiCheckCircle,
  HiOutlineEnvelope,
  HiOutlineKey,
  HiOutlineUser,
  HiXMark,
} from "react-icons/hi2";
import AuthLayout from "../../Layout/AuthLayout";
import axios from "axios";
import { useState } from "react";
import Button from "../../Components/Button";
import InputField from "../../Components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import validator from "validator";
import Cookies from "js-cookie";
import { Alert } from "@material-tailwind/react";
import { BsCheck2Circle } from "react-icons/bs";
import { MdError } from "react-icons/md";

export default function Register() {
  const [data, setData] = useState({ email: "", name: "", password: "" });
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [error, setErrors] = useState({});
  const route = useNavigate();
  const [pwd, setPwd] = useState({
    lowerCase: false,
    upperCase: false,
    number: false,
    min8: false,
    specialChar: false,
  });

  const changePwd = (e) => {
    const val = e.target.value;
    setData({ ...data, password: val });

    setPwd({
      lowerCase: /[a-z]/.test(val),
      upperCase: /[A-Z]/.test(val),
      number: /[0-9]/.test(val),
      min8: val.length >= 8,
      specialChar: /[^A-Za-z0-9]/.test(val),
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!data.email) {
      newErrors.email = "Please fill in your email!";
    } else if (!validator.isEmail(data.email)) {
      newErrors.email =
        "Please use a valid email format (e.g., example@email.com).";
    }

    if (!data.name) {
      newErrors.name = "Please fill in your name!";
    }

    if (!data.password) {
      newErrors.password = "Please fill in your password!";
    } else if (
      !pwd.lowerCase ||
      !pwd.upperCase ||
      !pwd.number ||
      !pwd.min8 ||
      !pwd.specialChar
    ) {
      newErrors.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.";
    }

    return newErrors;
  };

  const register = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      axios
        .post(`${import.meta.env.VITE_URL_API}/auth/register`, data)
        .then((res) => {
          setAlert({
            open: true,
            type: "success",
            message: "Register Successfully",
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
        onSubmit={register}
        className="w-[581px] flex flex-col gap-4 p-10 rounded-2xl shadow-xl"
      >
        <div className="space-y-2">
          <h3 className="font-semibold text-5xl">Create your account</h3>
          <p className="text-[#8C8C8C]">
            Hello there! Welcome aboard! I'm glad you're interested in creating
            an account
          </p>
        </div>
        <div className="space-y-3">
          <InputField
            label="Full Name"
            icon={HiOutlineUser}
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="enter your full name"
            autoFocus
            error={error}
          />
          <InputField
            label="Email Address"
            icon={HiOutlineEnvelope}
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="enter your email"
            error={error}
          />
          <InputField
            label="Password"
            icon={HiOutlineKey}
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => changePwd(e)}
            placeholder="enter your password"
            error={error}
          />
          <div className="grid grid-cols-2 text-slate-500 text-sm">
            <div className="flex items-center gap-1">
              <HiCheckCircle
                className={`w-4 h-4 ${
                  pwd.upperCase ? "text-blue-600" : "text-blue-200"
                }`}
              />
              <span>One uppercase character</span>
            </div>
            <div className="flex items-center gap-1">
              <HiCheckCircle
                className={`w-4 h-4 ${
                  pwd.lowerCase ? "text-blue-600" : "text-blue-200"
                }`}
              />
              <span>One lowercase character</span>
            </div>
            <div className="flex items-center gap-1">
              <HiCheckCircle
                className={`w-4 h-4 ${
                  pwd.number ? "text-blue-600" : "text-blue-200"
                }`}
              />
              <span>One number</span>
            </div>
            <div className="flex items-center gap-1">
              <HiCheckCircle
                className={`w-4 h-4 ${
                  pwd.specialChar ? "text-blue-600" : "text-blue-200"
                }`}
              />
              <span>One special character</span>
            </div>
            <div className="flex items-center gap-1">
              <HiCheckCircle
                className={`w-4 h-4 ${
                  pwd.min8 ? "text-blue-600" : "text-blue-200"
                }`}
              />
              <span>8 character minimum</span>
            </div>
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
              <span>Sign Up with Google</span>
            </button>
            <button
              type="button"
              className="w-full rounded-lg py-2 px-4 active:shadow-none border border-[#D9D9D9] bg-white shadow-sm flex justify-center items-center gap-2"
              onClick={loginFacebook}
            >
              <FaFacebook className="w-5 h-5" />
              <span>Sign Up with Facebook</span>
            </button>
          </div>
          <Button type="submit">Sign Up</Button>
          <span className="text-[#8C8C8C] text-sm text-center block">
            Already have an account?
            <Link to="/login" className="font-semibold text-blue-600">
              Login
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
}
