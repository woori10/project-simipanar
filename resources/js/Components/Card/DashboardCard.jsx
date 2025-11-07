export default function DashboardCard({ title, count, icon: Icon, bgColor = "bg-main-yellow" }) {
  return (
    <div className="flex flex-row gap-4 rounded-2xl w-full h-fit border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className={`flex items-center justify-center w-16 h-16 ${bgColor} rounded-full dark:bg-gray-800`}>
        {Icon && <Icon className="text-gray-800 size-6 dark:text-white/90" />}
      </div>

      <div className="flex justify-center items-center">
        <div>
          <h4 className="text-xl font-extrabold text-gray-800 dark:text-white/90">{count}</h4>
          <span className="text-xs text-gray-500 dark:text-gray-400">{title}</span>
        </div>
      </div>
    </div>
  );
}
