import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function Layout({ children, className = "" }) {
  return (
    <div className="bg-slate-100 min-h-screen font-poppins overflow-x-hidden">
      <Navbar />
      <Sidebar />
      <div className="pl-56 pt-16">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
