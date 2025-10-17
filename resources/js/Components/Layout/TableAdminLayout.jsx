// Table Component
const Table = ({ children, className }) => {
  return <table className={`min-w-full ${className || ""}`}>{children}</table>;
};

// TableHeader Component
const TableHeader = ({ children, className }) => {
  return <thead className={`bg-white border-b border-gray-100 ${className}`}>
            {children}
        </thead>;
};

// TableBody Component
const TableBody = ({ children, className }) => {
  return <tbody className={`divide-y divide-gray-100 ${className}`}>{children}</tbody>;
};

// TableRow Component
const TableRow = ({ children, className }) => {
  return <tr className={`hover:bg-gray-5 transition ${className}`}>{children}</tr>;
};

// TableCell Component
const TableCell = ({ children, isHeader = false, className }) => {
  if (isHeader) {
    return (
      <th
        className={`px-5 py-3 font-semibold text-sm text-primary-blue tracking-wide ${className || ""}`}
      >
        {children}
      </th>
    );
  }

  return (
    <td
      className={`px-5 py-3 text-sm text-slate-600 ${className || ""}`}
    >
      {children}
    </td>
  );
};

export { Table, TableBody, TableCell, TableHeader, TableRow };

