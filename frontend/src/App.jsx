import * as reactRouterDom from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

export default function App() {
  return (
    <reactRouterDom.BrowserRouter>
      <reactRouterDom.Routes>
        <reactRouterDom.Route path="/" element={<Home />} />
        <reactRouterDom.Route path="/login" element={<Login />} />
        <reactRouterDom.Route path="/register" element={<Register />} />
      </reactRouterDom.Routes>
    </reactRouterDom.BrowserRouter>
  );
}
