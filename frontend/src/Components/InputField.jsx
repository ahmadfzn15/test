import React, { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export default function InputField({
  label = "",
  icon,
  type = "text",
  value = "",
  name = "",
  onChange = () => {},
  placeholder = "",
  autoFocus = false,
  error = {},
}) {
  const [visiblePwd, setVisiblePwd] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        {React.createElement(icon, {
          className: "absolute w-5 h-5 top-3 left-3 text-[#595959]",
        })}
        <input
          type={visiblePwd ? "text" : type}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          className={`w-full pl-10 pr-4 py-2 text-slate-600 rounded-lg focus:outline-none border ${
            error[name] ? "border-red-500" : "border-slate-300"
          } focus:ring-2 ${
            error[name] ? "focus:ring-red-500" : "focus:ring-blue-500"
          } transition-all`}
        />
        {type === "password" &&
          (visiblePwd ? (
            <HiEye
              className="absolute w-5 h-5 top-3 right-3 text-[#595959] cursor-pointer"
              onClick={() => setVisiblePwd(false)}
            />
          ) : (
            <HiEyeSlash
              className="absolute w-5 h-5 top-3 right-3 text-[#595959] cursor-pointer"
              onClick={() => setVisiblePwd(true)}
            />
          ))}
      </div>
      {error[name] && <p className="text-red-500 text-sm">{error[name]}</p>}
    </div>
  );
}
