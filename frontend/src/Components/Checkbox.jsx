export default function Checkbox({ name = "", label = "" }) {
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" name={name} id={name} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
