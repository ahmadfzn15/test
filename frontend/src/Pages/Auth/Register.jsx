import {
  HiOutlineEnvelope,
  HiOutlineKey,
  HiOutlineUser,
} from "react-icons/hi2";
import AuthLayout from "../../Layout/AuthLayout";
import axios from "axios";
import { useState } from "react";
import Button from "../../Components/Button";
import InputField from "../../Components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export default function Register() {
  const [data, setData] = useState({});
  const [error, setError] = useState([{}]);
  const route = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    if (data.email == null) {
      setError([{ message: "Please fill your email!", type: "email" }]);
      return;
    }

    if (data.name == null) {
      setError([{ message: "Please fill your email!", type: "name" }]);
      return;
    }

    if (data.password == null) {
      setError([{ message: "Please fill your password!", type: "password" }]);
      return;
    }

    setError([]);

    const res = await axios.post(
      `http://localhost:8000/api/auth/register`,
      data
    );

    if (res.status == 200) {
      Cookies.set("token", res.data.token, {
        expires: 7 * 24 * 3600,
        sameSite: "Strict",
      });
      console.log(Cookies.get("token"));
      route("/");
    } else {
      console.log("error");
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={register}
        className="w-[581px] max-h-[649px] flex flex-col gap-4 p-10 rounded-2xl shadow-lg"
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
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="enter your password"
            error={error}
          />
          <div className="flex items-center gap-2 text-[#8C8C8C] text-sm">
            <div className="w-full h-[1px] bg-slate-300" />
            <span>Or</span>
            <div className="w-full h-[1px] bg-slate-300" />
          </div>
          <div className="flex justify-between items-center gap-2 text-[#8C8C8C]">
            <button className="w-full rounded-lg py-2 px-4 active:shadow-none border border-[#D9D9D9] bg-white shadow-sm text-sm flex items-center justify-center gap-2">
              <FaGoogle className="w-5 h-5" />
              <span>Sign in with Google</span>
            </button>
            <button className="w-full rounded-lg py-2 px-4 active:shadow-none border border-[#D9D9D9] bg-white shadow-sm flex justify-center items-center gap-2">
              <FaFacebook className="w-5 h-5" />
              <span>Sign in with Facebook</span>
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
