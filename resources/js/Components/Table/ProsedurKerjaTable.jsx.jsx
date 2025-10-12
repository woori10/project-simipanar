import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Table } from "flowbite-react";
import { useState } from "react";

const tableData = [
  {
    id: 1,
    user: { name: "Woori-nim", role: "Admin" },
    projectName: "Project A",
    status: "Active",
  },
  {
    id: 2,
    user: { name: "Jin-woo", role: "User" },
    projectName: "Project B",
    status: "Pending",
  },
  // bisa ditambah data lain
];

export default function ProsedurKerjaTable() {
  const [data, setData] = useState(tableData);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/[0.05]">
            <tr>
              {["No", "Judul", "Gambar", "File", "Tanggal Unggah", "Action"].map((header) => (
                <th
                  key={header}
                  className={`px-5 py-3 font-medium text-sm text-gray-600 text-left ${
                    header === "No" ? "text-center" : "text-start"
                  } dark:text-gray-400`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                  {order.id}
                </td>
                <td className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {order.user.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.projectName}
                </td>
                <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    Lorep
                </td>
                <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    Lorep
                </td>
                <td className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex flex-row gap-4">
                    <PencilSquareIcon
                    className="w-6 h-6 text-main-blue"/>
                    <TrashIcon
                    className="w-6 h-6 text-main-blue" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
