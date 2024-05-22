import { Spinner } from "@material-tailwind/react";

export default function Loading() {
  return (
    <div className="w-screen h-screen bg-slate-100 flex justify-center items-center gap-4">
      <Spinner className="w-16 h-16" color="blue" />
    </div>
  );
}
