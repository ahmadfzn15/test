import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function Layout({ children, className = "" }) {
  return (
    <div className="bg-slate-100 min-h-screen font-poppins overflow-x-hidden">
      <Navbar />
      <Sidebar />
      <div className="h-screen flex flex-col justify-between">
        <div className={className}>{children}</div>
        <Footer />
      </div>
    </div>
  );
}
