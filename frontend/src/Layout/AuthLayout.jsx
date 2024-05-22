export default function AuthLayout({ children }) {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      {children}
    </div>
  );
}