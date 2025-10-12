import {
    GroupIcon
} from "@icons";

export default function UserCard() {
  return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 min-w-max dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="mx-auto flex items-center justify-center w-10 h-10 bg-main-yellow rounded-lg dark:bg-gray-800">
                <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>

            <div className="text-center mt-5">
                <div>
                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    Nama
                    </h4>
                    <div className="mt-2 space-y-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                        NIP
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                        Satker
                        </p>
                    </div>
{/*

                    <div className="flex flex-row gap-4 rounded-2xl w-fit h-fit bg-white">
                        <div className="flex items-center justify-center w-8 h-8 bg-main-yellow rounded-xl dark:bg-gray-800">
                            <UserCircleIcon className="text-gray-800 size-5 dark:text-white/90" />
                        </div>
                        <div className="flex justify-center items-center">
                            <div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                Total User
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 rounded-2xl w-fit h-fit bg-white">
                        <div className="flex items-center justify-center w-8 h-8 bg-main-yellow rounded-xl dark:bg-gray-800">
                            <UserCircleIcon className="text-gray-800 size-5 dark:text-white/90" />
                        </div>
                        <div className="flex justify-center items-center">
                            <div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                Total User
                                </span>
                            </div>
                        </div>
                    </div> */}


                </div>
            </div>
        </div>


  );
}
