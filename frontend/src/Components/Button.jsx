export default function Button({ type = "button", children }) {
  return (
    <button
      type={type}
      className="w-full text-white font-semibold rounded-lg py-2.5 px-4 active:shadow-none border border-[#D9D9D9] bg-blue-500 shadow-sm active:scale-95"
    >
      {children}
    </button>
  );
}
