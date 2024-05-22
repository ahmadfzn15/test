import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { HiChevronRight } from "react-icons/hi2";
import { sidebar } from "../lib/sidebar";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [menu, openMenu] = useState();
  const path = useLocation();

  return (
    <div className="w-56 fixed font-poppins bg-slate-900 max-h-screen h-full flex flex-col items-center z-50">
      <h1 className="text-2xl font-bold py-5 text-white">Test App</h1>
      <List className="text-white">
        {sidebar.map((d, i) => (
          <Link key={i} to={d.link}>
            <div
              className={`px-2 py-2.5 mx-auto hover:bg-blue-500/10 ${
                path.pathname === d.link && !menu
                  ? "bg-blue-500/10 text-slate-100"
                  : "text-slate-400"
              } hover:text-slate-100 transition-all duration-300 w-48 rounded-md`}
            >
              <div className="flex items-center gap-2">
                {React.createElement(d.icon, { className: "w-5 h-5" })}
                <h1 className="font-bold text-xs font-poppins">{d.label}</h1>
              </div>
            </div>
          </Link>
        ))}
      </List>
    </div>
  );
}
