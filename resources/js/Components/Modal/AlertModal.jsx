export default function AlertModal({ show, message, type = "error" }) {
  return (
    <div
      className={`
        fixed top-4 left-1/2 transform -translate-x-1/2
        px-4 py-2 rounded shadow-md text-white z-[9999]
        transition-all duration-300
        ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}
        ${type === "error" ? "bg-red-500" : "bg-green-500"}
      `}
    >
      {message}
    </div>
  );
}
