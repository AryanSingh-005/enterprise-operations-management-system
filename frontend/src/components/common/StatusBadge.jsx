
const StatusBadge = ({ status }) => {
  const isActive = status === "ACTIVE";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        isActive
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isActive ? "bg-green-500" : "bg-red-500"
        }`}
      />

      {status || "UNKNOWN"}
    </span>
  );
};

export default StatusBadge;
