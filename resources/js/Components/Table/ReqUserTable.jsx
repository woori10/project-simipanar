import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/Components/Layout/TableAdminLayout';


import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

// Data tabel (tanpa interface)
const tableData = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
        "/images/user/user-24.jpg",
      ],
    },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    projectName: "Technology",
    team: {
      images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    },
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      image: "../../../images/kurpet.jpg",
      name: "Zain Geidt",
      role: "Content Writing",
    },
    projectName: "Blog Writing",
    team: {
      images: ["/images/user/user-27.jpg"],
    },
    budget: "12.7K",
    status: "Active",
  },
];

export default function ReqUserTable() {
  return (
    <div className="overflow-hidden mt-4 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader>
            <TableRow>
              {["No", "Nama", "NIP", "Satuan Kerja", "Email", "Action"].map(
                (header) => (
                  <TableCell
                    key={header}
                    isHeader
                    className={`
                    ${
                        header === "No"
                        ? "text-center text-gray-500"
                        : "text-start text-gray-500"
                    }`}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((order) => (
              <TableRow key={order.id}>

                <TableCell>
                  {order.id}
                </TableCell>

                <TableCell>
                    {order.user.name}
                </TableCell>

                <TableCell>
                  {order.projectName}
                </TableCell>

                <TableCell>
                  {order.projectName}
                </TableCell>

                {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex -space-x-2">
                    {order.team.images.map((teamImage, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                      >
                        <img
                          width={24}
                          height={24}
                          src={teamImage}
                          alt={`Team member ${index + 1}`}
                          className="w-full size-6"
                        />
                      </div>
                    ))}
                  </div>
                </TableCell> */}

                <TableCell>
                    {order.status}
                </TableCell>

                <TableCell>
                    <div className="flex flex-row text-center gap-4">
                            <CheckIcon className="w-6 h-6 text-green-600 hover:text-green-700 transition" />
                            <XMarkIcon className="w-6 h-6 text-red-500 hover:text-red-600 transition" />
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
